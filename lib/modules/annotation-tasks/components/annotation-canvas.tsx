import { Annotation } from '../schemas';
import { useCanvas } from '../hooks';

interface AnnotationCanvasProps {
    annotations: Annotation[];
    setAnnotations: (annotations: Annotation[]) => void;
    imageUrl: string;
}

export default function AnnotationCanvas({ annotations, setAnnotations, imageUrl }: AnnotationCanvasProps) {
    const { canvasRef, handleMouseDown, handleMouseMove, handleMouseUp } =
        useCanvas(annotations, setAnnotations, imageUrl);

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
