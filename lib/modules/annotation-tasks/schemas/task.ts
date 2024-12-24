import { Annotation } from "./annotation";

export interface Task {
    id: string;
    imageURL: string;
    status: "Pending" | "In Progress" | "Completed";
    annotations: Annotation[];
}
