'use client';

import React, { useState } from 'react';
import { Annotation } from '../schemas';
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, Typography, Button } from '@/lib/ui';

const ITEMS_PER_PAGE = 17;

interface AnnotationListProps {
    annotations: Annotation[];
}

export default function AnnotationList({ annotations }: AnnotationListProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentAnnotations = annotations.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(annotations.length / ITEMS_PER_PAGE);

    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div className="mt-4">
            <Typography.ST1 className="font-bold mb-2">Current Annotations:</Typography.ST1>
            <Table>
                <TableCaption>List of current annotations on the image</TableCaption>
                <TableHeader>
                    <TableRow className="sticky top-0 bg-white font-bold">
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
                <Button variant='text' onClick={handlePrevPage} size='x_small' disabled={currentPage === 1}>
                    Previous
                </Button>
                <Typography.CP2> Page {currentPage} of {totalPages}</Typography.CP2>
                <Button variant='text' onClick={handleNextPage} size='x_small' disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div>
        </div>
    );
}

