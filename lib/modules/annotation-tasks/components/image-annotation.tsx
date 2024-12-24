'use client'

import React from "react";
import { useTaskAnnotations } from "../hooks/useTaskAnnotations";

import { useImageUpload } from "../hooks/useImageUpload";
import { useAuth } from "../../auth/hooks";

import AnnotationCanvas from "./annotation-canvas";
import ImageUploader from "./image-uploader";
import AnnotationList from "./annotation-list";


const PLACEHOLDER_IMG = '/images/placeholder.png';

export default function CanvasAnnotation() {
    const { user } = useAuth();
    const {
        currentTaskIndex,
        tasks,
        annotations,
        setAnnotations,
        error,
        handleSave,
        handleNextTask
    } = useTaskAnnotations(user?.uid);

    const currentTask = tasks?.[currentTaskIndex || 0];
    const { uploadedUrl, handleFileChange, handleUpload, uploading } = useImageUpload(
        currentTask?.imageURL || PLACEHOLDER_IMG,
        currentTask?.id || ''
    );

    if (!user)
        return <div>Loading...</div>;

    if (tasks.length === 0)
        return <div>No tasks available.</div>

    return (
        <div className="flex flex-col items-center mt-3">
            <ImageUploader
                handleFileChange={handleFileChange}
                handleUpload={handleUpload}
                uploading={uploading}
            />
            <AnnotationCanvas
                annotations={annotations}
                setAnnotations={setAnnotations}
                imageUrl={uploadedUrl}
            />
            <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mt-3"
            >
                Save Annotations
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <AnnotationList annotations={annotations} />
            <button
                onClick={handleNextTask}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3"
                disabled={currentTaskIndex === tasks.length - 1}
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

