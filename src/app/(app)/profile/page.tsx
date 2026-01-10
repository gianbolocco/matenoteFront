"use client";

import { useEffect, useState } from "react";
import { User } from "@/types";
import { useUser } from "@/context/UserContext";
import { getUserById } from "@/services/userService";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
    const { user, updateUser } = useUser(); // Using simple fetch or hook
    const [isEditing, setIsEditing] = useState(false);

    // Fallback if useUser is not established, we fetch manually
    // But typically apps have a useUser hook. I saw useUser in NoteHeader.

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="p-8 md:p-10 border-b border-gray-100">
                    <ProfileHeader
                        user={user}
                        isEditing={isEditing}
                        onEditToggle={() => setIsEditing(!isEditing)}
                    />
                </div>

                <div className="p-8 md:p-10">
                    {isEditing ? (
                        <ProfileEditForm
                            user={user}
                            onCancel={() => setIsEditing(false)}
                            onSuccess={() => {
                                setIsEditing(false);
                            }}
                        />
                    ) : (
                        <ProfileDetails user={user} />
                    )}
                </div>
            </div>
        </div>
    );
}
