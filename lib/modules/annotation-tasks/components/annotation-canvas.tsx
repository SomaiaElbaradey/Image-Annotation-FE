import React, { useRef, useState } from "react";

import { Dialog, Button, Input, Typography } from "@/lib/ui";

import { Annotation } from "../schemas";
import { useCanvas } from "../hooks";

interface AnnotationCanvasProps {
    annotations: Annotation[];
    setAnnotations: (annotations: Annotation[]) => void;
    imageUrl: string;
}

export default function AnnotationCanvas({
    annotations,
    setAnnotations,
    imageUrl,
}: AnnotationCanvasProps) {
    const [annotationText, setAnnotationText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const {
        canvasRef,
        containerRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        isDialogOpen,
        handleDialogOpen,
    } = useCanvas(annotations, setAnnotations, imageUrl);

    const onClose = () => {
        setAnnotationText("");
        setErrorMessage("");
        handleDialogOpen(false);
    };

    const onSubmit = () => {
        if (annotationText.trim() === "") {
            setErrorMessage("Please enter annotation text");
            return;
        }

        handleMouseUp(annotationText);
        onClose();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnnotationText(event.target.value);
        if (event.target.value.trim() !== "") setErrorMessage("");
    };

    return (
        <div ref={containerRef} className="w-full">
            <Dialog
                ref={dialogRef}
                open={isDialogOpen}
                className="z-50"
                onClose={onClose}
                closeOnMaskClick
            >
                <div className="p-4">
                    <Typography.H3 className="font-bold mb-4">
                        Enter Annotation Text
                    </Typography.H3>
                    <Input
                        value={annotationText}
                        onChange={handleInputChange}
                        placeholder="Enter annotation text"
                        className="mb-2"
                    />
                    {errorMessage && (
                        <Typography.P1 className="text-danger mb-2">
                            {errorMessage}
                        </Typography.P1>
                    )}
                    <Button onClick={onSubmit} variant="primary">
                        Submit
                    </Button>
                </div>
            </Dialog>
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={() => handleDialogOpen(true)}
                className="border border-gray-400 cursor-crosshair w-full h-auto"
            />
        </div>
    );
}
