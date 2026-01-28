import { ArrowLeft, Clock, FileText, Mic, Youtube, File, Trash, Share2, Check, User as UserIcon, FolderPlus, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteNote, updateNoteTitle } from "@/services/noteService";
import Link from "next/link";
import { Note, User } from "@/types";
import { useState } from "react";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { AddToFolderModal } from "./AddToFolderModal";
import { useUser } from "@/context/UserContext";
import { span } from "framer-motion/client";

interface NoteHeaderProps {
    note: Note;
    previousRoute: string;
    creator?: User | null;
}

const MAX_TITLE_LENGTH = 100;

export function NoteHeader({ note, previousRoute, creator }: NoteHeaderProps) {
    const router = useRouter();
    const { user } = useUser();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [isSaving, setIsSaving] = useState(false);

    const isOwner = user?.id === note.userId;

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleFolderClick = () => {
        setIsFolderModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteNote(note.id);
            router.push("/home");
        } catch (error) {
            console.error("Failed to delete note:", error);
            setIsDeleting(false);
            setIsDeleteModalOpen(false); // Optionally close on error or keep open to show error
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleSaveTitle = async () => {
        if (!editedTitle.trim() || editedTitle === note.title) {
            setIsEditing(false);
            setEditedTitle(note.title);
            return;
        }

        setIsSaving(true);
        try {
            await updateNoteTitle(note.id, editedTitle);
            note.title = editedTitle; // Optimistic update
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update title:", error);
            // Revert on error could be handled here or just show error
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTitle(note.title);
    };


    const getIcon = () => {
        switch (note.sourceType) {
            case "pdf":
                return <FileText className="w-5 h-5 text-violet-500" />;
            case "audio":
                return <Mic className="w-5 h-5 text-blue-500" />;
            case "youtube":
                return <Youtube className="w-5 h-5 text-red-600" />;
            default:
                return <File className="w-5 h-5 text-gray-500" />;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        }).format(date);
    };

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <Link
                    href={`/${previousRoute}`}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden md:inline">Back to Library</span>
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleFolderClick}
                        className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                        title="Add to Folder"
                    >
                        <FolderPlus className="w-5 h-5 md:w-4 md:h-4" />
                        <span className="hidden md:inline">Add to Folder</span>
                    </button>

                    <button
                        onClick={handleCopyLink}
                        className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                        title="Share"
                    >
                        {isCopied ? <Check className="w-5 h-5 md:w-4 md:h-4 text-gray-500" /> : <Share2 className="w-5 h-5 md:w-4 md:h-4" />}
                        <span className={`${isCopied ? "font-medium" : ""} hidden md:inline`}>
                            {isCopied ? "Copied Link" : "Share"}
                        </span>
                    </button>

                    {isOwner && (
                        <button
                            onClick={handleDeleteClick}
                            className="inline-flex cursor-pointer items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors group"
                            title="Delete Note"
                        >
                            <Trash className="w-5 h-5 md:w-4 md:h-4" />
                            <span className="hidden md:inline">Delete Note</span>
                        </button>
                    )}
                </div>
            </div>

            <AddToFolderModal
                isOpen={isFolderModalOpen}
                onClose={() => setIsFolderModalOpen(false)}
                noteId={note.id}
            />

            {isOwner && (
                <ConfirmationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    title="Delete Note"
                    message="Are you sure you want to delete this note? This action cannot be undone."
                    confirmText="Delete"
                    isLoading={isDeleting}
                />
            )}

            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="p-2 bg-white border border-gray-200 rounded-lg">
                        {getIcon()}
                    </div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        {note.sourceType} Note
                    </span>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatDate(note.createDate)}</span>
                    </div>

                    {creator && (
                        <>
                            <div className="w-1 h-1 bg-gray-300 rounded-full" />
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                    {creator.avatar ? (
                                        <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                            <UserIcon className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                                <span className="font-medium text-gray-700">By {creator.name}</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="w-full">
                    {isEditing ? (
                        <div className="flex flex-col gap-2 w-full animate-in fade-in zoom-in-95 duration-200">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value.length <= MAX_TITLE_LENGTH) {
                                            setEditedTitle(value);
                                        }
                                    }}
                                    className="w-full text-3xl md:text-4xl font-bold text-gray-900 leading-tight bg-gray-50 border-2 border-violet-200 rounded-lg px-3 py-2 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 focus:outline-none transition-all"
                                    autoFocus
                                    placeholder="Untitled Note"
                                />
                                <div className="absolute right-3 bottom-3 text-xs font-medium text-gray-400 pointer-events-none">
                                    {editedTitle.length}/{MAX_TITLE_LENGTH}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2">
                                <button
                                    onClick={handleCancelEdit}
                                    disabled={isSaving}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveTitle}
                                    disabled={isSaving || !editedTitle.trim()}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all active:scale-95"
                                >
                                    <Check className="w-4 h-4" />
                                    Save
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-start gap-3 group/title w-full">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight break-words flex-1">
                                {editedTitle}
                            </h1>
                            {isOwner && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mt-1.5 opacity-100 sm:opacity-0 sm:group-hover/title:opacity-100 transition-all p-2 hover:bg-violet-50 text-gray-400 hover:text-violet-600 rounded-lg shrink-0"
                                    title="Edit Title"
                                >
                                    <Pencil className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
