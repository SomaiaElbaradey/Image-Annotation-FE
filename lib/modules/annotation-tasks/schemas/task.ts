import { Annotation } from "./annotation";

export interface Task {
    id: string;
    imageURL: string;
    status: "Pending" | "In Progress" | "Completed";
    annotations: Annotation[];
}

export type StatusFilter = Task["status"] | "All";
