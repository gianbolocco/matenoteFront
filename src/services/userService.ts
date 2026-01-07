import api from "./api";
import { User } from "@/types";

export const getUserById = async (userId: string): Promise<User> => {
    try {
        const response = await api.get<{ status: string; data: { user: User } }>(`/users/${userId}`);
        return response.data.data.user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
    }
};

export const updateUser = async (userId: string, data: Partial<User>): Promise<User> => {
    try {
        const response = await api.patch<{ status: string; data: { user: User } }>(`/users/${userId}`, data);
        return response.data.data.user;
    } catch (error) {
        console.error("Failed to update user:", error);
        throw error;
    }
};
