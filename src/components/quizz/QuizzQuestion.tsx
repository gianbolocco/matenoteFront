import { QuizzQuestion as QuizzQuestionType, QuizzOption } from "@/types";
import { HelpCircle, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizzQuestionProps {
    question: QuizzQuestionType;
    onAnswer: (option: QuizzOption) => void;
    currentQuestionIndex: number;
    totalQuestions: number;
    showHint: boolean;
    onToggleHint: () => void;
}

export function QuizzQuestion({ question, onAnswer, currentQuestionIndex, totalQuestions, showHint, onToggleHint }: QuizzQuestionProps) {
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleOptionClick = (option: QuizzOption) => {
        if (isAnswered) return;
        setSelectedOptionId(option._id);
        setIsAnswered(true);
    };

    const handleContinue = () => {
        const option = question.options.find(o => o._id === selectedOptionId);
        if (option) {
            onAnswer(option);
        }
    };

    return (
        <div className="w-full mx-auto space-y-8">


            {/* Question Text */}
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                {question.question}
            </h2>

            {/* Options */}
            <div className="grid gap-3">
                {question.options.map((option) => {
                    const isSelected = selectedOptionId === option._id;
                    const isCorrect = option.correct;

                    let optionClass = "p-4 rounded-xl border-2 text-left transition-all duration-200 flex justify-between items-center group ";

                    if (isAnswered) {
                        if (isSelected && isCorrect) {
                            optionClass += "border-green-500 bg-green-50 text-green-700";
                        } else if (isSelected && !isCorrect) {
                            optionClass += "border-red-500 bg-red-50 text-red-700";
                        } else if (isCorrect) {
                            // Show correct answer even if not selected
                            optionClass += "border-green-500 bg-green-50 text-green-700 opacity-60";
                        } else {
                            optionClass += "border-gray-100 opacity-40";
                        }
                    } else {
                        optionClass += "border-gray-100 hover:border-violet-200 hover:bg-violet-50 cursor-pointer text-gray-700";
                    }

                    return (
                        <button
                            key={option._id}
                            onClick={() => handleOptionClick(option)}
                            disabled={isAnswered}
                            className={optionClass}
                        >
                            <span className="font-medium text-lg">{option.text}</span>

                            {isAnswered && isSelected && (
                                <span>
                                    {isCorrect ? (
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    ) : (
                                        <XCircle className="w-6 h-6 text-red-600" />
                                    )}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between">
                <button
                    onClick={onToggleHint}
                    className="cursor-pointer flex items-center gap-2 text-violet-600 hover:text-violet-700 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-violet-50 transition-all duration-200"
                    disabled={isAnswered}
                >
                    <HelpCircle className="w-4 h-4" />
                    {showHint ? "Hide Hint" : "Show Hint"}
                </button>

                {isAnswered && (
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={handleContinue}
                        className="cursor-pointer flex items-center px-6 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors font-medium shadow-lg shadow-violet-200"
                    >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.button>
                )}
            </div>
        </div>
    );
}
