interface ImageUploaderProps {
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpload: () => Promise<void>;
    uploading: boolean;
}

export default function ImageUploader({ handleFileChange, handleUpload, uploading }: ImageUploaderProps) {
    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
            </button>
        </div>
    );
}

