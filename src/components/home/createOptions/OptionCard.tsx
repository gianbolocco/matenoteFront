import { LucideIcon } from "lucide-react";

interface OptionCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    onClick?: () => void;
    iconColorClass?: string;
    bgColorClass?: string;
    disabled?: boolean;
    badgeText?: string;
}

export function OptionCard({
    icon: Icon,
    title,
    description,
    onClick,
    iconColorClass = "text-red-600",
    bgColorClass = "bg-red-50",
    disabled = false,
    badgeText
}: OptionCardProps) {
    if (disabled) {
        return (
            <div className="relative flex flex-col items-start p-6 bg-gray-50 border border-gray-100 rounded-2xl opacity-80 cursor-not-allowed">
                {badgeText && (
                    <div className="absolute top-4 right-4 px-2.5 py-1 bg-gray-200 text-gray-500 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        {badgeText}
                    </div>
                )}
                <div className="p-3 bg-gray-200 text-gray-400 rounded-xl mb-4">
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-400 mb-1">{title}</h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">
                    {description}
                </p>
            </div>
        );
    }

    return (
        <button
            onClick={onClick}
            className="group relative flex flex-col items-start p-6 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-left"
        >
            <div className={`p-3 rounded-xl mb-4 transition-colors duration-200 ${bgColorClass} ${iconColorClass} group-hover:bg-red-600 group-hover:text-white`}>
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                {description}
            </p>
        </button>
    );
}
