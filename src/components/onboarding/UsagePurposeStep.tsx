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
                        flex flex-col items-center text-center p-6 rounded-2xl border transition-all
                        ${value === p.id
                            ? "border-black ring-1 ring-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-200 hover:bg-gray-50"}
                    `}
                >
                    <div className={`p-3 rounded-full mb-3 ${value === p.id ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}>
                        <p.icon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-gray-900">{p.label}</span>
                    <span className="text-xs text-gray-500 mt-1">{p.description}</span>
                </button>
            ))}
        </div>
    );
}
