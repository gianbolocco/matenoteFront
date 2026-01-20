'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { getQuizzById } from '@/services/quizzService';
import { Quizz } from '@/types';
import { QuizzGame } from '@/components/quizz/QuizzGame';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { GameActivityLayout } from '@/components/layout/GameActivityLayout';

export default function QuizzPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [quizz, setQuizz] = useState<Quizz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuizz = async () => {
            try {
                const data = await getQuizzById(id);
                setQuizz(data);
            } catch (err) {
                setError("Failed to load quiz.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchQuizz();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
            </div>
        );
    }

    if (error || !quizz) {
        return (
            <div className="flex flex-col h-screen w-full items-center justify-center bg-gray-50 p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
                <p className="text-gray-500 mb-6">{error || "Quiz not found (invalid ID or empty response)"}</p>
                <button
                    onClick={() => router.back()}
                    className="text-violet-600 hover:text-violet-700 font-medium"
                >
                    Back
                </button>
            </div>
        );
    }

    return (
        <GameActivityLayout
            title="Practice Quiz"
            description="Test your understanding of the material."
            noteId={quizz.noteId}
        >
            <QuizzGame quizz={quizz} />
        </GameActivityLayout>
    );
}
