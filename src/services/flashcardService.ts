import api from "./api";
import { FlashcardSet } from "@/types";

export const createFlashcards = async (noteId: string): Promise<FlashcardSet> => {
    try {
        const response = await api.post<{ status: string; data: { flashcard: FlashcardSet } }>("/flashcards", {
            noteId
        });
        return response.data.data.flashcard;
    } catch (error) {
        console.error("Failed to create flashcards:", error);
        throw error;
    }
};

export const getFlashcardsByNote = async (noteId: string): Promise<FlashcardSet | null> => {
    try {
        const response = await api.get<{ status: string; data: { flashcard: FlashcardSet } }>(`/flashcards/note/${noteId}`);
        return response.data.data.flashcard;
    } catch (error) {
        // If 404, it might mean none exist yet, which is fine
        console.warn("Failed to fetch flashcards by note:", error);
        return null;
    }
};

export const getFlashcardsById = async (id: string): Promise<FlashcardSet> => {
    try {
        const response = await api.get<{ status: string; data: { flashcard: FlashcardSet } }>(`/flashcards/${id}`);
        return response.data.data.flashcard;
    } catch (error) {
        console.error("Failed to fetch flashcards by ID:", error);
        throw error;
    }
};
