import { Annotation } from "./annotation";

export interface Task {
    id: string;
    imageUrl: string;
    status: "Pending" | "In Progress" | "Completed";
    annotations: Annotation[];
}
