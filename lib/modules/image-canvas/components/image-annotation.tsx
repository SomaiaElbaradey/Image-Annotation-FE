"use client";

import React, { useState, useRef, useEffect } from 'react';

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

interface ImageAnnotationProps {
    task: Task;
    onSave: (taskId: string, annotations: Annotation[]) => Promise<void>;
    onNextTask: () => void;
}

const ImageAnnotation: React.FC<ImageAnnotationProps> = ({ task, onSave, onNextTask }) => {
    const [annotations, setAnnotations] = useState<Annotation[]>(task.annotations);
    const [currentAnnotation, setCurrentAnnotation] = useState<Partial<Annotation> | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [annotationText, setAnnotationText] = useState('');
    const [error, setError] = useState<string | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const drawAnnotations = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const image = imageRef.current;

        if (ctx && canvas && image) {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);

            annotations?.forEach((ann) => {
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.strokeRect(ann.x, ann.y, ann.width, ann.height);
                ctx.fillStyle = 'red';
                ctx.font = '12px Arial';
                ctx.fillText(ann.text, ann.x, ann.y - 5);
            });
        }
    };


    useEffect(() => {
        const image = imageRef.current;
        if (image)
            image.onload = drawAnnotations;

    }, [task.imageUrl]);

    useEffect(() => {
        setAnnotations(task.annotations);
    }, [task]);


    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setCurrentAnnotation({ x, y });
            setIsDrawing(true);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !currentAnnotation) return;

        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setCurrentAnnotation(prev => ({
                ...prev,
                width: x - (prev?.x || 0),
                height: y - (prev?.y || 0)
            }));
            drawAnnotations();
        }
    };

    const handleMouseUp = () => {
        if (currentAnnotation && currentAnnotation.width && currentAnnotation.height) {
            setIsDrawing(false);
            setAnnotations([...annotations, { ...currentAnnotation as Annotation, id: Date.now().toString(), text: annotationText }]);
            setCurrentAnnotation(null);
            setAnnotationText('');
            drawAnnotations();
        }
    };

    const handleSave = async () => {
        try {
            await onSave(task.id, annotations);
            setError(null);
        } catch (err) {
            console.log(err);
            setError('Failed to save annotations. Please try again.');
        }
    };

    const handleNext = () => {
        handleSave();
        onNextTask();
    };

    console.log(task, "task");

    return (
        <div className="relative">
            =            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className="border border-gray-300"
            />
            <div className="mt-4">
                <input
                    type="text"
                    value={annotationText}
                    onChange={(e) => setAnnotationText(e.target.value)}
                    placeholder="Enter annotation text"
                    className="border border-gray-300 rounded px-2 py-1 mr-2"
                />
                <button
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Save Annotations
                </button>
                <button
                    onClick={handleNext}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Next Task
                </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Current Annotations:</h3>
                <ul>
                    {annotations?.map((ann) => (
                        <li key={ann.id}>
                            Rectangle at ({ann.x}, {ann.y}) with size {ann.width}x{ann.height}: {ann.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ImageAnnotation;

