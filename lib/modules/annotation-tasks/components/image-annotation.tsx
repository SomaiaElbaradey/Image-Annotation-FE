/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from "react";

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { updateTaskImageUrl, uploadImage } from "@/lib/server/firebase";

import { useTaskAnnotations } from "../hooks";
import AnnotationCanvas from "./annotation-canvas";

export default function CanvasAnnotation() {
    const [user, setUser] = useState<any>(null);
    const {
        currentTaskIndex,
        tasks,
        annotations,
        setAnnotations,
        error,
        handleSave,
        handleNextTask
    } = useTaskAnnotations(user?.uid);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const imageUrl = await uploadImage(file);
                await updateTaskImageUrl(tasks[currentTaskIndex].id, imageUrl);

                // setTasks(prevTasks =>
                //     prevTasks.map((task, index) =>
                //         index === currentTaskIndex
                //             ? { ...task, imageUrl }
                //             : task
                //     )
                // );

                // redrawCanvas();
            } catch (err) {
                console.error(err);
                // setError('Failed to upload image. Please try again.');
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
            <AnnotationCanvas annotations={annotations} setAnnotations={setAnnotations} />
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

