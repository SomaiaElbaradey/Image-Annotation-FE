import { Button, Input } from "@/lib/ui";

interface ImageUploaderProps {
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpload: () => Promise<void>;
    uploading: boolean;
}

export default function ImageUploader({ handleFileChange, handleUpload, uploading }: ImageUploaderProps) {
    return (
        <div className="flex space-x-4 mt-4">
            <Input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload} disabled={uploading} size={'small'} variant={'text'} className="p-1 h-auto min-w-0 whitespace-nowrap">
                {uploading ? "Uploading..." : "Upload Image"}
            </Button>
        </div>
    );
}

