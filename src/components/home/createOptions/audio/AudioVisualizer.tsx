import { Mic } from "lucide-react";
import { RefObject } from "react";

interface AudioVisualizerProps {
    visualizerRef: RefObject<HTMLDivElement | null>;
    isRecording: boolean;
    isPaused: boolean;
}

export function AudioVisualizer({ visualizerRef, isRecording, isPaused }: AudioVisualizerProps) {
    return (
        <div className="mb-8 relative w-32 h-32 flex items-center justify-center">
            {/* Aura Visualizer */}
            <div
                ref={visualizerRef as RefObject<HTMLDivElement>}
                className="absolute inset-0 rounded-full bg-purple-400 opacity-30 blur-md transition-transform duration-75"
            />

            <div className={`relative w-20 h-20 rounded-full flex items-center justify-center z-10 transition-colors ${isRecording && !isPaused ? "bg-purple-100 text-purple-600" :
                isPaused ? "bg-purple-50 text-purple-600" :
                    "bg-gray-100 text-gray-500"
                }`}>
                <Mic className="w-10 h-10" />
            </div>
        </div>
    );
}
