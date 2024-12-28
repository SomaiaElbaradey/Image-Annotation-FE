import db from "@/lib/server/firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { Task } from "../schemas";

export const fetchUserTasks = async (userId: string) => {
    try {
        const userDocRef = doc(db, "users", userId!);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) throw new Error("User document not found");

        const taskIds = userDoc.data().tasks || [];

        const tasksQuery = query(
            collection(db, "tasks"),
            where("__name__", "in", taskIds)
        );

        const querySnapshot = await getDocs(tasksQuery);

        const fetchedTasks: Task[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Task[];

        return fetchedTasks;
    } catch (err) {
        console.error(err);
    }
};
