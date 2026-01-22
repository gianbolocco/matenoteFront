import { Quizz } from "@/types";
import { RotateCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface QuizzResultProps {
    score: number;
    totalQuestions: number;
    quizz: Quizz;
    onRetry: () => void;
    timeTaken: string;
}

export function QuizzResult({ score, totalQuestions, quizz, onRetry, timeTaken }: QuizzResultProps) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const router = useRouter();


    return (
        <div className="flex px-4 flex-col items-center justify-center space-y-8 text-center max-w-lg mx-auto py-12">
            <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-violet-100 flex items-center justify-center">
                    <span className="text-3xl font-bold text-violet-600">{percentage}%</span>
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-gray-500">
                    You answered {score} out of {totalQuestions} questions correctly in <span className="font-semibold text-gray-900">{timeTaken}</span>.
                </p>
            </div>

            <div className="flex gap-4 w-full justify-center">
                <Link
                    href={`/notes/${quizz.noteId}`}
                    className="flex items-center px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-200 transition-all font-medium"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Note
                </Link>

                <button
                    onClick={onRetry}
                    className="flex items-center px-6 py-3 rounded-xl bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all font-medium"
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                </button>
            </div>
        </div>
    );
}
