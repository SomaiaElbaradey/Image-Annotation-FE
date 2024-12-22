/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import db from "@/lib/server/firebase";
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useState, useRef, useEffect, MouseEvent } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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

export default function CanvasAnnotation() {
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [currentRect, setCurrentRect] = useState<Annotation | null>(null);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [user, setUser] = useState<any>(null);

    // const router = useRouter();

    const currentTask = tasks[currentTaskIndex];

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

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imageURL = 'https://imgs.search.brave.com/4HiZ_iW1k5mmsmDIH_C05H0HZeLjEx3bSapAaNcDixo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzYwLzkyLzIz/LzM2MF9GXzk2MDky/MjMwNl9ySFBiZTJB/Q21jYW83WjJLaUdY/Tm9EVk11VmxQZGRT/Ty5qcGc'; // Replace with your image URL

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = imageURL;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
    }, [imageURL]);

    const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;
        setCurrentRect({ id: '', x: startX, y: startY, width: 0, height: 0, text: '' });
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

    // const handleNextTask = () => {
    //     if (currentTaskIndex < tasks.length - 1) {
    //         console.log("currentTaskIndex", tasks);
    //         setCurrentTaskIndex(currentTaskIndex + 1);
    //     } else {
    //         setError('No more tasks available.');
    //     }
    // };

    const fetchTasks = async (userId: string) => {
        try {
            const q = query(collection(db, 'tasks'), where('assignedTo', '==', userId));
            const querySnapshot = await getDocs(q);
            const fetchedTasks: Task[] = [];
            querySnapshot.forEach((doc) => {
                fetchedTasks.push({ id: doc.id, ...doc.data() } as Task);
            });
            setTasks(fetchedTasks);
            setAnnotations(fetchedTasks[0].annotations);
        } catch (err) {
            console.log(err);

            setError('Failed to fetch tasks. Please try again.');
        }
    };

    const redrawCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = imageURL;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    }, [annotations, currentRect]);

    const handleSave = async () => {
        const taskId = currentTask.id
        try {
            const taskRef = doc(db, 'tasks', taskId);
            console.log('annotations', annotations);

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

    if (!user) {
        return <div>Loading...</div>;
    }

    if (tasks.length === 0) {
        return <div>No tasks available.</div>;
    }

    return (
        <div className="flex flex-col items-center mt-3">
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
                    {annotations?.map((annotation) => (
                        <li key={annotation.id}>
                            Rectangle at ({annotation.x}, {annotation.y}) with size
                            {annotation.width}x{annotation.height}: {annotation.text}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Task Progress:</h3>
                <p>{currentTaskIndex + 1} of {tasks.length}</p>
            </div>
        </div>
    );
}
