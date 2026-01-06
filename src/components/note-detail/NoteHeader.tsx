"use client";

import { ArrowLeft, Clock, FileText, Mic, Youtube, File, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteNote } from "@/services/noteService";
import Link from "next/link";
import { Note } from "@/types";
import { useState } from "react";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";

interface NoteHeaderProps {
    note: Note;
}

export function NoteHeader({ note }: NoteHeaderProps) {
    const router = useRouter();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
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
                    href="/home"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Library
                </Link>

                <button
                    onClick={handleDeleteClick}
                    className="inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors group"
                >
                    <Trash className="w-4 h-4" />
                    <span>Delete Note</span>
                </button>
            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Note"
                message="Are you sure you want to delete this note? This action cannot be undone."
                confirmText="Delete"
                isLoading={isDeleting}
            />

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
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
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {note.title}
                </h1>
            </div>
        </div>
    );
}
