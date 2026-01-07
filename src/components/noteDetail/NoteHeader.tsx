import { ArrowLeft, Clock, FileText, Mic, Youtube, File, Trash, Share2, Check, User as UserIcon, FolderPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteNote } from "@/services/noteService";
import Link from "next/link";
import { Note, User } from "@/types";
import { useState } from "react";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { AddToFolderModal } from "./AddToFolderModal";
import { useUser } from "@/context/UserContext";

interface NoteHeaderProps {
    note: Note;
    previousRoute: string;
    creator?: User | null;
}

export function NoteHeader({ note, previousRoute, creator }: NoteHeaderProps) {
    const router = useRouter();
    const { user } = useUser();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

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
                    <span className="hidden md:inline">{previousRoute === "search" ? "Back to Search" : "Back to Library"}</span>
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleFolderClick}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                        title="Add to Folder"
                    >
                        <FolderPlus className="w-5 h-5 md:w-4 md:h-4" />
                        <span className="hidden md:inline">Add to Folder</span>
                    </button>

                    <button
                        onClick={handleCopyLink}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
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
                            className="inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors group"
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
                    <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
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

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {note.title}
                </h1>
            </div>
        </div>
    );
}
