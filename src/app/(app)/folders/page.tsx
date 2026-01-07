"use client";

import { useState, useEffect } from "react";
import { FolderPlus, Search, FolderOpen } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { getUserFolders, createFolder, CreateFolderPayload } from "@/services/folderService";
import { Folder } from "@/types";
import { FolderCard } from "@/components/folders/FolderCard";
import { CreateFolderModal } from "@/components/folders/CreateFolderModal";
import Link from "next/link";

export default function FoldersPage() {
    const { user } = useUser();
    const [folders, setFolders] = useState<Folder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (user) {
            loadFolders();
        }
    }, [user]);

    const loadFolders = async () => {
        setIsLoading(true);
        try {
            if (!user) return;
            const userFolders = await getUserFolders(user.id);
            setFolders(userFolders);
        } catch (error) {
            console.error("Failed to load folders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateFolder = async (data: CreateFolderPayload) => {
        if (!user) return;
        setIsCreating(true);
        try {
            const newFolder = await createFolder(user.id, data);
            setFolders(prev => [newFolder, ...prev]);
            setIsCreateModalOpen(false);
        } catch (error) {
            console.error("Failed to create folder:", error);
        } finally {
            setIsCreating(false);
        }
    };

    const filteredFolders = folders.filter(folder =>
        folder.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!user) return null; // Or loading state

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Folders</h1>
                    <p className="text-gray-500 mt-1">Organize your notes into collections</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="h-11 px-5 bg-gray-900 text-white font-medium rounded-xl flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-gray-900/10 hover:-translate-y-0.5 whitespace-nowrap"
                    >
                        <FolderPlus className="w-5 h-5" />
                        New Folder
                    </button>
                </div>
            </div>

            {/* Folder Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-40 bg-gray-100 rounded-3xl animate-pulse" />
                    ))}
                </div>
            ) : filteredFolders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredFolders.map((folder) => (
                        <FolderCard key={folder.id} folder={folder} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                        <FolderOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">No folders yet</h3>
                    <p className="text-gray-500 max-w-xs mx-auto mb-6">Create your first folder to start organizing your study materials.</p>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="text-gray-900 font-semibold hover:underline"
                    >
                        Create a folder now
                    </button>
                </div>
            )}

            <CreateFolderModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateFolder}
                isLoading={isCreating}
            />
        </div>
    );
}
