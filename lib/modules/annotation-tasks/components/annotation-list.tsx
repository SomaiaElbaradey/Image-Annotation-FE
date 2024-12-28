"use client";

import React, { useState } from "react";

import {
    Table,
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Typography,
    Button,
    Badge,
} from "@/lib/ui";

import { Annotation, Task } from "../schemas";
import { statusToBadgeState } from "../utils";

const ITEMS_PER_PAGE = 17;

interface AnnotationListProps {
    annotations: Annotation[];
    currentTask: Task;
}

export default function AnnotationList({
    annotations,
    currentTask,
}: AnnotationListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentAnnotations = annotations.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(annotations.length / ITEMS_PER_PAGE);

    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div className="my-4">
            <Typography.ST1 className="font-bold">
                Current Annotations:
            </Typography.ST1>
            <Badge
                className="mx-1"
                state={statusToBadgeState[currentTask?.status]}
            >
                {currentTask?.status}
            </Badge>
            {annotations?.length ? (
                <>
                    <Table className="mt-2">
                        <TableCaption>
                            List of current annotations on the image
                        </TableCaption>
                        <TableHeader>
                            <TableRow className="sticky top-0 bg-white">
                                <TableHead>Position (X, Y)</TableHead>
                                <TableHead>Size (W x H)</TableHead>
                                <TableHead>Text</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentAnnotations.map((annotation) => (
                                <TableRow key={annotation.id}>
                                    <TableCell>
                                        ({annotation.x.toFixed(2)}, {annotation.y.toFixed(2)})
                                    </TableCell>
                                    <TableCell>
                                        {annotation.width.toFixed(2)}x{annotation.height.toFixed(2)}
                                    </TableCell>
                                    <TableCell>{annotation.text}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-4 flex justify-between items-center">
                        <Button
                            variant="text"
                            onClick={handlePrevPage}
                            size="x_small"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <Typography.CP2>
                            Page {currentPage} of {totalPages}
                        </Typography.CP2>
                        <Button
                            variant="text"
                            onClick={handleNextPage}
                            size="x_small"
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </>
            ) : (
                <Typography.CP2> No annotations available.</Typography.CP2>
            )}
        </div>
    );
}
