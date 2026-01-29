"use client";

import { useUser } from "@/context/UserContext";
import { useNotification } from "@/context/NotificationContext";
import * as userService from "@/services/userService";
import { StreakCard } from "@/components/home/StreakCard";
import { HomeHeader } from "@/components/home/HomeHeader";
import { CreateNoteOptions } from "@/components/home/CreateNoteOptions";
import { NotesToolbar, FilterType } from "@/components/common/NotesToolbar";
import { NotesList } from "@/components/common/NotesList";
import { Loader2 } from "lucide-react";
import { useNotes } from "@/hooks/useNotes";
import { useYoutubeNote } from "@/hooks/useYoutubeNote";
import { usePdfNote } from "@/hooks/usePdfNote";
import { useAudioNote } from "@/hooks/useAudioNote";

export default function Home() {
  const { user, login, refreshUser } = useUser();
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

  const { isCreatingYoutube, creationError: youtubeError, createYoutubeNote } = useYoutubeNote({
    userId: user?.id,
    onSuccess: async () => {
      // Logic to silently update list
      await refreshSilent();
      if (page !== 1) setPage(1);
    }
  });

  const { isCreatingPdf, creationError: pdfError, createPdfNote } = usePdfNote({
    userId: user?.id,
    onSuccess: async () => {
      await refreshSilent();
      if (page !== 1) setPage(1);
    }
  });

  const { isCreatingAudio, creationError: audioError, createAudioNote } = useAudioNote({
    userId: user?.id,
    onSuccess: async () => {
      await refreshSilent();
      if (page !== 1) setPage(1);
    }
  });

  /* Notification Logic: Only show if streak actually increased or refreshed for the day */
  const { showStreakNotification } = useNotification();

  const handleNoteCreated = async () => {
    refreshNotes();
    if (user?.id) {
      const oldStreak = user.streak?.current || 0;
      await userService.updateStreak(user.id);
      const newUser = await refreshUser();

      // If streak increased (ideal case) or if we want to be generous on the first update of the day
      if (newUser && newUser.streak && newUser.streak.current > oldStreak) {
        showStreakNotification("¡Nota creada! Tu racha sigue activa.");
      } else if (newUser && newUser.streak?.current === oldStreak && oldStreak > 0) {
        // Optional: If you want to notify anyway for engagement, uncomment below.
        // But user requested "no notification if activity happened recently".
        // We can assume if streak didn't increase, it wasn't triggered or already done today.
        // Let's stick to only showing when it matters or verifies a change.
        // Actually, API might not increment if already done today.
      }
    }
  };

  const handleCreateYoutubeNote = (url: string, folderId?: string, interest?: string) => {
    // If not page 1, reset page immediately to show loading skeleton on top area roughly
    if (page !== 1) setPage(1);
    createYoutubeNote(url, folderId, interest);
  };

  const handleCreatePdfNote = (file: File, folderId?: string, interest?: string) => {
    if (page !== 1) setPage(1);
    createPdfNote(file, folderId, interest);
  };

  const handleCreateAudioNote = (file: File, folderId?: string, interest?: string) => {
    if (page !== 1) setPage(1);
    createAudioNote(file, folderId, interest);
  };

  const creationError = youtubeError || pdfError || audioError;
  const isCreating = isCreatingYoutube || isCreatingPdf || isCreatingAudio;

  return (
    <div className="min-h-screen">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-gray-50/50 to-transparent -z-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <HomeHeader user={user} onLogin={login} />

        {user?.streak && (
          <div className="mt-8 mb-2">
            <StreakCard
              currentStreak={user.streak.current}
              longestStreak={user.streak.longest}
            />
          </div>
        )}

        {/* Create Options - Inserted here so it scrolls with header */}
        <CreateNoteOptions
          onNoteCreated={handleNoteCreated}
          onYoutubeCreate={handleCreateYoutubeNote}
          onPdfCreate={handleCreatePdfNote}
          onAudioCreate={handleCreateAudioNote}
        />
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
        {loading && !isCreating ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
            <p className="text-gray-500 text-sm font-medium">Loading notes...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <NotesToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeFilter={activeFilter as FilterType}
              onFilterChange={(filter) => setActiveFilter(filter)}
            />
            <NotesList
              notes={notes}
              searchQuery={searchQuery}
              onClearFilters={handleClearFilters}
              showSkeleton={isCreating}
              hasMore={hasMore}
              onLoadMore={loadMore}
              isLoadingMore={isLoadingMore}
            />
          </div>
        )}
      </main>
    </div>
  );
}
