/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface Task {
    id: string;
    status: 'Pending' | 'In Progress' | 'Completed';
}

interface TaskListProps {
    tasks: Task[];
    currentTaskId: string | null;
    onTaskChange: (taskId: string) => void;
}

export default function TaskList({ tasks, currentTaskId, onTaskChange }: TaskListProps) {
    const [filter, setFilter] = React.useState<'All' | 'Pending' | 'In Progress' | 'Completed'>('All');

    const filteredTasks = tasks.filter(task =>
        filter === 'All' || task.status === filter
    );

    return (
        <div className="w-1/4 p-4 border-r">
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
            <div className="flex space-x-2 mb-4">
                {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status as any)}
                    >
                        {status}
                    </button>
                ))}
            </div>
            <ul className="space-y-2">
                {filteredTasks.map((task) => (
                    <li
                        key={task.id}
                        className={`p-2 rounded cursor-pointer ${task.id === currentTaskId ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                            }`}
                        onClick={() => onTaskChange(task.id)}
                    >
                        Task {task.id.slice(0, 6)} - {task.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

