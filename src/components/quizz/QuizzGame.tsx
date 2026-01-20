import { Quizz, QuizzOption } from "@/types";
import { useState, useEffect } from "react";
import { X, Lightbulb } from "lucide-react";
import { QuizzQuestion } from "./QuizzQuestion";
import { QuizzResult } from "./QuizzResult";
import { ProgressBar } from "../ui/ProgressBar";
import { GameTimer } from "../ui/GameTimer";
import { useGameTimer } from "@/hooks/useGameTimer";
import { motion, AnimatePresence } from "framer-motion";

interface QuizzGameProps {
    quizz: Quizz;
}

export function QuizzGame({ quizz }: QuizzGameProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const { formattedTime, reset } = useGameTimer(!isFinished);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showHint) {
            timer = setTimeout(() => {
                setShowHint(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showHint]);

    const handleAnswer = (option: QuizzOption) => {
        if (option.correct) {
            setScore(prev => prev + 1);
        }

        if (currentIndex < quizz.questions.length - 1) {
            // Wait for 1.5s is already handled inside child by "setTimeout(() => onAnswer(), 1500)"?
            // Yes, QuizzQuestion calls onAnswer after delay. 
            // So we can immediately switch here.
            setCurrentIndex(prev => prev + 1);
            setShowHint(false);
        } else {
            setIsFinished(true);
        }
    };

    const handleRetry = () => {
        setCurrentIndex(0);
        setScore(0);
        setIsFinished(false);
        setShowHint(false);
        reset();
    };

    if (isFinished) {
        return (
            <QuizzResult
                score={score}
                totalQuestions={quizz.questions.length}
                quizz={quizz}
                onRetry={handleRetry}
                timeTaken={formattedTime}
            />
        );
    }

    // Pass key to force re-render on question change, resetting local state in Question component
    const currentQuestion = quizz.questions[currentIndex];

    return (
        <>
            <div className="max-w-3xl mx-auto px-4 flex flex-col items-center overflow-hidden w-full">
                <GameTimer time={formattedTime} />
                <ProgressBar
                    current={currentIndex + 1}
                    total={quizz.questions.length}
                />
                <div className="w-full bg-white rounded-3xl border border-gray-100 p-8 h-[600px] flex flex-col justify-center overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            <QuizzQuestion
                                question={currentQuestion}
                                onAnswer={handleAnswer}
                                currentQuestionIndex={currentIndex}
                                totalQuestions={quizz.questions.length}
                                showHint={showHint}
                                onToggleHint={() => setShowHint(!showHint)}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <AnimatePresence>
                {showHint && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
                    >
                        <div className="relative p-4 bg-white text-gray-800 rounded-2xl shadow-xl border border-gray-100 text-sm">
                            <button
                                onClick={() => setShowHint(false)}
                                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 hover:bg-gray-100 rounded-full"
                            >
                                <X className="w-3 h-3" />
                            </button>
                            <div className="flex items-start gap-3">
                                <div className="p-1.5 bg-violet-50 rounded-lg shrink-0">
                                    <Lightbulb className="w-4 h-4 text-violet-500" />
                                </div>
                                <div>
                                    <span className="font-bold text-violet-600 block mb-0.5 uppercase tracking-wide text-xs">Hint</span>
                                    <p className="text-gray-600 leading-relaxed font-medium">
                                        {currentQuestion.hint}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
