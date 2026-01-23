import { PURPOSES } from "../../app/onboarding/constants";

interface UsagePurposeStepProps {
    value: string;
    onChange: (val: string) => void;
}

export function UsagePurposeStep({ value, onChange }: UsagePurposeStepProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PURPOSES.map((p) => (
                <button
                    key={p.id}
                    onClick={() => onChange(p.id)}
                    className={`
                        flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300
                        ${value === p.id
                            ? "border-violet-500 ring-1 ring-violet-500 bg-violet-50"
                            : "border-gray-200 hover:border-violet-200 hover:bg-gray-50"}
                    `}
                >
                    <div className={`p-3 rounded-xl mb-3 ${value === p.id ? "bg-violet-600 text-white shadow-lg shadow-violet-200" : "bg-gray-100 text-gray-500"}`}>
                        <p.icon className="w-6 h-6" />
                    </div>
                    <span className={`font-bold ${value === p.id ? "text-violet-900" : "text-gray-900"}`}>{p.label}</span>
                    <span className="text-xs text-gray-500 mt-1">{p.description}</span>
                </button>
            ))}
        </div>
    );
}
