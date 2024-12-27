import { useState, useEffect, useCallback } from "react";

import {
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
} from "firebase/firestore";

import db, { saveAnnotations } from "@/lib/server/firebase";
import { Annotation, Task, StatusFilter } from "../schemas";

export const useTaskAnnotations = (userId?: string | undefined) => {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [tasks, setTasks] = useState<Task[]>([]);

    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [currentFilter, setCurrentFilter] = useState<StatusFilter>("All");

    const [isLoading, setIsLoading] = useState(false);

    const fetchTasks = useCallback(async () => {
        setIsLoading(true);

        try {
            const userDocRef = doc(db, "users", userId!);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) throw new Error("User document not found");

            const taskIds = userDoc.data().tasks || [];

            if (!Array.isArray(taskIds) || taskIds.length === 0) {
                setTasks([]);
                setFilteredTasks([]);
                setAnnotations([]);
                return;
            }

            const tasksQuery = query(
                collection(db, "tasks"),
                where("__name__", "in", taskIds.slice(0, 10))
            );

            const querySnapshot = await getDocs(tasksQuery);

            const fetchedTasks: Task[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Task[];

            setTasks(fetchedTasks);
            setFilteredTasks(fetchedTasks);

            if (fetchedTasks.length > 0)
                setAnnotations(
                    fetchedTasks[currentTaskIndex || 0].annotations || []
                );
        } catch (err) {
            console.error(err);
            setError("Failed to fetch tasks. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [currentTaskIndex, userId]);

    useEffect(() => {
        if (userId) fetchTasks();
    }, [fetchTasks, userId]);

    useEffect(() => {
        setFilteredTasks(
            currentFilter === "All"
                ? tasks
                : tasks.filter((task) => task.status === currentFilter)
        );
        setCurrentTaskIndex(0);
    }, [currentFilter]);

    useEffect(() => {
        if (filteredTasks.length > 0) {
            setAnnotations(filteredTasks[currentTaskIndex].annotations || []);
        }
    }, [filteredTasks, currentTaskIndex]);

    const currentTask = filteredTasks[currentTaskIndex];

    const handleSave = async (status?: Task["status"]) => {
        if (!currentTask?.imageURL) return;

        try {
            await saveAnnotations(currentTask.id, annotations, status);
            await fetchTasks();
        } catch (err) {
            console.error(err);
            setError("Failed to save annotations. Please try again.");
        }
    };

    const handleNextTask = async () => {
        await handleSave(currentTask.status);

        if (currentTaskIndex < filteredTasks.length - 1) {
            setCurrentTaskIndex(currentTaskIndex + 1);
            setAnnotations([]);
        }
    };

    const handlePreviousTask = async () => {
        await handleSave(currentTask.status);

        if (currentTaskIndex > 0) {
            setCurrentTaskIndex(currentTaskIndex - 1);
            setAnnotations([]);
        }
    };

    const setFilter = (filter: StatusFilter) => {
        setCurrentFilter(filter);
    };

    return {
        currentTaskIndex,
        filteredTasks,
        annotations,
        setAnnotations,
        error,
        handleSave,
        handleNextTask,
        handlePreviousTask,
        setCurrentTaskIndex,
        setFilter,
        currentFilter,
        tasks,
        isLoading,
        fetchTasks,
    } as const;
};
