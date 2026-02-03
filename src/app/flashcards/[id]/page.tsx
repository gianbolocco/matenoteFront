'use client';

// src/app/flashcards/[id]/page.tsx
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { getFlashcardsById } from '@/services/flashcardService';
import { FlashcardSet } from '@/types';
import FlashcardGame from '@/components/flashcards/FlashcardGame';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { GameActivityLayout } from '@/components/layout/GameActivityLayout';

export default function FlashcardsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const data = await getFlashcardsById(id);
                setFlashcardSet(data);
            } catch (err) {
                setError("Failed to load flashcards.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCards();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
            </div>
        );
    }

    if (error || !flashcardSet) {
        return (
            <div className="flex flex-col h-screen w-full items-center justify-center bg-gray-50 p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
                <p className="text-gray-500 mb-6">{error || "Set de flashcards no encontrado"}</p>
                <div className="text-xs text-gray-400 mb-4">ID: {id}</div>
                <button
                    onClick={() => router.back()}
                    className="text-violet-600 hover:text-violet-700 font-medium"
                >
                    Volver
                </button>
            </div>
        );
    }

    return (
        <GameActivityLayout
            title="Flashcards"
            description="Dominá tu conocimiento con repetición espaciada."
            noteId={flashcardSet.noteId}
        >
            <FlashcardGame flashcardSet={flashcardSet} />
        </GameActivityLayout>
    );
}
