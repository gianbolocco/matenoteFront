"use client";

import { useState, useEffect } from "react";
import { X, Check, Search, FileText } from "lucide-react";
import { fetchNotes } from "@/services/noteService";
import { CreateFolderPayload } from "@/services/folderService";
import { useUser } from "@/context/UserContext";
import { Modal } from "@/components/ui/Modal";
import { Note } from "@/types";

interface CreateFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateFolderPayload) => Promise<void>;
    isLoading: boolean;
}

const COLORS = [
    { id: "gray", bg: "bg-gray-100", border: "border-gray-200" },
    { id: "blue", bg: "bg-blue-100", border: "border-blue-200" },
    { id: "green", bg: "bg-green-100", border: "border-green-200" },
    { id: "yellow", bg: "bg-yellow-100", border: "border-yellow-200" },
    { id: "red", bg: "bg-red-100", border: "border-red-200" },
    { id: "purple", bg: "bg-purple-100", border: "border-purple-200" },
];

export function CreateFolderModal({ isOpen, onClose, onSubmit, isLoading }: CreateFolderModalProps) {
    const { user } = useUser();
    const [title, setTitle] = useState("");
    const [selectedColor, setSelectedColor] = useState("gray");
    const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
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
            const response = await fetchNotes({ userId: user.id, limit: 100 }); // Fetch reasonable limit
            setNotes(response.notes);
        } catch (error) {
            console.error("Failed to load notes", error);
        } finally {
            setIsFetchingNotes(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        await onSubmit({
            title,
            color: selectedColor,
            notes: selectedNotes
        });

        // Reset form
        setTitle("");
        setSelectedColor("gray");
        setSelectedNotes([]);
    };

    const toggleNoteUsage = (noteId: string) => {
        setSelectedNotes(prev =>
            prev.includes(noteId)
                ? prev.filter(id => id !== noteId)
                : [...prev, noteId]
        );
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex flex-col h-full bg-white">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-900">Create New Folder</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto flex-1 space-y-8 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                    {/* Title Input */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Folder Name</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Mathematics 101"
                            className="w-full h-14 px-4 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-lg transition-all placeholder:text-gray-400"
                            autoFocus
                        />
                    </div>

                    {/* Color Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Color Theme</label>
                        <div className="flex gap-3 flex-wrap">
                            {COLORS.map((color) => (
                                <button
                                    key={color.id}
                                    type="button"
                                    onClick={() => setSelectedColor(color.id)}
                                    className={`w-12 h-12 rounded-full ${color.bg} border-2 transition-all flex items-center justify-center ${selectedColor === color.id ? 'border-gray-900 scale-110 shadow-sm' : 'border-transparent hover:scale-105'
                                        }`}
                                >
                                    {selectedColor === color.id && <Check className="w-5 h-5 text-gray-900" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Note Selection */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Add Notes ({selectedNotes.length})</label>

                        </div>

                        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50/30">
                            <div className="p-3 border-b border-gray-100 bg-white sticky top-0 md:static">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search notes..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-10 pl-9 pr-4 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-gray-300 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="max-h-[250px] overflow-y-auto p-2 space-y-1">
                                {isFetchingNotes ? (
                                    <div className="p-8 text-center text-gray-400 text-sm">Loading notes...</div>
                                ) : filteredNotes.length > 0 ? (
                                    filteredNotes.map(note => (
                                        <div
                                            key={note.id}
                                            onClick={() => toggleNoteUsage(note.id)}
                                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${selectedNotes.includes(note.id)
                                                ? 'bg-gray-100 border border-gray-200'
                                                : 'hover:bg-gray-100 border border-transparent'
                                                }`}
                                        >
                                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedNotes.includes(note.id) ? 'bg-gray-900 border-gray-900' : 'border-gray-300 bg-white'
                                                }`}>
                                                {selectedNotes.includes(note.id) && <Check className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-gray-900 truncate">{note.title}</div>
                                                <div className="text-xs text-gray-500 truncate">{new Date(note.createDate).toLocaleDateString()}</div>
                                            </div>
                                            <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-400 text-sm">No notes found</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !title.trim()}
                        className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gray-900/10 hover:-translate-y-0.5"
                    >
                        {isLoading ? "Creating..." : "Create Folder"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

