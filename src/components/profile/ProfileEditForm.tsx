"use client";

import { User } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@/context/UserContext";
import { Loader2, Save, X, Plus } from "lucide-react";
import { COUNTRIES, OCCUPATIONS, PURPOSES } from "@/app/onboarding/constants";

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
}

export function ProfileEditForm({ user, onCancel, onSuccess }: ProfileEditFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { updateUser } = useUser();

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

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addInterest();
        }
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in zoom-in-95 duration-300 bg-white rounded-2xl p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Nombre */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Nombre</label>
                    <input
                        {...register("name", { required: "El nombre es requerido" })}
                        maxLength={50}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-gray-900"
                        placeholder="Tu nombre"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>

                {/* Edad */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Edad</label>
                    <input
                        type="number"
                        {...register("age", { required: "La edad es requerida", min: { value: 5, message: "Edad no válida" }, max: { value: 100, message: "Edad no válida" } })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-gray-900"
                        placeholder="24"
                    />
                    {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
                </div>

                {/* País */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">País</label>
                    <select
                        {...register("country")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-white text-gray-900"
                    >
                        {COUNTRIES.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                    </select>
                </div>

                {/* Ocupación */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Ocupación</label>
                    <select
                        {...register("occupation")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-white text-gray-900"
                    >
                        {OCCUPATIONS.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Propósito */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Propósito de uso</label>
                <select
                    {...register("usagePurpose")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-white text-gray-900"
                >
                    {PURPOSES.map((p) => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                </select>
            </div>

            {/* Intereses */}
            <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700">Intereses</label>
                <div className="flex gap-2">
                    <input
                        value={interestInput}
                        onChange={(e) => setInterestInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        maxLength={32}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-gray-900"
                        placeholder="Ej. Historia, Matemáticas..."
                    />
                    <button
                        type="button"
                        onClick={addInterest}
                        disabled={!interestInput.trim()}
                        className="px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                    {interests.map(i => (
                        <span key={i} className="px-3 py-1.5 bg-gray-100 border border-gray-200 text-gray-700 rounded-lg text-sm font-bold flex items-center gap-2">
                            {i}
                            <button type="button" onClick={() => removeInterest(i)} className="hover:text-black transition-colors">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                    {interests.length === 0 && (
                        <span className="text-sm text-gray-400 italic">No tienes intereses seleccionados.</span>
                    )}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 px-8 py-2.5 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all disabled:opacity-70 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Guardar Cambios</span>
                </button>
            </div>
        </form>
    );
}
