import { ArrowLeft, Clock, FileText, Mic, Youtube, File } from "lucide-react";
import Link from "next/link";
import { Note } from "@/types";

interface NoteHeaderProps {
    note: Note;
}

export function NoteHeader({ note }: NoteHeaderProps) {
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
            month: "long",
            day: "numeric",
            year: "numeric"
        }).format(date);
    };

    return (
        <div className="mb-8">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Library
            </Link>

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                        {getIcon()}
                    </div>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        {note.sourceType} Note
                    </span>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatDate(note.createDate)}</span>
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {note.title}
                </h1>
            </div>
        </div>
    );
}
