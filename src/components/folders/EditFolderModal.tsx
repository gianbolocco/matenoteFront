"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Folder } from "@/types";

interface EditFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { title: string; color: string }) => Promise<void>;
    isLoading: boolean;
    folder: Folder;
}

const COLORS = [
    { id: "gray", bg: "bg-gray-100", border: "border-gray-200" },
    { id: "blue", bg: "bg-blue-100", border: "border-blue-200" },
    { id: "green", bg: "bg-green-100", border: "border-green-200" },
    { id: "yellow", bg: "bg-yellow-100", border: "border-yellow-200" },
    { id: "red", bg: "bg-red-100", border: "border-red-200" },
    { id: "violet", bg: "bg-violet-100", border: "border-violet-200" },
];

export function EditFolderModal({ isOpen, onClose, onSubmit, isLoading, folder }: EditFolderModalProps) {
    const [title, setTitle] = useState("");
    const [selectedColor, setSelectedColor] = useState("gray");

    useEffect(() => {
        if (isOpen && folder) {
            setTitle(folder.title);
            setSelectedColor(folder.color);
        }
    }, [isOpen, folder]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        await onSubmit({
            title,
            color: selectedColor,
        });
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-900">Editar Carpeta</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8 space-y-8">
                    {/* Title Input */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Nombre de la Carpeta</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="ej: Matemáticas 101"
                            className="w-full h-14 px-4 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-0 text-lg transition-all placeholder:text-gray-400"
                            autoFocus
                        />
                    </div>

                    {/* Color Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Color del Tema</label>
                        <div className="flex gap-3 flex-wrap">
                            {COLORS.map((color) => (
                                <button
                                    key={color.id}
                                    type="button"
                                    onClick={() => setSelectedColor(color.id)}
                                    className={`w-12 h-12 rounded-full ${color.bg} border-2 transition-all flex items-center justify-center ${selectedColor === color.id ? 'border-gray-900 scale-110 shadow-sm' : 'border-transparent hover:scale-105'
                                        }`}
                                >
                                    {selectedColor === color.id && <Check className="w-5 h-5 text-gray-900" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !title.trim()}
                        className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gray-900/10 hover:-translate-y-0.5"
                    >
                        {isLoading ? "Guardando..." : "Guardar Cambios"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
