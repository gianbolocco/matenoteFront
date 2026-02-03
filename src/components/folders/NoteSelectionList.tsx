"use client";

import { useState } from "react";
import { Search, FileText, Check } from "lucide-react";
import { Note } from "@/types";

interface NoteSelectionListProps {
    notes: Note[];
    selectedNotes: string[];
    onSelectionChange: (selectedIds: string[]) => void;
    isLoading?: boolean;
}

export function NoteSelectionList({ notes, selectedNotes, onSelectionChange, isLoading = false }: NoteSelectionListProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const toggleNoteUsage = (noteId: string) => {
        onSelectionChange(
            selectedNotes.includes(noteId)
                ? selectedNotes.filter(id => id !== noteId)
                : [...selectedNotes, noteId]
        );
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Seleccionar Notas ({selectedNotes.length})
                </label>
            </div>

            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50/30">
                <div className="p-3 border-b border-gray-100 bg-white sticky top-0 md:static">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar notas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-9 pr-4 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-gray-200 transition-colors"
                        />
                    </div>
                </div>

                <div className="max-h-[250px] overflow-y-auto p-2 space-y-1">
                    {isLoading ? (
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
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedNotes.includes(note.id) ? 'bg-gray-900 border-gray-900' : 'border-gray-200 bg-white'
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
    );
}
