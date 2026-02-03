import { useState } from "react";
import { createNoteFromText } from "@/services/noteService";

interface UseTextNoteParams {
    userId: string | undefined;
    onSuccess?: () => Promise<void> | void;
}

export function useTextNote({ userId, onSuccess }: UseTextNoteParams) {
    const [isCreatingText, setIsCreatingText] = useState(false);
    const [creationError, setCreationError] = useState("");

    const createTextNote = async (text: string, folderId?: string, interest?: string) => {
        if (!userId) return;

        setIsCreatingText(true);
        setCreationError("");

        try {
            await createNoteFromText(userId, text, folderId, interest);

            if (onSuccess) {
                await onSuccess();
            }

        } catch (err) {
            console.error(err);
            setCreationError("Failed to create note from text. Please try again.");
            setTimeout(() => setCreationError(""), 5000);
        } finally {
            setIsCreatingText(false);
        }
    };

    return {
        isCreatingText,
        creationError,
        createTextNote
    };
}
