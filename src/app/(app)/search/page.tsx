"use client";

import { useState } from "react";
import { NotesList } from "@/components/common/NotesList";
import { useUser } from "@/context/UserContext";
import { Search as SearchIcon, X, SlidersHorizontal } from "lucide-react";
import { useNotes } from "@/hooks/useNotes";
import { FilterType } from "@/components/common/NotesToolbar";
import { AnimatePresence, motion } from "framer-motion";

export default function SearchPage() {
    const { user } = useUser();
    const LIMIT = 8;

    const {
        notes,
        loading,
        isLoadingMore,
        hasMore,
        searchQuery,
        setSearchQuery,
        activeFilter,
        setActiveFilter,
        handleClearFilters,
        loadMore
    } = useNotes({
        userId: undefined, // Global search
        limit: LIMIT,
    });

    const isSearching = searchQuery.length > 0;

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-8">

                {/* Hero Search Section */}
                <div className="flex flex-col items-center justify-center pt-24 pb-12 transition-all duration-500 ease-out">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                            Find your inspiration
                        </h1>
                        <p className="text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
                            Search through thousands of public notes and find what you need.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="w-full max-w-2xl relative group z-10"
                    >
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <SearchIcon className="h-6 w-6 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-14 pr-12 py-5 bg-white border border-gray-200 rounded-2xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] text-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 ease-out"
                            placeholder="What are you looking for today?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </motion.div>

                    {/* Minimalist Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap items-center justify-center gap-2 mt-8"
                    >
                        {(["all", "pdf", "video", "audio"] as const).map((type) => {
                            const value = type === "video" ? "youtube" : type;
                            const isActive = activeFilter === value;
                            const label = type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1);

                            return (
                                <button
                                    key={type}
                                    onClick={() => setActiveFilter(value as FilterType)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${isActive
                                        ? "bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-900/10 scale-105"
                                        : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-900"
                                        }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Results Section */}
                <div className="pb-24">
                    <NotesList
                        notes={notes}
                        searchQuery={searchQuery}
                        onClearFilters={handleClearFilters}
                        showSkeleton={loading}
                        hasMore={hasMore}
                        onLoadMore={loadMore}
                        isLoadingMore={isLoadingMore}
                    />
                </div>
            </div>
        </div>
    );
}
