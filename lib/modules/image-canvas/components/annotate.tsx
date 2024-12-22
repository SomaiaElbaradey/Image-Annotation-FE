/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import ImageAnnotation from './image-annotation';
import db from '@/lib/server/firebase';

interface Annotation {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
}

interface Task {
    id: string;
    imageUrl: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    annotations: Annotation[];
}

export default function Annotate() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetchTasks(user.uid);
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    const fetchTasks = async (userId: string) => {
        try {
            const q = query(collection(db, 'tasks'), where('assignedTo', '==', userId));
            const querySnapshot = await getDocs(q);
            const fetchedTasks: Task[] = [];
            querySnapshot.forEach((doc) => {
                fetchedTasks.push({ id: doc.id, ...doc.data() } as Task);
            });
            setTasks(fetchedTasks);
        } catch (err) {
            console.log(err);
            setError('Failed to fetch tasks. Please try again.');
        }
    };

    const handleSaveAnnotations = async (taskId: string, annotations: Annotation[]) => {
        try {
            const taskRef = doc(db, 'tasks', taskId);
            await updateDoc(taskRef, {
                annotations: annotations,
                status: 'Completed'
            });

            // Update local state
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId
                        ? { ...task, annotations: annotations, status: 'Completed' }
                        : task
                )
            );
        } catch (err) {
            console.log(err);

            setError('Failed to save annotations. Please try again.');
        }
    };

    const handleNextTask = () => {
        if (currentTaskIndex < tasks.length - 1) {
            console.log("currentTaskIndex", tasks);
            setCurrentTaskIndex(currentTaskIndex + 1);
        } else {
            setError('No more tasks available.');
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    if (tasks.length === 0) {
        return <div>No tasks available.</div>;
    }

    const currentTask = tasks[currentTaskIndex];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Image Annotation</h2>
            <ImageAnnotation
                task={currentTask}
                onSave={handleSaveAnnotations}
                onNextTask={handleNextTask}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Task Progress:</h3>
                <p>{currentTaskIndex + 1} of {tasks.length}</p>
            </div>
        </div>
    );
}

