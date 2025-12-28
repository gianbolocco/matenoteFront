import api from "./api";
import { Note } from "@/types";

export interface NotesResponse {
    status: string;
    results: number;
    data: {
        notes: Note[];
    };
}

export interface FetchNotesParams {
    userId: string;
    page?: number;
    limit?: number;
    keyword?: string;
    sourceType?: string;
}

export const fetchNotes = async ({ userId, page = 1, limit = 10, keyword = "", sourceType }: FetchNotesParams) => {
    try {
        const params = new URLSearchParams({
            userId,
            page: page.toString(),
            limit: limit.toString(),
        });

        if (keyword) {
            params.append("keyword", keyword);
        }

        if (sourceType && sourceType !== "all") {
            params.append("sourceType", sourceType);
        }

        const response = await api.get<NotesResponse>(`/notes?${params.toString()}`);
        return {
            notes: response.data.data.notes,
            total: response.data.results
        };
    } catch (error) {
        console.error("Failed to fetch notes:", error);
        throw error;
    }
};


export const createNoteFromYoutube = async (userId: string, link: string): Promise<Note> => {
    try {
        const response = await api.post<{ status: string; data: { note: Note } }>("/notes/youtube", {
            userId,
            link
        });
        return response.data.data.note;
    } catch (error) {
        console.error("Failed to create note from YouTube:", error);
        throw error;
    }
};

export const createNoteFromPdf = async (userId: string, file: File): Promise<Note> => {
    try {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("pdf", file);

        const response = await api.post<{ status: string; data: { note: Note } }>("/notes/pdf", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.data.note;
    } catch (error) {
        console.error("Failed to create note from PDF:", error);
        throw error;
    }
};
