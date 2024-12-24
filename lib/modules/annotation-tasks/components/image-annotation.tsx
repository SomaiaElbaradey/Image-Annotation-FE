'use client'

import React, { useEffect } from "react";

import { useTaskAnnotations } from "../hooks/useTaskAnnotations";
import { useImageUpload } from "../hooks/useImageUpload";
import { useAuth } from "../../auth/hooks";

import AnnotationCanvas from "./annotation-canvas";
import ImageUploader from "./image-uploader";
import AnnotationList from "./annotation-list";

import { StatusFilter } from "../schemas";
import TaskStatusFilter from "./Task-filter";

const PLACEHOLDER_IMG = '/images/placeholder.png';

export default function CanvasAnnotation() {
    const { user } = useAuth();
    const {
        currentTaskIndex,
        filteredTasks,
        annotations,
        setAnnotations,
        error,
        handleSave,
        handleNextTask,
        handlePreviousTask,
        setCurrentTaskIndex,
        setFilter,
        currentFilter
    } = useTaskAnnotations(user?.uid);

    const currentTask = filteredTasks[currentTaskIndex];
    const { uploadedUrl, handleFileChange, handleUpload, uploading } = useImageUpload(
        currentTask?.imageURL || PLACEHOLDER_IMG,
        currentTask?.id || ''
    );

    useEffect(() => {
        if (filteredTasks.length === 0) {
            setAnnotations([]);
            setCurrentTaskIndex(0);
        }
    }, [filteredTasks, setAnnotations, setCurrentTaskIndex]);

    if (!user)
        return <div>Loading...</div>;

    const handleStatusChange = (status: StatusFilter) => {
        setFilter(status);
    };

    return (
        <div className="flex flex-col items-center mt-3">
            <TaskStatusFilter currentStatus={currentFilter} onStatusChange={handleStatusChange} />
            {filteredTasks.length > 0 ?
                <>
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
                        onClick={() => handleSave()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mt-3"
                    >
                        Save Annotations
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <AnnotationList annotations={annotations} />
                    <div className="flex justify-between w-full max-w-lg mt-4">
                        <button
                            onClick={handlePreviousTask}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            disabled={currentTaskIndex === 0}
                        >
                            Previous Task
                        </button>
                        <button
                            onClick={handleNextTask}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            disabled={currentTaskIndex === filteredTasks.length - 1}
                        >
                            Next Task
                        </button>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-xl font-bold mb-2">Task Progress:</h3>
                        <p>{currentTaskIndex + 1} of {filteredTasks.length}</p>
                    </div>
                </>
                : <div>No tasks available for the current filter.</div>}
        </div>
    );
}

