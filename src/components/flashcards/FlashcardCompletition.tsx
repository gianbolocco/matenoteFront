import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import { Flashcard } from '@/types';

interface FlashcardCompletionProps {
    deckLength: number;
    unknownCards: Flashcard[];
    onRestartAll: () => void;
    onReviewMissed: () => void;
    onBack: () => void;
    timeTaken: string;
}

export function FlashcardCompletion({
    deckLength,
    unknownCards,
    onRestartAll,
    onReviewMissed,
    onBack,
    timeTaken
}: FlashcardCompletionProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6">
                <Trophy className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Felicitaciones!</h2>
            <p className="text-gray-500 mb-8 max-w-md">
                Completaste el set de {deckLength} flashcards en <span className="font-semibold text-gray-900">{timeTaken}</span>.
                {unknownCards.length > 0
                    ? ` Tenés ${unknownCards.length} tarjetas para repasar.`
                    : " ¡Respondiste todas correctamente!"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button
                    onClick={onBack}
                    className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                >
                    Volver a la Nota
                </button>

                <button
                    onClick={onRestartAll}
                    className="px-6 py-3 rounded-xl bg-violet-100 text-violet-700 font-medium hover:bg-violet-200 transition-colors flex items-center justify-center gap-2"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reiniciar Todo
                </button>

                {unknownCards.length > 0 && (
                    <button
                        onClick={onReviewMissed}
                        className="px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all flex items-center justify-center gap-2"
                    >
                        Repasar Faltantes ({unknownCards.length})
                    </button>
                )}
            </div>
        </div>
    );
}
