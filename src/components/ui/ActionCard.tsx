import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface ActionCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    onClick?: () => void;
    // Styling props
    iconBgClass?: string;
    iconColorClass?: string;
    hoverIconClass?: string;
    // State props
    disabled?: boolean;
    isLoading?: boolean;
    // Extras
    badge?: ReactNode;
    className?: string;
}

export function ActionCard({
    title,
    description,
    icon: Icon,
    onClick,
    iconBgClass = "bg-gray-50",
    iconColorClass = "text-gray-600",
    hoverIconClass,
    disabled = false,
    isLoading = false,
    badge,
    className = ""
}: ActionCardProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`
                group relative flex flex-col items-start p-6 rounded-2xl border transition-all duration-300 text-left w-full overflow-hidden
                ${isLoading
                    ? 'bg-white border-violet-200 cursor-wait ring-1 ring-violet-100'
                    : disabled
                        ? 'opacity-70 cursor-not-allowed bg-gray-50 border-gray-100'
                        : "bg-white cursor-pointer border-gray-100 hover:shadow-lg hover:-translate-y-1 hover:border-violet-300"
                }
                ${className}
            `}
        >
            {/* Loading Shimmer Overlay */}
            {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-50/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            )}

            {/* Icon Section */}
            <div className={`
                p-3 rounded-xl mb-4 transition-colors duration-200 relative z-10
                ${iconBgClass} ${iconColorClass} ${hoverIconClass || ''}
                ${!disabled && !isLoading && hoverIconClass ? 'group-hover:text-white' : ''}
                ${!disabled && !isLoading && !hoverIconClass ? 'group-hover:bg-opacity-80' : ''}
                ${disabled ? 'grayscale opacity-70' : ''}
                ${isLoading ? 'bg-violet-50 text-violet-500' : ''}
            `}>
                <Icon className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
            </div>

            {/* Content Section */}
            <div className="space-y-1 w-full relative z-10">
                <h3 className={`font-bold text-lg mb-1 transition-colors ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
                    {title}
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Badge / Status */}
            {badge && (
                <div className="absolute top-4 right-4 animate-in fade-in z-10">
                    {badge}
                </div>
            )}
        </button>
    );
}
