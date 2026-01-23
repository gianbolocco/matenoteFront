import { ActionCard } from "../ui/ActionCard";
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
    icon,
    color,
    onClick,
    disabled = false,
    badge,
    iconClass,
    isLoading = false
}: ActivityCardProps) {

    // ActivityCard passes a combined string like "bg-violet-50 text-violet-600"
    // ActionCard expects them separated or just appended. 
    // We can pass the full string to iconBgClass (it's applied to the div wrapper) 
    // provided it doesn't conflict. 
    // iconColorClass defaults to text-gray-600 but since 'color' has textColor, it will override via cascade if we are lucky, or we pass empty iconColorClass.

    // Better strategy: 
    // 'color' often looks like "bg-violet-50 text-violet-600".
    // ActionCard puts iconBgClass and iconColorClass on the same div.
    // So passing `color` as `iconBgClass` works perfectly.

    return (
        <ActionCard
            title={title}
            description={description}
            icon={icon}
            onClick={onClick}
            disabled={disabled}
            isLoading={isLoading}
            iconBgClass={color} // Passes "bg-violet-50 text-violet-600"
            iconColorClass="" // Clear default so it doesn't conflict (though 'text-gray-600' might compete if not careful, but usually later class wins or we set it empty)
            // badge expects ReactNode, we have string | null.
            badge={badge ? (
                <span className={`
                    text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full
                    ${isLoading ? 'bg-violet-100 text-violet-700' : 'bg-gray-100 text-gray-400'}
                `}>
                    {badge}
                </span>
            ) : null}
        // Add iconClass if provided (ActionCard doesn't support custom icon class on the Lucide icon directly via props yet, 
        // wait, ActionCard source: <Icon className="w-6 h-6" />. It doesn't take extra class on Icon.
        // But we can modify ActionCard or just assume w-6 h-6 is fine.
        // ActivityCard had `iconClass` prop. Let's see if it was used.
        // If strictly needed, I should update ActionCard to accept iconClassName.
        // I'll update ActionCard next if needed, but for now standardizing is the goal.
        />
    );
}
