import { useState, useEffect } from "react";
import { Note } from "@/types";
import { fetchNotes } from "@/services/noteService";

interface UseNotesParams {
    userId: string | undefined;
    limit: number;
}

export function useNotes({ userId, limit }: UseNotesParams) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    // Search state
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Filter & Pagination
    const [activeFilter, setActiveFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPage(1);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch Notes
    useEffect(() => {
        const loadNotes = async () => {
            if (!userId) {
                setNotes([]);
                setLoading(false);
                return;
            }

            try {
                if (page === 1) {
                    setLoading(true);
                } else {
                    setIsLoadingMore(true);
                }

                const { notes: newNotes } = await fetchNotes({
                    userId,
                    page,
                    limit,
                    keyword: debouncedSearch,
                    sourceType: activeFilter
                });

                if (page === 1) {
                    setNotes(newNotes);
                } else {
                    setNotes(prev => [...prev, ...newNotes]);
                }

                setHasMore(newNotes.length >= limit);

            } catch (error) {
                console.error("Error loading notes:", error);
            } finally {
                setLoading(false);
                setIsLoadingMore(false);
            }
        };

        loadNotes();
    }, [userId, page, debouncedSearch, refreshTrigger, limit, activeFilter]);

    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
        setPage(1);
    };

    const handleClearFilters = () => {
        setSearchQuery("");
        setDebouncedSearch("");
        setActiveFilter("all");
        setPage(1);
    };

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    const refreshNotes = () => {
        setPage(1);
        setRefreshTrigger(prev => prev + 1);
    };

    const refreshSilent = async () => {
        if (!userId) return;
        try {
            const { notes: newNotes } = await fetchNotes({
                userId,
                page: 1,
                limit,
                keyword: debouncedSearch,
                sourceType: activeFilter
            });
            setNotes(newNotes);
            setHasMore(newNotes.length >= limit);
        } catch (e) {
            console.error(e);
        }
    };

    return {
        notes,
        loading,
        isLoadingMore,
        hasMore,
        searchQuery,
        setSearchQuery,
        activeFilter,
        setActiveFilter: handleFilterChange,
        handleClearFilters,
        loadMore,
        refreshNotes,
        refreshSilent,
        setPage,
        page
    };
}
