'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FlashcardSet, Flashcard as FlashcardType } from '@/types';
import { Flashcard } from './Flashcard';
import { motion, AnimatePresence } from 'framer-motion';
import { FlashcardCompletion } from './FlashcardCompletition';
import { FlashcardControls } from './FlashcardControls';
import { ProgressBar } from '../ui/ProgressBar';
import { GameTimer } from '../ui/GameTimer';
import { useGameTimer } from '@/hooks/useGameTimer';
import { useUser } from '@/context/UserContext';
import { useNotification } from "@/context/NotificationContext";
import { updateStreak } from '@/services/userService';

interface FlashcardGameProps {
    flashcardSet: FlashcardSet;
}

export default function FlashcardGame({ flashcardSet }: FlashcardGameProps) {
    const router = useRouter();
    const { user, refreshUser } = useUser();
    const { showStreakNotification } = useNotification();
    const [deck, setDeck] = useState<FlashcardType[]>(flashcardSet.flashcards);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [results, setResults] = useState<Record<number, boolean>>({}); // index -> isCorrect
    const [completed, setCompleted] = useState(false);
    const [direction, setDirection] = useState(0);
    const { formattedTime, reset } = useGameTimer(!completed);

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
        reset();
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
                // Update user streak on completion
                if (user?.id) {
                    const triggerStreakUpdate = async () => {
                        const oldStreak = user.streak?.current || 0;
                        await updateStreak(user.id);
                        const newUser = await refreshUser();

                        if (newUser && newUser.streak && newUser.streak.current > oldStreak) {
                            showStreakNotification("¡Flashcards dominadas! Racha en fuego.");
                        }
                    };
                    triggerStreakUpdate();
                }
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
            <FlashcardCompletion
                deckLength={deck.length}
                unknownCards={unknownCards}
                onRestartAll={() => restartGame(flashcardSet.flashcards)}
                onReviewMissed={() => restartGame(unknownCards)}
                onBack={() => router.back()}
                timeTaken={formattedTime}
            />
        );
    }

    if (!currentCard) return null;

    return (
        <div className="max-w-3xl mx-auto px-4 flex flex-col items-center overflow-hidden">
            <GameTimer time={formattedTime} />
            <ProgressBar
                current={currentIndex + 1}
                total={deck.length}
            />

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

            <FlashcardControls
                onNext={handleNext}
                onPrevious={handlePrevious}
                canGoBack={currentIndex > 0}
            />

            <p className="mt-8 text-sm text-gray-400">
                Tap card to flip
            </p>

        </div >
    );
}
