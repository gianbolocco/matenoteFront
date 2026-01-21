import { UploadCloud, FileAudio, X } from "lucide-react";
import { useState, useRef, DragEvent } from "react";

interface UploadTabProps {
    audioFile: File | null;
    onFileSelect: (file: File | null) => void;
    onError: (error: string) => void;
}

export function UploadTab({ audioFile, onFileSelect, onError }: UploadTabProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateAudioFile = (file: File) => {
        const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/webm', 'audio/x-m4a', 'audio/ogg'];
        return validTypes.includes(file.type);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0 && validateAudioFile(files[0])) {
            onFileSelect(files[0]);
            onError("");
        } else {
            onError("Please upload a valid audio file (MP3, WAV, WebM, OGG).");
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (validateAudioFile(file)) {
                onFileSelect(file);
                onError("");
            } else {
                onError("Please upload a valid audio file (MP3, WAV, WebM, OGG).");
            }
        }
    };

    if (!audioFile) {
        return (
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${isDragging
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                    }`}
            >
                <UploadCloud className={`w-10 h-10 mb-3 ${isDragging ? "text-purple-500" : "text-gray-400"}`} />
                <p className="text-sm font-medium text-gray-700 text-center">
                    <span className="text-purple-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    MP3, WAV, WebM, OGG
                </p>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={handleFileSelect}
                />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between group">
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-white border border-gray-100 rounded-lg shrink-0">
                    <FileAudio className="w-5 h-5 text-purple-600" />
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                        {audioFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                        {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                </div>
            </div>
            <button
                type="button"
                onClick={() => {
                    onFileSelect(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
