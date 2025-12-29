import api from "./api";
import { ChatMessage } from "@/types";

interface ChatHistoryResponse {
    status: string;
    data: {
        chatHistory: ChatMessage[];
    };
}

interface SendMessageResponse {
    status: string;
    data: {
        response: {
            messages: ChatMessage[];
            noteId: string;
            userId: string;
            id: string;
        };
    };
}

export const getChatHistory = async (noteId: string, userId: string): Promise<ChatMessage[]> => {
    try {
        const response = await api.get<ChatHistoryResponse>(`/notes/${noteId}/chat?userId=${userId}`);
        return response.data.data.chatHistory;
    } catch (error) {
        console.error("Failed to fetch chat history:", error);
        return [];
    }
};

export const sendMessage = async (noteId: string, userId: string, message: string): Promise<ChatMessage[]> => {
    try {
        const response = await api.post<SendMessageResponse>(`/notes/${noteId}/chat`, {
            userId,
            message
        });
        return response.data.data.response.messages;
    } catch (error) {
        console.error("Failed to send message:", error);
        throw error;
    }
};
