import { Note } from "@/types";
import { FileText, Mic, Youtube, File, Clock } from "lucide-react";
import Link from "next/link";

interface NoteCardProps {
    note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
    const getIcon = () => {
        switch (note.sourceType) {
            case "pdf":
                return <FileText className="w-5 h-5 text-violet-500" />;
            case "audio":
                return <Mic className="w-5 h-5 text-blue-500" />;
            case "youtube":
                return <Youtube className="w-5 h-5 text-red-600" />;
            default:
                return <File className="w-5 h-5 text-gray-500" />;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        }).format(date);
    };

    return (
        <Link href={`/notes/${note.id}`} className="block h-full">
            <div className="group relative flex flex-col p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gray-50 rounded-lg group-hover:bg-blue-50 border border-transparent group-hover:border-blue-100 transition-colors duration-300 shadow-sm">
                            {getIcon()}
                        </div>
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 capitalize group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                            {note.sourceType}
                        </span>
                    </div>

                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors duration-200">
                    {note.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {note.summary}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50 group-hover:border-gray-100 transition-colors">
                    <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{formatDate(note.createDate)}</span>
                    </div>
                </div>
                {/* Subtle shiny effect on hover */}
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 group-hover:ring-black/10 transition-shadow pointer-events-none" />
            </div>
        </Link>
    );
}
