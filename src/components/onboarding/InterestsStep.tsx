import { useState } from "react";
import { Plus, X } from "lucide-react";
import { INTRESTS_LIST } from "../../app/onboarding/constants";

interface InterestsStepProps {
    selectedInterests: string[];
    onChange: (interests: string[]) => void;
}

export function InterestsStep({ selectedInterests, onChange }: InterestsStepProps) {
    const [customInterest, setCustomInterest] = useState("");

    const toggleInterest = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            onChange(selectedInterests.filter(i => i !== interest));
        } else {
            if (selectedInterests.length >= 3) return;
            onChange([...selectedInterests, interest]);
        }
    };

    const addCustomInterest = () => {
        if (!customInterest.trim()) return;
        if (selectedInterests.length >= 3) return;
        if (selectedInterests.includes(customInterest.trim())) {
            setCustomInterest("");
            return;
        }

        onChange([...selectedInterests, customInterest.trim()]);
        setCustomInterest("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCustomInterest();
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Agregar interés específico
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ej. Física Cuántica"
                            className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all disabled:bg-gray-50 disabled:text-gray-500 text-gray-900"
                            value={customInterest}
                            onChange={(e) => setCustomInterest(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={selectedInterests.length >= 3}
                            maxLength={30}
                        />
                        <button
                            onClick={addCustomInterest}
                            disabled={!customInterest.trim() || selectedInterests.length >= 3}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-violet-600 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-violet-700 transition-all hover:scale-105 active:scale-95"
                            title="Agregar interés"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex justify-between items-center mt-1.5">
                        <p className="text-xs text-gray-400">Presiona <kbd className="font-sans px-1 py-0.5 bg-gray-100 rounded border border-gray-200 text-gray-500">Enter</kbd> para agregar</p>
                        {selectedInterests.length >= 3 && (
                            <p className="text-xs text-amber-600 font-medium">Máximo 3 intereses alcanzado.</p>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2.5 justify-center pt-2">
                    {/* Selected Interests */}
                    {selectedInterests.map((interest) => (
                        <button
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            className="px-4 py-2 rounded-full text-sm font-bold transition-all border bg-violet-600 text-white border-violet-600 flex items-center gap-2 group shadow-md shadow-violet-200"
                        >
                            {interest}
                            <X className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                        </button>
                    ))}

                    {/* Suggestion List */}
                    {INTRESTS_LIST.filter(i => !selectedInterests.includes(i)).map((interest) => (
                        <button
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            disabled={selectedInterests.length >= 3}
                            className="px-4 py-2 rounded-full text-sm font-medium transition-all border bg-white text-gray-600 border-gray-200 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {interest}
                        </button>
                    ))}
                </div>

                <div className="text-center text-sm text-gray-500 mt-4">
                    {selectedInterests.length}/3 seleccionados
                    <p className="text-xs text-gray-400 mt-1">Usaremos esto para personalizar tus resúmenes con IA.</p>
                </div>
            </div>
        </div>
    );
}
