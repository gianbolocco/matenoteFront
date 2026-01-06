import { Note } from "@/types";
import { NoteCard } from "@/components/notes/NoteCard";
import { Search, BookOpen, Grid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { NotesToolbar, FilterType } from "./NotesToolbar";

import { NoteCardSkeleton } from "../notes/NoteCardSkeleton";
import { Loader2 } from "lucide-react";

interface NotesListProps {
    notes: Note[];
    searchQuery: string;
    onClearFilters: () => void;
    onSearchChange: (value: string) => void;
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    showSkeleton?: boolean;
    hasMore?: boolean;
    onLoadMore?: () => void;
    isLoadingMore?: boolean;
}

export function NotesList({
    notes,
    searchQuery,
    onClearFilters,
    onSearchChange,
    activeFilter,
    onFilterChange,
    showSkeleton = false,
    hasMore = false,
    onLoadMore,
    isLoadingMore = false
}: NotesListProps) {
    if (notes.length === 0 && !showSkeleton) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-20 text-center bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl"
            >
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No notes found</h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                    We couldn't find any notes matching "{searchQuery}" with the current filters.
                </p>
                <button
                    onClick={onClearFilters}
                    className="text-primary font-medium hover:underline"
                >
                    Clear all filters
                </button>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                        <Grid className="w-4 h-4" />
                        <span>My Notes</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-sm font-medium">{notes.length} Notes</span>
                    </div>
                </div>

                <NotesToolbar
                    searchQuery={searchQuery}
                    onSearchChange={onSearchChange}
                    activeFilter={activeFilter}
                    onFilterChange={onFilterChange}
                />
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start"
            >
                <AnimatePresence mode="popLayout">
                    {showSkeleton && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="w-full"
                        >
                            <NoteCardSkeleton />
                        </motion.div>
                    )}

                    {notes.map((note) => (
                        <motion.div
                            layout
                            key={note.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <NoteCard note={note} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Load More Button */}
            {hasMore && (
                <div className="flex justify-center mt-8 pt-6 border-t border-gray-100">
                    <button
                        onClick={onLoadMore}
                        disabled={isLoadingMore}
                        className="px-6 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-full shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoadingMore ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Loading...</span>
                            </>
                        ) : (
                            "Load More Notes"
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
