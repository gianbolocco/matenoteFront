"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { Note, User } from "@/types";
import { getNoteById } from "@/services/noteService";
import { getUserById } from "@/services/userService";

import { NoteHeader } from "@/components/noteDetail/NoteHeader";
import { VideoPlayer } from "@/components/noteDetail/VideoPlayer";
import { NoteSummary } from "@/components/noteDetail/NoteSummary";
import { NoteSections } from "@/components/noteDetail/NoteSections";
import { ChatSidebar } from "@/components/noteDetail/chat/ChatSidebar";

export default function NoteDetailPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params?.id as string;
    const previousRoute = searchParams?.get("from") || "home";

    const [note, setNote] = useState<Note | null>(null);
    const [creator, setCreator] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNoteAndCreator = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const fetchedNote = await getNoteById(id);
                setNote(fetchedNote);
                setError("");

                if (fetchedNote.userId) {
                    try {
                        const fetchedCreator = await getUserById(fetchedNote.userId);
                        setCreator(fetchedCreator);
                    } catch (userError) {
                        console.error("Failed to fetch creator:", userError);
                        // Don't fail the page if creator fails to load
                    }
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load note. It might have been deleted or does not exist.");
            } finally {
                setLoading(false);
            }
        };

        fetchNoteAndCreator();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500 font-medium animate-pulse">Loading note...</p>
            </div>
        );
    }

    if (error || !note) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
                <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
                    <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Note</h2>
                    <p className="text-gray-500 mb-6 leading-relaxed">{error || "Note not found"}</p>
                    <a
                        href="/home"
                        className="inline-flex h-10 items-center justify-center rounded-xl bg-gray-900 px-6 font-medium text-white shadow transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
                    >
                        Return Home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">

                <NoteHeader note={note} previousRoute={previousRoute} creator={creator} />

                {note.sourceType === "youtube" && (
                    <VideoPlayer url={note.source} />
                )}

                <NoteSummary summary={note.summary} />

                {note.sections && (
                    <NoteSections sections={note.sections} />
                )}
            </div>

            <ChatSidebar noteId={note.id} />
        </div>
    );
}
