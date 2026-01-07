"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Folder } from "@/types";
import { getFolderById, deleteFolder, addNotesToFolder, removeNoteFromFolder, updateFolder } from "@/services/folderService";
import { NoteCard } from "@/components/noteCard/NoteCard";
import { AddNoteModal } from "@/components/folders/AddNoteModal";
import { EditFolderModal } from "@/components/folders/EditFolderModal";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";
import { Loader2, Plus, Trash, ArrowLeft, Folder as FolderIcon, Pencil } from "lucide-react";
import Link from "next/link";

const colorMap: Record<string, string> = {
    gray: "bg-gray-100 text-gray-900 border-gray-200",
    red: "bg-red-50 text-red-900 border-red-200",
    blue: "bg-blue-50 text-blue-900 border-blue-200",
    green: "bg-green-50 text-green-900 border-green-200",
    yellow: "bg-yellow-50 text-yellow-900 border-yellow-200",
    purple: "bg-purple-50 text-purple-900 border-purple-200",
};

export default function FolderDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const folderId = params.id as string;

    const [folder, setFolder] = useState<Folder | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isRemoveNoteModalOpen, setIsRemoveNoteModalOpen] = useState(false);
    const [noteToRemove, setNoteToRemove] = useState<string | null>(null);
    const [isActionLoading, setIsActionLoading] = useState(false);

    useEffect(() => {
        if (folderId) {
            loadFolder();
        }
    }, [folderId]);

    const loadFolder = async () => {
        try {
            const data = await getFolderById(folderId);
            setFolder(data);
        } catch (error) {
            console.error(error);
            router.push("/folders"); // Redirect on error
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteFolder = async () => {
        setIsActionLoading(true);
        try {
            await deleteFolder(folderId);
            router.push("/folders");
        } catch (error) {
            console.error(error);
            setIsActionLoading(false);
        }
    };

    const handleUpdateFolder = async (data: { title: string; color: string }) => {
        setIsActionLoading(true);
        try {
            await updateFolder(folderId, data);
            await loadFolder(); // Re-fetch data from server to ensure fresh state
            setIsEditModalOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleAddNotes = async (noteIds: string[]) => {
        setIsActionLoading(true);
        try {
            // Check if folder has notes property initialized
            if (!folder) return;

            await addNotesToFolder(folderId, noteIds);
            await loadFolder(); // Refresh data from server to get full note objects
            setIsAddModalOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleRemoveNoteClick = (noteId: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setNoteToRemove(noteId);
        setIsRemoveNoteModalOpen(true);
    };

    const confirmRemoveNote = async () => {
        if (!noteToRemove || !folder) return;
        setIsActionLoading(true);

        // Optimistic update
        const previousFolder = folder;
        setFolder({
            ...folder,
            notes: folder.notes.filter(n => n.id !== noteToRemove)
        });

        try {
            await removeNoteFromFolder(folderId, noteToRemove);
            setIsRemoveNoteModalOpen(false);
            setNoteToRemove(null);
        } catch (error) {
            console.error(error);
            setFolder(previousFolder); // Revert
        } finally {
            setIsActionLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!folder) return null;

    const theme = colorMap[folder.color] || colorMap.gray;

    return (
        <div className="min-h-screen pb-20 bg-white">
            {/* Header */}
            <div className={`pt-24 pb-12 px-6 md:px-8 border-b ${theme}`}>
                <div className="max-w-7xl mx-auto">
                    <Link href="/folders" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Folders
                    </Link>

                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/50 flex items-center justify-center shadow-sm`}>
                                <FolderIcon className="w-8 h-8 opacity-80" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight mb-2 text-gray-900">{folder.title}</h1>
                                <p className="text-gray-500 font-medium">{folder.notes.length} notes</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                disabled={isActionLoading}
                                className="p-3 cursor-pointer text-gray-700 hover:text-blue-600 transition-all duration-200 hover:scale-105 disabled:opacity-50"
                                title="Edit Folder"
                            >
                                <Pencil className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                disabled={isActionLoading}
                                className="p-3 cursor-pointer text-gray-700 hover:text-red-600 transition-all duration-200 hover:scale-105 disabled:opacity-50"
                                title="Delete Folder"
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                disabled={isActionLoading}
                                className="h-11 px-5 bg-gray-900 text-white font-medium rounded-xl flex items-center gap-2 hover:bg-black transition-all shadow-lg hover:-translate-y-0.5"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Notes</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-6 md:px-8 py-12">
                {folder.notes && folder.notes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {folder.notes.map((note, index) => (
                            <div key={note._id || note.id || index} className="h-full">
                                <NoteCard
                                    note={note}
                                    action={
                                        <button
                                            onClick={(e) => handleRemoveNoteClick(note.id, e)}
                                            className="p-2 cursor-pointer text-gray-700 hover:text-red-600 transition-all duration-200 hover:scale-105 disabled:opacity-50"
                                            title="Remove from folder"
                                        >
                                            <Trash className="w-5 h-5" />
                                        </button>
                                    }
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 border border-dashed border-gray-200 rounded-3xl">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                            <Plus className="w-6 h-6 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">This folder is empty</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-6">
                            Start organizing by adding some notes to this folder.
                        </p>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="text-primary font-medium hover:underline"
                        >
                            Add your first note
                        </button>
                    </div>
                )}
            </main>

            <AddNoteModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddNotes}
                isLoading={isActionLoading}
                existingNoteIds={folder.notes ? folder.notes.map(n => n.id) : []}
            />

            <EditFolderModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleUpdateFolder}
                isLoading={isActionLoading}
                folder={folder}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteFolder}
                title="Delete Folder"
                message="Are you sure you want to delete this folder? All notes within it will remain in your library."
                confirmText="Delete Folder"
                isLoading={isActionLoading}
            />

            <ConfirmationModal
                isOpen={isRemoveNoteModalOpen}
                onClose={() => setIsRemoveNoteModalOpen(false)}
                onConfirm={confirmRemoveNote}
                title="Remove Note"
                message="Are you sure you want to remove this note from the folder? The note will remain in your library."
                confirmText="Remove Note"
                isLoading={isActionLoading}
            />
        </div>
    );
}
