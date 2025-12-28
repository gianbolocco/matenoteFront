import { useState } from "react";
import { createNoteFromYoutube } from "@/services/noteService";

interface UseYoutubeNoteParams {
    userId: string | undefined;
    onSuccess?: () => Promise<void> | void;
}

export function useYoutubeNote({ userId, onSuccess }: UseYoutubeNoteParams) {
    const [isCreatingYoutube, setIsCreatingYoutube] = useState(false);
    const [creationError, setCreationError] = useState("");

    const createYoutubeNote = async (url: string) => {
        if (!userId) return;

        setIsCreatingYoutube(true);
        setCreationError("");

        try {
            await createNoteFromYoutube(userId, url);

            if (onSuccess) {
                await onSuccess();
            }

        } catch (err) {
            console.error(err);
            setCreationError("Failed to create note from YouTube. Please try again.");
            setTimeout(() => setCreationError(""), 5000);
        } finally {
            setIsCreatingYoutube(false);
        }
    };

    return {
        isCreatingYoutube,
        creationError,
        createYoutubeNote
    };
}
