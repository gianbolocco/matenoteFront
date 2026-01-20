import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
    return (
        <div className="w-full mb-8 flex items-center justify-between">
            <div className="text-sm font-medium text-gray-500">
                 {current} of {total}
            </div>
            <div className="w-full max-w-xs h-2 bg-gray-100 rounded-full ml-4 overflow-hidden">
                <div
                    className="h-full bg-violet-500 transition-all duration-300 rounded-full"
                    style={{ width: `${(current / total) * 100}%` }}
                />
            </div>
        </div>
    );
}
