"use client";

import { Note } from "@/types";
import { FileText, Mic, Youtube, File, Clock, AlignLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NoteCardProps {
    note: Note;
    action?: React.ReactNode;
}

export function NoteCard({ note, action }: NoteCardProps) {
    const pathname = usePathname();
    const from = pathname === "/" ? "home" : pathname?.replace(/^\//, "") || "home";

    const getIcon = () => {
        switch (note.sourceType) {
            case "pdf":
                return <FileText className="w-5 h-5 text-violet-600" />;
            case "audio":
                return <Mic className="w-5 h-5 text-blue-500" />;
            case "youtube":
                return <Youtube className="w-5 h-5 text-red-500" />;
            case "text":
                return <AlignLeft className="w-5 h-5 text-green-600" />;
            default:
                return <File className="w-5 h-5 text-gray-400" />;
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "";

        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        }).format(date);
    };

    return (
        <Link href={`/notes/${note.id}?from=${from}`} className="block h-full">
            <div className="group relative flex flex-col h-full bg-white rounded-2xl p-6 transition-all duration-300 border border-gray-100 hover:border-violet-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden">

                {/* Action Button */}
                {action && (
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {action}
                    </div>
                )}

                {/* Gradient Top Bar - Restored by request */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 ">
                            {getIcon()}
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 capitalize transition-colors duration-300 tracking-wide">
                            {note.sourceType}
                        </span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-violet-700 transition-colors duration-200">
                        {note.title}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-1 leading-relaxed">
                        {note.summary || "No summary available."}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50 group-hover:border-gray-100 transition-colors">
                        <div className="flex items-center gap-1.5 text-gray-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">
                                {formatDate(note.createDate)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
