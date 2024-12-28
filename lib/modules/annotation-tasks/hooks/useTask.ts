/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useCallback } from "react";

import { saveAnnotations } from "@/lib/server/firebase";

import { Annotation, Task, StatusFilter } from "../schemas";
import { fetchUserTasks } from "../api";

export const useTaskAnnotations = (userId?: string | undefined) => {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [tasks, setTasks] = useState<Task[]>([]);

    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [currentFilter, setCurrentFilter] = useState<StatusFilter>("All");

    const [isLoading, setIsLoading] = useState(false);

    const filterTasks = useCallback(
        (allTasks?: Task[]) =>
            currentFilter === "All"
                ? allTasks || tasks
                : (allTasks || tasks).filter(
                      (task) => task.status === currentFilter
                  ),
        [currentFilter, tasks]
    );

    const fetchTasks = useCallback(async () => {
        if (!userId) return;
        setIsLoading(true);

        try {
            const fetchedTasks = await fetchUserTasks(userId);

            if (fetchedTasks) {
                setTasks(fetchedTasks);
                setFilteredTasks(filterTasks(fetchedTasks));

                setAnnotations(
                    fetchedTasks[currentTaskIndex || 0].annotations || []
                );
            }
        } catch (_) {
            setError("Failed to fetch tasks. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [currentTaskIndex, userId]);

    useEffect(() => {
        if (userId) fetchTasks();
    }, [fetchTasks, userId]);

    useEffect(() => {
        const currFilteredTasks = filterTasks();
        setCurrentTaskIndex(0);
        setFilteredTasks(currFilteredTasks);
        setAnnotations(currFilteredTasks?.[0]?.annotations || []);
    }, [currentFilter]);

    useEffect(() => {
        const currFilteredTasks = filterTasks();
        setAnnotations(
            currFilteredTasks?.[currentTaskIndex]?.annotations || []
        );
    }, [currentTaskIndex, filterTasks]);

    const currentTask = filteredTasks[currentTaskIndex];

    const handleSave = async (status?: Task["status"]) => {
        if (!currentTask?.imageURL || !annotations.length) return;

        try {
            await saveAnnotations(currentTask.id, annotations, status);
            await fetchTasks();
        } catch (_) {
            setError("Failed to save annotations. Please try again.");
        }
    };

    const handleNextTask = async () => {
        await handleSave(
            currentTask.status === "Pending"
                ? "In Progress"
                : currentTask.status
        );

        if (currentTaskIndex < filteredTasks.length - 1) {
            setCurrentTaskIndex(currentTaskIndex + 1);
            setAnnotations([]);
        }
    };

    const handlePreviousTask = async () => {
        await handleSave(
            currentTask.status === "Pending"
                ? "In Progress"
                : currentTask.status
        );

        if (currentTaskIndex > 0) {
            setCurrentTaskIndex(currentTaskIndex - 1);
            setAnnotations([]);
        }
    };

    const setFilter = (filter: StatusFilter) => setCurrentFilter(filter);

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
