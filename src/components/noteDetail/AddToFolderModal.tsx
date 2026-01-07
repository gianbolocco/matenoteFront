import { useState } from "react";
import { Folder as FolderIcon, Plus, Check, Loader2, X, FolderPlus } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useFolders } from "@/hooks/useFolders";
import { addNotesToFolder } from "@/services/folderService";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface AddToFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
    noteId: string;
}

export function AddToFolderModal({ isOpen, onClose, noteId }: AddToFolderModalProps) {
    const { user } = useUser();
    const { folders, isLoading: isLoadingFolders } = useFolders({ userId: user?.id });
    const [selectedFolderId, setSelectedFolderId] = useState<string>("");
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSave = async () => {
        if (!selectedFolderId) return;

        setIsSaving(true);
        setError("");

        try {
            await addNotesToFolder(selectedFolderId, [noteId]);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 1000);
        } catch (err) {
            console.error(err);
            setError("Failed to add note to folder");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-sm p-6 relative">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 transition-colors"
                aria-label="Close"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <FolderPlus className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Add to Folder</h3>
            </div>

            <div className="space-y-6">
                {isLoadingFolders ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    </div>
                ) : folders.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <FolderIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="font-medium">No folders found</p>
                        <p className="text-sm mt-1">Create one from the home page</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1 customize-scrollbar">
                        {folders.map((folder) => (
                            <button
                                key={folder.id || folder._id}
                                onClick={() => setSelectedFolderId((folder.id || folder._id) as string)}
                                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all group ${selectedFolderId === (folder.id || folder._id)
                                    ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500/20"
                                    : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"
                                    }`}
                            >
                                <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm"
                                    style={{ backgroundColor: folder.color }}
                                >
                                    {folder.title.substring(0, 2).toUpperCase()}
                                </div>
                                <span className={`font-medium truncate flex-1 ${selectedFolderId === (folder.id || folder._id) ? "text-blue-700" : "text-gray-700 group-hover:text-gray-900"}`}>
                                    {folder.title}
                                </span>
                                {selectedFolderId === (folder.id || folder._id) && (
                                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center justify-center">
                        {error}
                    </div>
                )}

                <div className="flex gap-3 pt-2">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!selectedFolderId || isSaving || success || folders.length === 0}
                        className={`flex-1 ${success ? "bg-green-600 hover:bg-green-700" : ""}`}
                        isLoading={isSaving}
                    >
                        {success ? (
                            <span className="flex items-center gap-2">
                                <Check className="w-4 h-4" />
                                Saved
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Add to Folder
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
