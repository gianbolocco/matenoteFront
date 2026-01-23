import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { COUNTRIES, OCCUPATIONS } from "../../app/onboarding/constants";

interface ProfileDetailsStepProps {
    country: string;
    age: string;
    occupation: string;
    onChange: (field: "country" | "age" | "occupation", value: string) => void;
}

export function ProfileDetailsStep({ country, age, occupation, onChange }: ProfileDetailsStepProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                    label="Country"
                    value={country}
                    onChange={(e) => onChange("country", e.target.value)}
                    options={COUNTRIES}
                    className="focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 "
                />
                <Input
                    label="Age"
                    type="number"
                    placeholder="e.g. 24"
                    value={age}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === "" || (parseInt(val) >= 0 && parseInt(val) <= 99)) {
                            onChange("age", val);
                        }
                    }}
                />
            </div>

            <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 block">Occupation</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {OCCUPATIONS.map((occ) => {
                        const isSelected = occupation === occ.value;
                        const Icon = occ.icon;

                        return (
                            <button
                                key={occ.value}
                                onClick={() => onChange("occupation", occ.value)}
                                className={`
                                    flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 gap-3
                                    ${isSelected
                                        ? "bg-violet-50 border-violet-500 ring-1 ring-violet-500 shadow-sm"
                                        : "bg-white border-gray-200 hover:border-violet-200 hover:bg-gray-50"
                                    }
                                `}
                            >
                                <div className={`p-2 rounded-lg border border-gray-200 ${isSelected ? "bg-violet-100 text-violet-600" : "bg-gray-100 text-gray-500"}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className={`text-xs font-medium text-center ${isSelected ? "text-violet-900" : "text-gray-600"}`}>
                                    {occ.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
