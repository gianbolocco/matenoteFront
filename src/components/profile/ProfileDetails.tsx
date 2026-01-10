"use client";

import { User } from "@/types";
import { MapPin, Briefcase, Heart, Calendar, FileText } from "lucide-react";

interface ProfileDetailsProps {
    user: User;
}

export function ProfileDetails({ user }: ProfileDetailsProps) {
    const details = [
        { icon: MapPin, label: "Country", value: user.country || "Not specified" },
        { icon: Briefcase, label: "Occupation", value: user.occupation || "Not specified" },
        { icon: FileText, label: "Notes Created", value: "12" },
        {
            icon: Calendar,
            label: "Joined",
            value: user.createDate
                ? new Date(user.createDate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
                : "Not specified"
        }
    ];

    return (
        <>
            {/* Grid Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 max-w-3xl mx-auto">
                {details.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 text-gray-400">
                        <item.icon className="w-5 h-5" />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">{item.label}</span>
                            <span className="text-gray-900 font-semibold text-base">{item.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Interests Section */}
            <div className="mt-10">
                <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold text-lg">
                    <Heart className="w-5 h-5 text-red-500" />
                    <h2>Interests</h2>
                </div>

                {user.interests && user.interests.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                        {user.interests.map((interest, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium"
                            >
                                {interest}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No interests added yet.</p>
                )}
            </div>
        </>
    );
}
