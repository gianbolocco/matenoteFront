import { X, FileText, UploadCloud, File, Loader2 } from "lucide-react";
import { useState, useRef, DragEvent } from "react";
import { useUser } from "@/context/UserContext";

interface PdfModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (file: File) => void;
}

export function PdfModal({ isOpen, onClose, onSubmit }: PdfModalProps) {
    const { user } = useUser();
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        if (files.length > 0 && files[0].type === "application/pdf") {
            setPdfFile(files[0]);
            setError("");
        } else {
            setError("Please upload a valid PDF file.");
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type === "application/pdf") {
                setPdfFile(file);
                setError("");
            } else {
                setError("Please upload a valid PDF file.");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !pdfFile) return;

        setIsSubmitting(true);
        try {
            await onSubmit(pdfFile);
            setPdfFile(null);
            setError("");
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const removeFile = () => {
        setPdfFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                        <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Import from PDF</h3>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload PDF
                        </label>

                        {!pdfFile ? (
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${isDragging
                                        ? "border-red-500 bg-red-50"
                                        : "border-gray-200 hover:border-red-300 hover:bg-gray-50"
                                    }`}
                            >
                                <UploadCloud className={`w-10 h-10 mb-3 ${isDragging ? "text-red-500" : "text-gray-400"}`} />
                                <p className="text-sm font-medium text-gray-700 text-center">
                                    <span className="text-red-600">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    PDF up to 10MB
                                </p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf"
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />
                            </div>
                        ) : (
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between group">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="p-2 bg-white border border-gray-100 rounded-lg shrink-0">
                                        <File className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {pdfFile.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={removeFile}
                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !pdfFile}
                        className="w-full py-3 px-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-900/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Processing...</span>
                            </>
                        ) : (
                            "Generate Notes"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
