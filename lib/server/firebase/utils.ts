import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";

import db from "@/lib/server/firebase";
import { Annotation } from "@/lib/modules/annotation-tasks/schemas";

export const uploadImage = async (file: File): Promise<string> => {
    const storage = getStorage();
    const fileId = uuidv4();
    const fileRef = ref(storage, `task-images/${fileId}`);
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
};

export const updateTaskImageUrl = async (taskId: string, imageUrl: string) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { imageUrl });
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
