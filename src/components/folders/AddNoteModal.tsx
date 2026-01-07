"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Sparkles } from "lucide-react";
import { fetchNotes } from "@/services/noteService";
import { useUser } from "@/context/UserContext";
import { Note } from "@/types";
import { NoteSelectionList } from "./NoteSelectionList";
import { Modal } from "@/components/ui/Modal";

interface AddNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (noteIds: string[]) => Promise<void>;
    isLoading: boolean;
    existingNoteIds: string[];
}

export function AddNoteModal({ isOpen, onClose, onSubmit, isLoading, existingNoteIds }: AddNoteModalProps) {
    const { user } = useUser();
    const router = useRouter();
    const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);
    const [isFetchingNotes, setIsFetchingNotes] = useState(false);

    useEffect(() => {
        if (isOpen && user) {
            loadNotes();
        }
    }, [isOpen, user]);

    const loadNotes = async () => {
        setIsFetchingNotes(true);
        try {
            if (!user) return;
            const response = await fetchNotes({ userId: user.id, limit: 100 });
            // Filter out notes that are already in the folder
            const availableNotes = response.notes.filter(n => !existingNoteIds.includes(n.id));
            setNotes(availableNotes);
        } catch (error) {
            console.error("Failed to load notes", error);
        } finally {
            setIsFetchingNotes(false);
        }
    };

    const handleSubmit = async () => {
        if (selectedNotes.length === 0) return;
        await onSubmit(selectedNotes);
        setSelectedNotes([]);
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex flex-col h-full bg-white">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-900">Add Notes to Folder</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                    <NoteSelectionList
                        notes={notes}
                        selectedNotes={selectedNotes}
                        onSelectionChange={setSelectedNotes}
                        isLoading={isFetchingNotes}
                    />
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl">
                    <div className="flex-1 flex justify-start">
                        <button
                            onClick={() => router.push('/home')}
                            className="px-4 py-3 text-purple-600 font-medium hover:bg-purple-50 rounded-xl transition-colors flex items-center gap-2"
                        >
                            <Sparkles className="w-4 h-4" />
                            Generate New Note
                        </button>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || selectedNotes.length === 0}
                        className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gray-900/10 hover:-translate-y-0.5"
                    >
                        {isLoading ? "Adding..." : "Add Notes"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
