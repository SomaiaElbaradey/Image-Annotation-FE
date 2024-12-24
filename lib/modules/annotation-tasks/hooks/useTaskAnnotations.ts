import { useState, useEffect } from "react";

import { collection, query, where, getDocs } from "firebase/firestore";

import db, { saveAnnotations } from "@/lib/server/firebase";
import { Annotation, Task } from "../schemas";

export const useTaskAnnotations = (userId: string | undefined) => {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [tasks, setTasks] = useState<Task[]>([]);

    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [error, setError] = useState<string | null>(null);

    const currentTask = tasks[currentTaskIndex];

    useEffect(() => {
        const fetchTasks = async () => {
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
                if (fetchedTasks.length > 0)
                    setAnnotations(fetchedTasks[0].annotations || []);
            } catch (err) {
                console.log(err);
                setError("Failed to fetch tasks. Please try again.");
            }
        };

        if (userId) fetchTasks();
    }, [userId]);

    useEffect(() => {
        if (tasks.length > 0) setAnnotations(currentTask.annotations || []);
    }, [currentTask?.annotations, currentTaskIndex, tasks]);

    const handleSave = async () => {
        try {
            await saveAnnotations(currentTask.id, annotations);
            setTasks((prevTasks) =>
                prevTasks.map((task, index) =>
                    index === currentTaskIndex
                        ? {
                              ...task,
                              annotations: annotations,
                              status: "Completed",
                          }
                        : task
                )
            );
        } catch (err) {
            console.log(err);
            setError("Failed to save annotations. Please try again.");
        }
    };

    const handleNextTask = async () => {
        await handleSave();
        if (currentTaskIndex < tasks.length - 1) {
            setCurrentTaskIndex((prevIndex) => prevIndex + 1);
        } else {
            setError("No more tasks available.");
        }
    };

    return {
        currentTaskIndex,
        tasks,
        annotations,
        setAnnotations,
        error,
        handleSave,
        handleNextTask,
    } as const;
};
