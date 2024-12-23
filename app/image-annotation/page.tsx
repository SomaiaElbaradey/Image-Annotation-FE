/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useRef, useEffect, MouseEvent } from "react";

import db from "@/lib/server/firebase";
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

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

const uploadImage = async (file: File): Promise<string> => {
    const storage = getStorage();
    const fileId = uuidv4();
    const fileRef = ref(storage, `task-images/${fileId}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
};

const updateTaskImageUrl = async (taskId: string, imageUrl: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, { imageUrl });
};

export default function CanvasAnnotation() {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [currentRect, setCurrentRect] = useState<Annotation | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetchTasks(user.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            setAnnotations(tasks[currentTaskIndex].annotations || []);
            redrawCanvas();
        }
    }, [currentTaskIndex, tasks]);

    const fetchTasks = async (userId: string) => {
        try {
            const tasksQuery = query(collection(db, 'tasks'), where('assignedTo', '==', userId));
            const querySnapshot = await getDocs(tasksQuery);
            const fetchedTasks: Task[] = [];
            querySnapshot.forEach((doc) => {
                fetchedTasks.push({ id: doc.id, ...doc.data() } as Task);
            });
            setTasks(fetchedTasks);
            if (fetchedTasks.length > 0) {
                setAnnotations(fetchedTasks[0].annotations || []);
            }
        } catch (err) {
            console.log(err);
            setError('Failed to fetch tasks. Please try again.');
        }
    };

    const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;
        setCurrentRect({ id: uuidv4(), x: startX, y: startY, width: 0, height: 0, text: '' });
    };

    const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
        if (!currentRect || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const endX = e.clientX - rect.left;
        const endY = e.clientY - rect.top;

        setCurrentRect((prev) =>
            prev ? { ...prev, width: endX - prev.x, height: endY - prev.y } : null
        );
    };

    const handleMouseUp = () => {
        if (currentRect) {
            setAnnotations((prev) => [...prev, currentRect]);
            setCurrentRect(null);
            redrawCanvas();
        }
    };

    const handleNextTask = async () => {
        await handleSave();
        if (currentTaskIndex < tasks.length - 1) {
            setCurrentTaskIndex(prevIndex => prevIndex + 1);
        } else {
            setError('No more tasks available.');
        }
    };


    const redrawCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        // img.src = tasks[currentTaskIndex]?.imageUrl;
        img.src = 'https://imgs.search.brave.com/4HiZ_iW1k5mmsmDIH_C05H0HZeLjEx3bSapAaNcDixo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzYwLzkyLzIz/LzM2MF9GXzk2MDky/MjMwNl9ySFBiZTJB/Q21jYW83WjJLaUdY/Tm9EVk11VmxQZGRT/Ty5qcGc'
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            annotations.forEach(({ x, y, width, height }) => {
                ctx.strokeStyle = "red";
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, width, height);
            });

            if (currentRect) {
                const { x, y, width, height } = currentRect;
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, width, height);
            }
        };
    };

    useEffect(() => {
        redrawCanvas();
    }, [annotations, currentRect, currentTaskIndex, tasks]);

    const handleSave = async () => {
        const currentTask = tasks[currentTaskIndex];
        try {
            const taskRef = doc(db, 'tasks', currentTask.id);
            await updateDoc(taskRef, {
                annotations: annotations,
                status: 'Completed'
            });

            setTasks(prevTasks =>
                prevTasks.map((task, index) =>
                    index === currentTaskIndex
                        ? { ...task, annotations: annotations, status: 'Completed' }
                        : task
                )
            );
        } catch (err) {
            console.log(err);
            setError('Failed to save annotations. Please try again.');
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const imageUrl = await uploadImage(file);
                await updateTaskImageUrl(tasks[currentTaskIndex].id, imageUrl);

                setTasks(prevTasks =>
                    prevTasks.map((task, index) =>
                        index === currentTaskIndex
                            ? { ...task, imageUrl }
                            : task
                    )
                );

                redrawCanvas();
            } catch (err) {
                console.error(err);
                setError('Failed to upload image. Please try again.');
            }
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    if (tasks.length === 0) {
        return <div>No tasks available.</div>;
    }

    return (
        <div className="flex flex-col items-center mt-3">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
            />
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className="border border-gray-400 cursor-crosshair"
            ></canvas>
            <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mt-3"
            >
                Save Annotations
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Current Annotations:</h3>
                <ul>
                    {annotations.map((annotation) => (
                        <li key={annotation.id}>
                            Rectangle at ({annotation.x.toFixed(2)}, {annotation.y.toFixed(2)}) with size
                            {annotation.width.toFixed(2)}x{annotation.height.toFixed(2)}: {annotation.text}
                        </li>
                    ))}
                </ul>
            </div>
            <button
                onClick={handleNextTask}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3"
            >
                Next Task
            </button>
            <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Task Progress:</h3>
                <p>{currentTaskIndex + 1} of {tasks.length}</p>
            </div>
        </div>
    );
}