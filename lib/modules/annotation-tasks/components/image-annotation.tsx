'use client'


import { Alert, Button, Progress, Spinner, Typography } from "@/lib/ui";

import { useTaskAnnotations } from "../hooks/useTask";
import { useImageUpload } from "../hooks/useImageUpload";
import { StatusFilter } from "../schemas";

import { useUser } from "../../auth/hooks";

import AnnotationCanvas from "./annotation-canvas";
import ImageUploader from "./image-uploader";
import AnnotationList from "./annotation-list";
import TaskStatusFilter from "./task-filter";
import { TopBar } from "./TopBar";

const PLACEHOLDER_IMG = '/images/placeholder.png';

export default function CanvasAnnotation() {
    const { user, isLoading } = useUser();
    const {
        currentTaskIndex,
        filteredTasks,
        annotations,
        setAnnotations,
        error,
        handleSave,
        handleNextTask,
        handlePreviousTask,
        setFilter,
        currentFilter,
        tasks,
        isLoading: isTasksLoading,
    } = useTaskAnnotations(user?.uid);

    const currentTask = filteredTasks?.[currentTaskIndex] || {};
    const { uploadedUrl, handleFileChange, handleUpload, uploading } = useImageUpload(
        currentTask?.imageURL || PLACEHOLDER_IMG,
        currentTask?.id || ''
    );

    const handleStatusChange = (status: StatusFilter) => {
        setFilter(status);
    };

    const completedTasks = tasks.filter(task => task.status === 'Completed');

    if (isLoading) return <Spinner />;

    return (
        <>
            <TopBar />
            <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TaskStatusFilter currentStatus={currentFilter} onStatusChange={handleStatusChange} />
                {filteredTasks.length > 0 ? (
                    <>
                        <div className="w-full">
                            <Typography.ST1 className="font-bold">
                                Task Progress: {completedTasks?.length} of {tasks.length}
                            </Typography.ST1>
                            <Progress
                                className="mt-1"
                                value={((completedTasks?.length || 0) / tasks.length) * 100}
                            />
                        </div>
                        {!isTasksLoading ? <div className="w-full lg:flex lg:flex-row lg:items-start lg:space-x-8">
                            <div className="w-full lg:w-1/2 mb-8 lg:mb-0 mt-3">
                                <AnnotationCanvas
                                    annotations={annotations}
                                    setAnnotations={setAnnotations}
                                    imageUrl={uploadedUrl}
                                />
                                {!currentTask?.imageURL && <ImageUploader
                                    handleFileChange={handleFileChange}
                                    handleUpload={handleUpload}
                                    uploading={uploading}
                                />}
                                {!currentTask?.imageURL && <Alert className="mt-4" variant='pending' >Warning: Please upload an image to save your annotations.</Alert>}
                                <Button onClick={() => handleSave('Completed')} variant='primary'
                                    className="font-bold w-full lg:w-auto my-4"
                                    disabled={uploading || currentTask?.status === "Completed" || !currentTask?.imageURL}>
                                    Save Annotations
                                </Button>
                            </div>
                            <div className="w-full lg:w-1/2">
                                {error && <Alert className="mt-2 font-bold" variant='error'>{error}</Alert>}
                                <AnnotationList annotations={annotations} currentTask={currentTask} />
                                <div className="flex justify-between w-full mb-6">
                                    <Button size='small' onClick={handlePreviousTask} variant='secondary' disabled={currentTaskIndex === 0}>
                                        Previous Task
                                    </Button>
                                    <Button size='small' onClick={handleNextTask} variant='primary' disabled={currentTaskIndex === filteredTasks.length - 1}>
                                        Next Task
                                    </Button>
                                </div>
                            </div>
                        </div> : <Spinner />}
                    </>
                ) : (
                    <Typography.H2 className="text-center mt-8">No tasks available for the current filter.</Typography.H2>
                )}
            </div>
        </>
    );
}

