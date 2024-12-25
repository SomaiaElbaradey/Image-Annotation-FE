import { useState, useRef, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { Annotation } from "../schemas";

export const useCanvas = (
    annotations: Annotation[],
    setAnnotations: (annotations: Annotation[]) => void,
    imageUrl: string
) => {
    const [currentRect, setCurrentRect] = useState<Annotation | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const redrawCanvas = useCallback(
        (imageUrl: string) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const img = new Image();
            img.src = imageUrl;

            img.onload = () => {
                const fixedWidth = 600;
                const aspectRatio = img.width / img.height;
                const fixedHeight = fixedWidth / aspectRatio;

                canvas.width = fixedWidth;
                canvas.height = fixedHeight;

                ctx.drawImage(img, 0, 0, fixedWidth, fixedHeight);

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
        },
        [annotations, currentRect]
    );

    useEffect(() => redrawCanvas(imageUrl), [redrawCanvas, imageUrl]);

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
            setAnnotations([...annotations, annotatedRect]);
            setCurrentRect(null);
            redrawCanvas(imageUrl);
        }
    };

    return {
        canvasRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        redrawCanvas,
    } as const;
};
