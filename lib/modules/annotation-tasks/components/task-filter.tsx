import React from "react";

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/lib/ui";
import { ChevronRight } from "@/lib/ui/icons";

import { StatusFilter } from "../schemas";

interface TaskStatusFilterProps {
    currentStatus: StatusFilter;
    onStatusChange: (status: StatusFilter) => void;
}

const statuses: StatusFilter[] = ["All", "Pending", "In Progress", "Completed"];

export default function TaskStatusFilter({
    currentStatus,
    onStatusChange,
}: TaskStatusFilterProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="tertiary"
                    size="small"
                    className="w-full sm:w-[25%] items-center my-2"
                    trailingIcon={<ChevronRight />}
                >
                    {currentStatus} Tasks
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
                <DropdownMenuRadioGroup
                    value={currentStatus}
                    onValueChange={(status) =>
                        onStatusChange(status as StatusFilter)
                    }
                >
                    {statuses.map((status) => (
                        <DropdownMenuRadioItem
                            key={status}
                            value={status}
                            className="px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                            {status}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
