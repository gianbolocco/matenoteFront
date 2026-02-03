import { X, AlignLeft } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Modal } from "@/components/ui/Modal";
import { useFolders } from "@/hooks/useFolders";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

interface TextModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (text: string, folderId?: string, interest?: string) => void;
}

export function TextModal({ isOpen, onClose, onSubmit }: TextModalProps) {
    const { user } = useUser();
    const [text, setText] = useState("");
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
        if (!user || !text.trim()) return;

        if (text.trim().length < 100) {
            setError("Please enter at least 100 characters.");
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(text, selectedFolderId || undefined, selectedInterest || undefined);
            setText("");
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
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <AlignLeft className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Create from Text</h3>
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

                {/* Text Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none min-h-[150px] ${error ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                        placeholder="Paste your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    {error && <p className="text-xs text-red-500">{error}</p>}
                </div>

                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={!text.trim()}
                    className="w-full"
                >
                    Generate Notes
                </Button>
            </form>
        </Modal>
    );
}
