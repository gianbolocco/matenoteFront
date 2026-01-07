import api from "./api";
import { Folder } from "@/types";

export interface CreateFolderPayload {
    title: string;
    color: string;
    notes: string[]; // List of note IDs
}

export const getUserFolders = async (userId: string): Promise<Folder[]> => {
    try {
        const response = await api.get<{ status: string; data: { folders: Folder[] } }>(`/users/${userId}/folders`);
        return response.data.data.folders;
    } catch (error) {
        console.error("Failed to fetch folders:", error);
        throw error;
    }
};

export const createFolder = async (userId: string, data: CreateFolderPayload): Promise<Folder> => {
    try {
        const response = await api.post<{ status: string; data: { folder: Folder } }>(`/users/${userId}/folders`, data);
        return response.data.data.folder;
    } catch (error) {
        console.error("Failed to create folder:", error);
        throw error;
    }
};

export const getFolderById = async (folderId: string): Promise<Folder> => {
    try {
        const response = await api.get<{ status: string; data: { folder: Folder } }>(`/folders/${folderId}`);
        return response.data.data.folder;
    } catch (error) {
        console.error("Failed to fetch folder:", error);
        throw error;
    }
};

export const deleteFolder = async (folderId: string): Promise<void> => {
    try {
        await api.delete(`/folders/${folderId}`);
    } catch (error) {
        console.error("Failed to delete folder:", error);
        throw error;
    }
};

export const addNotesToFolder = async (folderId: string, noteIds: string[]): Promise<void> => {
    try {
        await api.post(`/folders/${folderId}/notes`, noteIds);
    } catch (error) {
        console.error("Failed to add notes to folder:", error);
        throw error;
    }
};

export const removeNoteFromFolder = async (folderId: string, noteId: string): Promise<void> => {
    try {
        await api.delete(`/folders/${folderId}/notes/${noteId}`);
    } catch (error) {
        console.error("Failed to remove note from folder:", error);
        throw error;
    }
};

export const updateFolder = async (folderId: string, data: { title: string; color: string }): Promise<Folder> => {
    try {
        const response = await api.patch<{ status: string; data: { folder: Folder } }>(`/folders/${folderId}`, data);
        return response.data.data.folder;
    } catch (error) {
        console.error("Failed to update folder:", error);
        throw error;
    }
};
