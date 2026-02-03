"use client";

import { User } from "@/types";
import { Pencil, X } from "lucide-react";

interface ProfileHeaderProps {
    user: User;
    isEditing: boolean;
    onEditToggle: () => void;
}

export function ProfileHeader({ user, isEditing, onEditToggle }: ProfileHeaderProps) {
    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Avatar */}
            <div className="relative group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-3xl font-bold border border-gray-200">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <span className="text-gray-500">{initials}</span>
                    )}
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-500 font-medium">{user.email}</p>
                <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100">
                        Plan {user.plan || "Gratuito"}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <button
                onClick={onEditToggle}
                className={`
                    flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all border
                    ${isEditing
                        ? "bg-white border-red-200 text-red-600 hover:bg-red-50"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-200"
                    }
                `}
            >
                {isEditing ? (
                    <>
                        <X className="w-4 h-4" />
                        <span>Cancelar Edición</span>
                    </>
                ) : (
                    <>
                        <Pencil className="w-4 h-4" />
                        <span>Editar Perfil</span>
                    </>
                )}
            </button>
        </div>
    );
}
