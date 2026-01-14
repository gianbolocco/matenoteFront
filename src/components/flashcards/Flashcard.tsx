'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlashcardProps {
    question: string;
    answer: string;
    isFlipped: boolean;
    onFlip: () => void;
}

export function Flashcard({ question, answer, isFlipped, onFlip }: FlashcardProps) {
    return (
        <div
            className="relative w-full aspect-[3/2] cursor-pointer perspective-1000"
            onClick={onFlip}
        >
            <motion.div
                className="w-full h-full relative preserve-3d"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front */}
                <div className="absolute inset-0 w-full h-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex items-center justify-center text-center backface-hidden">
                    <div className="space-y-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-violet-500 bg-violet-50 px-3 py-1 rounded-full">
                            Question
                        </span>
                        <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed">
                            {question}
                        </p>
                    </div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 w-full h-full bg-violet-500 rounded-2xl shadow-lg border border-violet-400 p-8 flex items-center justify-center text-center backface-hidden"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                    <div className="space-y-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-white bg-white/20 px-3 py-1 rounded-full">
                            Answer
                        </span>
                        <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
                            {answer}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
