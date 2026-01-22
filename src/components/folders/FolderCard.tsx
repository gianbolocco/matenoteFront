import { Folder } from "@/types";
import { Clock } from "lucide-react";
import Link from "next/link";

interface FolderCardProps {
    folder: Folder;
}

const colorMap: Record<string, { bg: string, tabBg: string, border: string, text: string, darkText: string }> = {
    gray: { bg: "bg-gray-50", tabBg: "bg-gray-100", border: "border-gray-200", text: "text-gray-500", darkText: "text-gray-900" },
    red: { bg: "bg-red-50", tabBg: "bg-red-100", border: "border-red-200", text: "text-red-500", darkText: "text-red-900" },
    blue: { bg: "bg-blue-50", tabBg: "bg-blue-100", border: "border-blue-200", text: "text-blue-500", darkText: "text-blue-900" },
    green: { bg: "bg-green-50", tabBg: "bg-green-100", border: "border-green-200", text: "text-green-500", darkText: "text-green-900" },
    yellow: { bg: "bg-amber-50", tabBg: "bg-amber-100", border: "border-amber-200", text: "text-amber-600", darkText: "text-amber-900" }, // Switched to Amber for better yellow visibility
    violet: { bg: "bg-violet-50", tabBg: "bg-violet-100", border: "border-violet-200", text: "text-violet-500", darkText: "text-violet-900" },
};

export function FolderCard({ folder }: FolderCardProps) {
    const theme = colorMap[folder.color] || colorMap.gray;

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        }).format(date);
    };

    const folderId = folder._id || folder.id;

    return (
        <Link href={`/folders/${folderId}`} className="group relative mt-6 hover:-translate-y-1 transition-transform duration-300 cursor-pointer block">
            {/* Folder Tab */}
            <div className={`absolute -top-6 left-0 w-24 h-8 rounded-t-xl border-t border-l border-r ${theme.border} ${theme.tabBg} z-0`} />

            {/* Folder Body */}
            <div className={`relative z-10 w-full p-6 rounded-b-xl rounded-tr-xl border ${theme.bg} ${theme.border} hover:shadow-lg transition-shadow duration-300 min-h-[160px] flex flex-col`}>
                {/* Decoration: Inner white sheet hint */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/40 to-transparent rounded-tr-xl pointer-events-none" />

                <h3 className={`text-xl font-bold ${theme.darkText} mb-2 line-clamp-1`}>
                    {folder.title}
                </h3>

                <p className={`text-sm font-medium ${theme.text} mb-4`}>
                    {folder.notes.length} {folder.notes.length === 1 ? 'note' : 'notes'}
                </p>

                <div className={`mt-auto pt-4 border-t ${theme.border} border-opacity-50 flex items-center gap-1.5 text-xs ${theme.text} opacity-80`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatDate(folder.createDate)}</span>
                </div>
            </div>
        </Link>
    );
}
