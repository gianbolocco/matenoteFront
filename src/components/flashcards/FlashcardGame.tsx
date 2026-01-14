'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FlashcardSet, Flashcard as FlashcardType } from '@/types';
import { Flashcard } from './Flashcard';
import { ArrowRight, RotateCcw, Check, X, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlashcardGameProps {
    flashcardSet: FlashcardSet;
}

export default function FlashcardGame({ flashcardSet }: FlashcardGameProps) {
    const router = useRouter();
    const [deck, setDeck] = useState<FlashcardType[]>(flashcardSet.flashcards);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [results, setResults] = useState<Record<number, boolean>>({}); // index -> isCorrect
    const [completed, setCompleted] = useState(false);
    const [direction, setDirection] = useState(0);

    const currentCard = deck[currentIndex];

    // Derived state
    const unknownCards = deck.filter((_, index) => results[index] === false);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5,
            rotateY: direction > 0 ? 45 : -45
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5,
            rotateY: direction < 0 ? 45 : -45
        })
    };

    // Reset game with specific cards
    const restartGame = (cards: FlashcardType[]) => {
        setDeck(cards);
        setCurrentIndex(0);
        setIsFlipped(false);
        setCompleted(false);
        setResults({});
        setDirection(0);
    };

    const handleNext = (known: boolean) => {
        setDirection(1);
        setResults(prev => ({
            ...prev,
            [currentIndex]: known
        }));

        setIsFlipped(false); // Reset flip

        setTimeout(() => {
            if (currentIndex < deck.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                setCompleted(true);
            }
        }, 50); // Almost immediate
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setIsFlipped(false);
            setCurrentIndex(prev => prev - 1);
        }
    };

    if (completed) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto mt-10">
                <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6">
                    <Trophy className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
                <p className="text-gray-500 mb-8 max-w-md">
                    You completed the set of {deck.length} flashcards.
                    {unknownCards.length > 0
                        ? ` You have ${unknownCards.length} cards to review.`
                        : " You answered all correctly!"}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Back to Note
                    </button>

                    <button
                        onClick={() => restartGame(flashcardSet.flashcards)}
                        className="px-6 py-3 rounded-xl bg-violet-100 text-violet-700 font-medium hover:bg-violet-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Restart All
                    </button>

                    {unknownCards.length > 0 && (
                        <button
                            onClick={() => restartGame(unknownCards)}
                            className="px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all flex items-center justify-center gap-2"
                        >
                            Review Missed ({unknownCards.length})
                        </button>
                    )}
                </div>
            </div>
        );
    }

    if (!currentCard) return null;

    return (
        <div className="max-w-3xl mx-auto p-4 flex flex-col items-center pt-10 overflow-hidden">
            {/* Header / Progress */}
            <div className="w-full mb-8 flex items-center justify-between">
                <div className="text-sm font-medium text-gray-500">
                    Flashcard {currentIndex + 1} of {deck.length}
                </div>
                <div className="w-full max-w-xs h-2 bg-gray-100 rounded-full ml-4 overflow-hidden">
                    <div
                        className="h-full bg-violet-500 transition-all duration-300 rounded-full"
                        style={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Card Area */}
            <div className="w-full mb-10 relative perspective-1000">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "tween", duration: 0.15, ease: "easeOut" },
                            opacity: { duration: 0.1 }
                        }}
                        className="w-full"
                    >
                        <Flashcard
                            question={currentCard.question}
                            answer={currentCard.answer}
                            isFlipped={isFlipped}
                            onFlip={() => setIsFlipped(!isFlipped)}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex gap-4 w-full max-w-lg justify-center">
                <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className={`
                        flex items-center justify-center p-4 rounded-xl border transition-all
                        ${currentIndex === 0
                            ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                            : 'border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
                        }
                    `}
                    title="Previous Card"
                >
                    <ArrowRight className="w-6 h-6 rotate-180" />
                </button>

                <button
                    onClick={() => handleNext(false)}
                    className="flex-1 flex flex-col items-center justify-center p-4 rounded-xl border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-200 transition-all group"
                >
                    <X className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-sm">Review later</span>
                </button>

                <button
                    onClick={() => handleNext(true)}
                    className="flex-1 flex flex-col items-center justify-center p-4 rounded-xl border border-green-100 bg-green-50 text-green-600 hover:bg-green-100 hover:border-green-200 transition-all group"
                >
                    <Check className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-sm">Got it</span>
                </button>
            </div>
            <p className="mt-8 text-sm text-gray-400">
                Tap card to flip
            </p>

        </div >
    );
}
