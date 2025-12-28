"use client";

import { useUser } from "@/context/UserContext";
import { HomeHeader } from "@/components/home/HomeHeader";
import { CreateNoteOptions } from "@/components/home/CreateNoteOptions";
import { FilterType } from "@/components/home/NotesToolbar";
import { NotesList } from "@/components/home/NotesList";
import { Loader2 } from "lucide-react";
import { useNotes } from "@/hooks/useNotes";
import { useYoutubeNote } from "@/hooks/useYoutubeNote";

export default function Home() {
  const { user, login } = useUser();
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
    loadMore,
    refreshNotes,
    refreshSilent,
    setPage,
    page
  } = useNotes({ userId: user?.id, limit: LIMIT });

  const { isCreatingYoutube, creationError, createYoutubeNote } = useYoutubeNote({
    userId: user?.id,
    onSuccess: async () => {
      // Logic to silently update list
      await refreshSilent();
      if (page !== 1) setPage(1);
    }
  });

  const handleNoteCreated = () => {
    refreshNotes();
  };

  const handleCreateYoutubeNote = (url: string) => {
    // If not page 1, reset page immediately to show loading skeleton on top area roughly
    if (page !== 1) setPage(1);
    createYoutubeNote(url);
  };

  return (
    <div className="min-h-screen">
      {/* Header Section with subtle background gradient at top */}
      <div className="relative pb-12">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-gray-50/50 to-transparent -z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <HomeHeader user={user} onLogin={login} />

          {/* Create Options - Inserted here so it scrolls with header */}
          <CreateNoteOptions onNoteCreated={handleNoteCreated} onYoutubeCreate={handleCreateYoutubeNote} />
        </div>
      </div>

      {/* Error Toast / Banner */}
      {creationError && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-red-50 text-red-600 px-6 py-3 rounded-full shadow-lg border border-red-100 flex items-center gap-2 font-medium">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            {creationError}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12">
        {loading && !isCreatingYoutube ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
            <p className="text-gray-500 text-sm font-medium">Loading notes...</p>
          </div>
        ) : (
          <NotesList
            notes={notes}
            searchQuery={searchQuery}
            onClearFilters={handleClearFilters}
            onSearchChange={setSearchQuery}
            activeFilter={activeFilter as FilterType}
            onFilterChange={(filter) => setActiveFilter(filter)}
            showSkeleton={isCreatingYoutube}
            hasMore={hasMore}
            onLoadMore={loadMore}
            isLoadingMore={isLoadingMore}
          />
        )}
      </main>
    </div>
  );
}
