"use client";

import { User } from "@/types";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { MapPin, Briefcase, Heart, Calendar, FileText, Plus, X, Loader2 } from "lucide-react";

interface ProfileDetailsProps {
    user: User;
}

export function ProfileDetails({ user }: ProfileDetailsProps) {
    const { updateUser } = useUser();
    const [isEditingInterests, setIsEditingInterests] = useState(false);
    const [tempInterests, setTempInterests] = useState<string[]>([]);
    const [interestInput, setInterestInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const startEditing = () => {
        setTempInterests(user.interests || []);
        setIsEditingInterests(true);
    };

    const cancelEditing = () => {
        setIsEditingInterests(false);
        setInterestInput("");
        setTempInterests([]);
    };

    const saveInterests = async () => {
        setIsLoading(true);
        try {
            await updateUser({
                interests: tempInterests
            });
            setIsEditingInterests(false);
        } catch (error) {
            console.error("Failed to save interests", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddInterest = () => {
        if (!interestInput.trim()) return;
        const newInterest = interestInput.trim();

        if (tempInterests.includes(newInterest)) {
            setInterestInput("");
            return;
        }

        setTempInterests([...tempInterests, newInterest]);
        setInterestInput("");
    };

    const handleRemoveInterest = (interestToRemove: string) => {
        setTempInterests(tempInterests.filter(i => i !== interestToRemove));
    };

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

    const displayInterests = isEditingInterests ? tempInterests : (user.interests || []);

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
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-900 font-bold text-lg">
                        <Heart className="w-5 h-5 text-red-500" />
                        <h2>Interests</h2>
                    </div>
                    {!isEditingInterests && (
                        <button
                            onClick={startEditing}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700 rounded-lg transition-all font-bold text-sm border border-gray-200"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Manage Interests</span>
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    {/* Interest Input (Only visible when editing) */}
                    {isEditingInterests && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="flex gap-2 max-w-md mb-4">
                                <input
                                    type="text"
                                    value={interestInput}
                                    onChange={(e) => setInterestInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddInterest()}
                                    placeholder="Add a new interest..."
                                    maxLength={32}
                                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 transition-all"
                                    autoFocus
                                />
                                <button
                                    onClick={handleAddInterest}
                                    disabled={!interestInput.trim()}
                                    className="px-6 py-2.5 bg-gray-50 border border-gray-200 font-bold text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Interest List */}
                    <div className="flex flex-wrap gap-2.5">
                        {displayInterests.length > 0 ? (
                            displayInterests.map((interest, index) => (
                                <div
                                    key={index}
                                    className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-600 rounded-md text-sm font-bold flex items-center gap-2"
                                >
                                    <span>{interest}</span>
                                    {isEditingInterests && (
                                        <button
                                            onClick={() => handleRemoveInterest(interest)}
                                            className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                            aria-label={`Remove ${interest}`}
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            !isEditingInterests && (
                                <div className="p-8 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center max-w-lg mx-auto md:mx-0">
                                    <Heart className="w-8 h-8 text-gray-200 mb-2" />
                                    <p className="text-gray-400 font-medium">No interests added yet</p>
                                    <p className="text-sm text-gray-400">Add topics you enjoy learning about.</p>
                                </div>
                            )
                        )}
                    </div>

                    {/* Action Buttons (Only visible when editing) */}
                    {isEditingInterests && (
                        <div className="flex justify-end gap-3 max-w-md pt-2 border-t border-gray-100 mt-4">
                            <button
                                onClick={cancelEditing}
                                className="px-6 py-2.5 font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveInterests}
                                disabled={isLoading}
                                className="flex items-center gap-2 px-8 py-2.5 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-all disabled:opacity-70"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
