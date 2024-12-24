import React from 'react';
import { Annotation } from '../schemas';

interface AnnotationListProps {
    annotations: Annotation[];
}

export default function AnnotationList({ annotations }: AnnotationListProps) {
    return (
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
    );
}

