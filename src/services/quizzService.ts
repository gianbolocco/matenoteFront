import api from "./api";
import { Quizz } from "@/types";

export const createQuizz = async (noteId: string): Promise<Quizz> => {
    try {
        const response = await api.post<{ status: string; data: { quiz: Quizz } }>("/quizzes", {
            noteId
        });
        return response.data.data.quiz;
    } catch (error) {
        console.error("Failed to create quizz:", error);
        throw error;
    }
};

export const getQuizzById = async (id: string): Promise<Quizz> => {
    try {
        const response = await api.get<{ status: string; data: { quiz: Quizz } }>(`/quizzes/${id}`);
        return response.data.data.quiz;
    } catch (error) {
        console.error("Failed to fetch quizz by ID:", error);
        throw error;
    }
};
