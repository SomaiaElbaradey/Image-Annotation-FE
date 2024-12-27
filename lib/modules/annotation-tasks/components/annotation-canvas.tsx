import React, { useRef, useState } from 'react';

import { Dialog, Button, Input, Typography } from "@/lib/ui";

import { Annotation } from '../schemas';
import { useCanvas } from '../hooks';

interface AnnotationCanvasProps {
    annotations: Annotation[];
    setAnnotations: (annotations: Annotation[]) => void;
    imageUrl: string;
}

export default function AnnotationCanvas({ annotations, setAnnotations, imageUrl }: AnnotationCanvasProps) {
    const [annotationText, setAnnotationText] = useState("");
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

    const onSubmit = () => {
        handleMouseUp(annotationText);
        setAnnotationText("");
    };

    return (
        <div ref={containerRef} className="w-full">
            <Dialog
                ref={dialogRef}
                open={isDialogOpen}
                className='z-50'
                onClose={() => handleDialogOpen(false)}
                closeOnMaskClick
            >
                <div className="p-4">
                    <Typography.H3 className="font-bold mb-4">Enter Annotation Text</Typography.H3>
                    <Input
                        value={annotationText}
                        onChange={(event) => setAnnotationText(event.target.value)}
                        placeholder="Enter annotation text"
                        className="mb-4"
                    />
                    <Button onClick={onSubmit} variant="primary">Submit</Button>
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

