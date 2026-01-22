import { ActionCard, ActionCardProps } from "../../ui/ActionCard";
import { LucideIcon } from "lucide-react";

interface OptionCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    onClick?: () => void;
    hoverBgClass?: string;
    iconColorClass?: string;
    bgColorClass?: string;
    disabled?: boolean;
    badgeText?: string;
}

export function OptionCard({
    icon,
    title,
    description,
    onClick,
    iconColorClass = "text-red-600",
    bgColorClass = "bg-red-50",
    disabled = false,
    badgeText,
    hoverBgClass
}: OptionCardProps) {

    return (
        <ActionCard
            title={title}
            description={description}
            icon={icon}
            onClick={onClick}
            disabled={disabled}
            iconBgClass={bgColorClass}
            iconColorClass={iconColorClass}
            hoverIconClass={hoverBgClass}
            badge={badgeText ? (
                <span className="px-2.5 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider rounded-full">
                    {badgeText}
                </span>
            ) : null}
        />
    );
}
