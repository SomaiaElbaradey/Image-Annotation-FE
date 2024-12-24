import React from 'react';
import { StatusFilter } from '../schemas';

interface TaskStatusFilterProps {
    currentStatus: StatusFilter;
    onStatusChange: (status: StatusFilter) => void;
}

function TaskStatusFilter({ currentStatus, onStatusChange }: TaskStatusFilterProps) {
    const statuses: StatusFilter[] = ['All', 'Pending', 'In Progress', 'Completed'];

    return (
        <div className="mb-4">
            <select
                value={currentStatus}
                onChange={(event) => onStatusChange(event?.target.value as StatusFilter)}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none 
                        focus:ring-blue-500 focus:border-blue-500"
            >
                {statuses.map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TaskStatusFilter;

