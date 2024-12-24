import { useState, useCallback, useEffect } from "react";
import { uploadImage, updateTaskImageUrl } from "@/lib/server/firebase";

export const useImageUpload = (initialUrl: string, taskId: string) => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState<string>(initialUrl);

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setFile(event?.target?.files?.[0]),
        []
    );

    const handleUpload = useCallback(async () => {
        if (!file) return;

        setUploading(true);
        try {
            const url = await uploadImage(file);
            const imageUrl = url || initialUrl;
            setUploadedUrl(imageUrl);
            await updateTaskImageUrl(taskId, imageUrl);
        } finally {
            setUploading(false);
        }
    }, [file, initialUrl, taskId]);

    useEffect(() => setUploadedUrl(initialUrl), [initialUrl]);

    return { uploadedUrl, handleFileChange, handleUpload, uploading } as const;
};
