import { useState, useRef, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { Annotation } from "../schemas";

export const useCanvas = (
    annotations: Annotation[],
    setAnnotations: React.Dispatch<React.SetStateAction<Annotation[]>>
) => {
    const [currentRect, setCurrentRect] = useState<Annotation | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const redrawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src =
            "https://imgs.search.brave.com/4HiZ_iW1k5mmsmDIH_C05H0HZeLjEx3bSapAaNcDixo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzYwLzkyLzIz/LzM2MF9GXzk2MDky/MjMwNl9ySFBiZTJB/Q21jYW83WjJLaUdY/Tm9EVk11VmxQZGRT/Ty5qcGc";
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            annotations.forEach(({ x, y, width, height, text }) => {
                ctx.strokeStyle = "red";
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, width, height);

                ctx.fillStyle = "red";
                ctx.font = "12px Arial";
                ctx.fillText(text, x, y - 5);
            });

            if (currentRect) {
                const { x, y, width, height } = currentRect;
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, width, height);
            }
        };
    }, [annotations, currentRect]);

    useEffect(() => {
        redrawCanvas();
    }, [redrawCanvas]);

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;
        setCurrentRect({
            id: uuidv4(),
            x: startX,
            y: startY,
            width: 0,
            height: 0,
            text: "",
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!currentRect || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const endX = e.clientX - rect.left;
        const endY = e.clientY - rect.top;

        setCurrentRect((prev) =>
            prev
                ? { ...prev, width: endX - prev.x, height: endY - prev.y }
                : null
        );
    };

    const handleMouseUp = () => {
        if (currentRect) {
            const text = prompt("Enter annotation text:") || "";
            const annotatedRect = { ...currentRect, text };
            setAnnotations((prev) => [...prev, annotatedRect]);
            setCurrentRect(null);
            redrawCanvas();
        }
    };

    return {
        canvasRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        redrawCanvas,
    };
};
