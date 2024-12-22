/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect } from 'react';
import TaskList from './task-list';
import ImageAnnotation from './components/image-annotation';
import { useAuth } from '@/contexts/auth/AuthContext';


export default function Tasks() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<any[]>([]);
    const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            console.log(user, "user");

            // const unsubscribe = listenToUserTasks(user.uid, (updatedTasks) => {
            //     setTasks(updatedTasks);
            //     if (!currentTaskId && updatedTasks.length > 0) {
            //         setCurrentTaskId(updatedTasks[0].id);
            //     }
            // });
            // return () => unsubscribe();
        }
    }, [user, currentTaskId]);

    const handleTaskChange = (taskId: string) => {
        setCurrentTaskId(taskId);
    };

    const currentTask = tasks.find(task => task.id === currentTaskId);

    return (
        <div className="flex h-screen">
            <TaskList
                tasks={tasks}
                currentTaskId={currentTaskId}
                onTaskChange={handleTaskChange}
            />
            {/* {currentTask && (
                <ImageAnnotation
                    task={currentTask}
                    onTaskUpdate={(updatedTask) => {
                        setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
                    }}
                />
            )} */}
        </div>
    );
}

