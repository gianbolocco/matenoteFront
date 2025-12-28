import { useState } from "react";
import { createNoteFromPdf } from "@/services/noteService";

interface UsePdfNoteParams {
    userId: string | undefined;
    onSuccess?: () => Promise<void> | void;
}

export function usePdfNote({ userId, onSuccess }: UsePdfNoteParams) {
    const [isCreatingPdf, setIsCreatingPdf] = useState(false);
    const [creationError, setCreationError] = useState("");

    const createPdfNote = async (file: File) => {
        if (!userId) return;

        setIsCreatingPdf(true);
        setCreationError("");

        try {
            await createNoteFromPdf(userId, file);

            if (onSuccess) {
                await onSuccess();
            }

        } catch (err) {
            console.error(err);
            setCreationError("Failed to create note from PDF. Please try again.");
            setTimeout(() => setCreationError(""), 5000);
        } finally {
            setIsCreatingPdf(false);
        }
    };

    return {
        isCreatingPdf,
        creationError,
        createPdfNote
    };
}
