"use client";

import { User } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@/context/UserContext";
import { Loader2, Save } from "lucide-react";

interface ProfileEditFormProps {
    user: User;
    onCancel: () => void;
    onSuccess: () => void;
}

interface FormData {
    name: string;
    age: number;
    country: string;
    occupation: string;
    usagePurpose: string;
    // interests handled separately usually or via array field
}

export function ProfileEditForm({ user, onCancel, onSuccess }: ProfileEditFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { updateUser } = useUser();

    // Simple controlled state for interests for now to save time vs useFieldArray
    const [interests, setInterests] = useState<string[]>(user.interests || []);
    const [interestInput, setInterestInput] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            name: user.name,
            age: user.age,
            country: user.country,
            occupation: user.occupation,
            usagePurpose: user.usagePurpose,
        }
    });

    const addInterest = () => {
        if (interestInput.trim() && !interests.includes(interestInput.trim())) {
            setInterests([...interests, interestInput.trim()]);
            setInterestInput("");
        }
    };

    const removeInterest = (interest: string) => {
        setInterests(interests.filter(i => i !== interest));
    };

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            await updateUser({
                ...data,
                interests
            });
            onSuccess();
        } catch (error) {
            console.error("Failed to update profile", error);
            // Add toast notification here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Username</label>
                    <input
                        {...register("name", { required: "Name is required" })}
                        maxLength={50}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 transition-all"
                        placeholder="Your username"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>


                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Occupation</label>
                    <input
                        {...register("occupation")}
                        maxLength={50}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 transition-all"
                        placeholder="What passes your time?"
                    />
                    {errors.occupation && <p className="text-red-500 text-xs">{errors.occupation.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Usage Purpose</label>
                <select
                    {...register("usagePurpose")}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 transition-all bg-white"
                >
                    <option value="">Select a purpose...</option>
                    <option value="Education">Education</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal Research</option>
                    <option value="Content Creation">Content Creation</option>
                </select>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700">Interests</label>
                <div className="flex gap-2">
                    <input
                        value={interestInput}
                        onChange={(e) => setInterestInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400 transition-all"
                        placeholder="Add an interest (e.g. History, Math) and press Enter"
                    />
                    <button
                        type="button"
                        onClick={addInterest}
                        className="px-6 py-2.5 bg-gray-50 border border-gray-200 font-bold text-gray-700 rounded-lg hover:bg-gray-100"
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {interests.map(i => (
                        <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-600 rounded-md text-sm font-bold flex items-center gap-2">
                            {i}
                            <button type="button" onClick={() => removeInterest(i)} className="hover:text-red-500">×</button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 px-8 py-2.5 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-all disabled:opacity-70"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Changes</span>
                </button>
            </div>
        </form>
    );
}
