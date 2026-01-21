import { useState } from "react";
import { createNoteFromAudio } from "@/services/noteService";

interface UseAudioNoteParams {
    userId: string | undefined;
    onSuccess?: () => Promise<void> | void;
}

export function useAudioNote({ userId, onSuccess }: UseAudioNoteParams) {
    const [isCreatingAudio, setIsCreatingAudio] = useState(false);
    const [creationError, setCreationError] = useState("");

    const createAudioNote = async (file: File, folderId?: string) => {
        if (!userId) return;

        setIsCreatingAudio(true);
        setCreationError("");

        try {
            await createNoteFromAudio(userId, file, folderId);

            if (onSuccess) {
                await onSuccess();
            }

        } catch (err: any) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "Failed to create note from audio. Please try again.";
            setCreationError(errorMessage);
            setTimeout(() => setCreationError(""), 5000);
        } finally {
            setIsCreatingAudio(false);
        }
    };

    return {
        isCreatingAudio,
        creationError,
        createAudioNote
    };
}
