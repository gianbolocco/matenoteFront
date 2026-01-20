import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface GameActivityLayoutProps {
    title: string;
    description: string;
    noteId: string;
    children: ReactNode;
}

export function GameActivityLayout({ title, description, noteId, children }: GameActivityLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="max-w-5xl mx-auto px-4 pt-8 w-full">
                <Link
                    href={`/notes/${noteId}`}
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Note
                </Link>

                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                    <p className="text-gray-500 mt-2">{description}</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center w-full">
                <div className="max-w-5xl w-full mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
