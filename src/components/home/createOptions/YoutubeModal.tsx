import { X, Youtube, Loader2, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { Modal } from "@/components/common/Modal";
import { Folder } from "@/types";
import { getUserFolders } from "@/services/folderService";

interface YoutubeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (url: string, folderId?: string) => void;
}

export function YoutubeModal({ isOpen, onClose, onSubmit }: YoutubeModalProps) {
    const { user } = useUser();
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [folders, setFolders] = useState<Folder[]>([]);
    const [selectedFolderId, setSelectedFolderId] = useState<string>("");
    const [isLoadingFolders, setIsLoadingFolders] = useState(false);

    useEffect(() => {
        if (isOpen && user) {
            loadFolders();
        }
    }, [isOpen, user]);

    const loadFolders = async () => {
        if (!user) return;
        setIsLoadingFolders(true);
        try {
            const userFolders = await getUserFolders(user.id);
            setFolders(userFolders);
        } catch (error) {
            console.error("Failed to load folders:", error);
        } finally {
            setIsLoadingFolders(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !youtubeUrl) return;

        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        if (!youtubeRegex.test(youtubeUrl)) {
            setError("Please enter a valid YouTube video URL");
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(youtubeUrl, selectedFolderId || undefined);
            setYoutubeUrl("");
            setSelectedFolderId("");
            setError("");
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-md p-6 relative">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                    <Youtube className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Import from YouTube</h3>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {/* Folder Selection */}
                    {folders.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Save to Folder (Optional)
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedFolderId}
                                    onChange={(e) => setSelectedFolderId(e.target.value)}
                                    className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 pr-10 hover:bg-gray-100 transition-colors cursor-pointer outline-none"
                                    disabled={isLoadingFolders}
                                >
                                    <option value="">Library only</option>
                                    {folders.map((folder) => (
                                        <option key={folder.id} value={folder.id}>
                                            {folder.title}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* URL Input */}
                    <div>
                        <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-700 mb-2">
                            Video URL
                        </label>
                        <input
                            id="youtube-url"
                            type="text"
                            required
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                        />
                        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
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
                </div>
            </form>
        </Modal>
    );
}
