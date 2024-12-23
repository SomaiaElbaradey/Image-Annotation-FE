import React from 'react';

import { Annotation } from '../schemas';
import { useCanvas } from '../hooks';

interface AnnotationCanvasProps {
    annotations: Annotation[];
    setAnnotations: React.Dispatch<React.SetStateAction<Annotation[]>>;
}

const AnnotationCanvas: React.FC<AnnotationCanvasProps> = ({ annotations, setAnnotations }) => {
    const { canvasRef, handleMouseDown, handleMouseMove, handleMouseUp } = useCanvas(annotations, setAnnotations);

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="border border-gray-400 cursor-crosshair"
        />
    );
};

export default AnnotationCanvas;