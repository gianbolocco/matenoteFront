import { useState, useEffect, useCallback } from "react";
import { Folder } from "@/types";
import { getUserFolders } from "@/services/folderService";

interface UseFoldersProps {
    userId: string | undefined;
    enabled?: boolean;
}

export function useFolders({ userId, enabled = true }: UseFoldersProps) {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadFolders = useCallback(async () => {
        if (!userId || !enabled) return;

        setIsLoading(true);
        setError(null);
        try {
            const userFolders = await getUserFolders(userId);
            setFolders(userFolders);
        } catch (err) {
            console.error("Failed to load folders:", err);
            setError("Failed to load folders");
        } finally {
            setIsLoading(false);
        }
    }, [userId, enabled]);

    useEffect(() => {
        loadFolders();
    }, [loadFolders]);

    return {
        folders,
        isLoading,
        error,
        refreshFolders: loadFolders
    };
}
