import { X, Youtube } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Modal } from "@/components/ui/Modal";
import { useFolders } from "@/hooks/useFolders";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { validateYoutubeUrl } from "@/utils/validation";

interface YoutubeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (url: string, folderId?: string, interest?: string) => void;
}

export function YoutubeModal({ isOpen, onClose, onSubmit }: YoutubeModalProps) {
    const { user } = useUser();
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [selectedFolderId, setSelectedFolderId] = useState<string>("");
    const [selectedInterest, setSelectedInterest] = useState<string>("");

    const { folders, isLoading: isLoadingFolders } = useFolders({
        userId: user?.id,
        enabled: isOpen
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !youtubeUrl) return;

        if (!validateYoutubeUrl(youtubeUrl)) {
            setError("Please enter a valid YouTube video URL");
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(youtubeUrl, selectedFolderId || undefined, selectedInterest || undefined);
            setYoutubeUrl("");
            setSelectedFolderId("");
            setSelectedInterest("");
            setError("");
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const folderOptions = folders.map(f => ({ value: f.id || f._id || "", label: f.title }));
    const interestOptions = user?.interests?.map(i => ({ value: i, label: i })) || [];

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

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                    {/* Folder Selection */}
                    {folders.length > 0 && (
                        <Select
                            label="Save to Folder (Optional)"
                            value={selectedFolderId}
                            onChange={(e) => setSelectedFolderId(e.target.value)}
                            options={folderOptions}
                            placeholder="Library only"
                            disabled={isLoadingFolders}
                        />
                    )}

                    {/* Interest Selection */}
                    {interestOptions.length > 0 && (
                        <Select
                            label="Interest (Optional)"
                            value={selectedInterest}
                            onChange={(e) => setSelectedInterest(e.target.value)}
                            options={interestOptions}
                            placeholder="None"
                        />
                    )}
                </div>

                {/* URL Input */}
                <Input
                    label="Video URL"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    error={error}
                    required
                />

                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={!youtubeUrl}
                    className="w-full"
                >
                    Generate Notes
                </Button>
            </form>
        </Modal>
    );
}
