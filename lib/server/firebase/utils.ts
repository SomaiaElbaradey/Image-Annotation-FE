import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";

import db, { storage } from "@/lib/server/firebase";
import { Annotation } from "@/lib/modules/annotation-tasks/schemas";

export const uploadImage = async (
    file: File | undefined
): Promise<string | undefined> => {
    if (!file) return;

    const fileId = uuidv4();
    const fileRef = ref(storage, `task-images/${fileId}`);

    try {
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        return url;
    } catch (error) {
        console.error("Error uploading the file", error);
    }
};

export const updateTaskImageUrl = async (taskId: string, imageURL: string) => {
    const taskRef = doc(db, "tasks", taskId);
    console.log("taskRef", taskRef);
    console.log("imageURL", imageURL);

    await updateDoc(taskRef, { imageURL });
};

export const saveAnnotations = async (
    taskId: string,
    annotations: Annotation[]
) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
        annotations: annotations,
        status: "Completed",
    });
};
