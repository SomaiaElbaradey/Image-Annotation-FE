import { useState, useEffect } from "react";

import { collection, query, where, getDocs } from "firebase/firestore";

import db, { saveAnnotations } from "@/lib/server/firebase";
import { Annotation, Task, StatusFilter } from "../schemas";

export const useTaskAnnotations = (userId: string | undefined) => {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [tasks, setTasks] = useState<Task[]>([]);

    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [currentFilter, setCurrentFilter] = useState<StatusFilter>("All");

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);

            try {
                const tasksQuery = query(
                    collection(db, "tasks"),
                    where("assignedTo", "==", userId)
                );
                const querySnapshot = await getDocs(tasksQuery);
                const fetchedTasks: Task[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedTasks.push({ id: doc.id, ...doc.data() } as Task);
                });

                setTasks(fetchedTasks);
                setFilteredTasks(fetchedTasks);
                if (fetchedTasks.length > 0)
                    setAnnotations(fetchedTasks[0].annotations || []);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch tasks. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) fetchTasks();
    }, [userId]);

    useEffect(() => {
        setFilteredTasks(
            currentFilter === "All"
                ? tasks
                : tasks.filter((task) => task.status === currentFilter)
        );
        setCurrentTaskIndex(0);
    }, [currentFilter, tasks]);

    useEffect(() => {
        if (filteredTasks.length > 0) {
            setAnnotations(filteredTasks[currentTaskIndex].annotations || []);
        }
    }, [filteredTasks, currentTaskIndex]);

    const currentTask = filteredTasks[currentTaskIndex];

    const handleSave = async (status?: Task["status"]) => {
        try {
            await saveAnnotations(currentTask.id, annotations);
            const updatedTasks = tasks.map((task) =>
                task.id === currentTask.id
                    ? {
                          ...task,
                          annotations: annotations,
                          status: status || "Completed",
                      }
                    : task
            );
            setTasks(updatedTasks);
            setFilteredTasks(
                currentFilter === "All"
                    ? updatedTasks
                    : updatedTasks.filter(
                          (task) => task.status === currentFilter
                      )
            );
        } catch (err) {
            console.error(err);
            setError("Failed to save annotations. Please try again.");
        }
    };

    const handleNextTask = () => {
        if (currentTaskIndex < filteredTasks.length - 1) {
            setCurrentTaskIndex(currentTaskIndex + 1);
            setAnnotations([]);
        }
    };

    const handlePreviousTask = () => {
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
    } as const;
};
