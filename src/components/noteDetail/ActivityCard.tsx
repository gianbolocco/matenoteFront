import { LucideIcon } from "lucide-react";

interface ActivityCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    color: string; // Tailwind classes e.g. "bg-violet-50 text-violet-600"
    onClick: () => void;
    disabled?: boolean;
    badge?: string | null;
    iconClass?: string;
    isLoading?: boolean;
}

export function ActivityCard({
    title,
    description,
    icon: Icon,
    color,
    onClick,
    disabled = false,
    badge,
    iconClass,
    isLoading = false
}: ActivityCardProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                relative group flex flex-col items-start p-5 rounded-xl border transition-all text-left w-full
                ${disabled
                    ? 'opacity-70 cursor-not-allowed bg-gray-50 border-gray-100'
                    : 'bg-white hover:shadow-md cursor-pointer border-gray-200 hover:border-violet-300'
                }
            `}
        >
            <div className={`p-3 rounded-lg mb-4 ${color} ${disabled && !isLoading ? 'grayscale opacity-70' : ''}`}>
                <Icon className={`w-6 h-6 ${iconClass || ''}`} />
            </div>

            <div className="space-y-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                    {description}
                </p>
            </div>

            {badge && (
                <span className={`
                    absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full
                    ${isLoading ? 'bg-violet-100 text-violet-700' : 'bg-gray-100 text-gray-400'}
                `}>
                    {badge}
                </span>
            )}
        </button>
    );
}
