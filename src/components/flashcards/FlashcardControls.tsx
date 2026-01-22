import React from 'react';
import { ArrowRight, X, Check } from 'lucide-react';

interface FlashcardControlsProps {
    onNext: (known: boolean) => void;
    onPrevious: () => void;
    canGoBack: boolean;
}

export function FlashcardControls({ onNext, onPrevious, canGoBack }: FlashcardControlsProps) {
    return (
        <div className="flex gap-4 w-full max-w-lg justify-center">
            <button
                onClick={onPrevious}
                disabled={!canGoBack}
                className={`
                    flex items-center justify-center p-4 rounded-xl border transition-all
                    ${!canGoBack
                        ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-200'
                    }
                `}
                title="Previous Card"
            >
                <ArrowRight className="w-6 h-6 rotate-180" />
            </button>

            <button
                onClick={() => onNext(false)}
                className="flex-1 flex flex-col items-center justify-center p-4 rounded-xl border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-200 transition-all group"
            >
                <X className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">Review later</span>
            </button>

            <button
                onClick={() => onNext(true)}
                className="flex-1 flex flex-col items-center justify-center p-4 rounded-xl border border-green-100 bg-green-50 text-green-600 hover:bg-green-100 hover:border-green-200 transition-all group"
            >
                <Check className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">Got it</span>
            </button>
        </div>
    );
}
