import { useState, useRef, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { Annotation } from "../schemas";

type DrawArgs = {
    ctx: CanvasRenderingContext2D;
    containerWidth: number;
    canvasHeight: number;
};

export const useCanvas = (
    annotations: Annotation[],
    setAnnotations: (annotations: Annotation[]) => void,
    imageUrl: string
) => {
    const [currentRect, setCurrentRect] = useState<Annotation | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const drawAnnotations = useCallback(
        ({ ctx, containerWidth, canvasHeight }: DrawArgs) => {
            annotations.forEach(({ x, y, width, height, text }) => {
                const scaledX = x * containerWidth;
                const scaledY = y * canvasHeight;
                const scaledWidth = width * containerWidth;
                const scaledHeight = height * canvasHeight;

                ctx.strokeStyle = "red";
                ctx.lineWidth = 2;
                ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);

                ctx.fillStyle = "red";
                ctx.font = "12px Arial";
                ctx.fillText(text, scaledX, scaledY - 5);
            });
        },
        [annotations]
    );

    const drawCurrentRect = useCallback(
        ({ ctx, containerWidth, canvasHeight }: DrawArgs) => {
            if (currentRect) {
                const { x, y, width, height } = currentRect;
                const scaledX = x * containerWidth;
                const scaledY = y * canvasHeight;
                const scaledWidth = width * containerWidth;
                const scaledHeight = height * canvasHeight;

                ctx.strokeStyle = "blue";
                ctx.lineWidth = 1;
                ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);
            }
        },
        [currentRect]
    );

    const redrawCanvas = useCallback(
        (imageUrl: string) => {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!canvas || !container) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const img = new Image();
            img.src = imageUrl;

            img.onload = () => {
                const containerWidth = container.clientWidth;
                const aspectRatio = img.width / img.height;
                const canvasHeight = containerWidth / aspectRatio;

                canvas.width = containerWidth;
                canvas.height = canvasHeight;

                ctx.drawImage(img, 0, 0, containerWidth, canvasHeight);
                drawAnnotations({ ctx, containerWidth, canvasHeight });
                drawCurrentRect({ ctx, containerWidth, canvasHeight });
            };
        },
        [drawAnnotations, drawCurrentRect]
    );

    useEffect(() => {
        const handleResize = () => redrawCanvas(imageUrl);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [redrawCanvas, imageUrl]);

    useEffect(() => redrawCanvas(imageUrl), [redrawCanvas, imageUrl]);

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const startX = (e.clientX - rect.left) / canvas.width;
        const startY = (e.clientY - rect.top) / canvas.height;

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
        if (isDialogOpen || !currentRect || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        const endX = (e.clientX - rect.left) / canvas.width;
        const endY = (e.clientY - rect.top) / canvas.height;

        setCurrentRect((prev) =>
            prev
                ? { ...prev, width: endX - prev.x, height: endY - prev.y }
                : null
        );
    };

    const handleDialogOpen = (status: boolean) => {
        if (status && (!currentRect?.height || !currentRect.width)) {
            setCurrentRect(null);
            return;
        }
        setIsDialogOpen(status);
    };

    const handleMouseUp = (text: string) => {
        if (currentRect?.width && currentRect?.height) {
            const annotatedRect = { ...currentRect, text };
            setAnnotations([...annotations, annotatedRect]);
            setIsDialogOpen(false);
            redrawCanvas(imageUrl);
        }

        setCurrentRect(null);
    };

    return {
        canvasRef,
        containerRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        redrawCanvas,
        isDialogOpen,
        handleDialogOpen,
        currentRect,
    } as const;
};
