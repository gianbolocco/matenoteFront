import { Mic, Play, Pause, Square } from "lucide-react";

interface RecordingControlsProps {
    isRecording: boolean;
    isPaused: boolean;
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onStop: () => void;
}

export function RecordingControls({
    isRecording,
    isPaused,
    onStart,
    onPause,
    onResume,
    onStop
}: RecordingControlsProps) {
    if (!isRecording) {
        return (
            <button
                type="button"
                onClick={onStart}
                className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-lg shadow-purple-200"
            >
                <Mic className="w-4 h-4" /> Start Recording
            </button>
        );
    }

    return (
        <>
            {isPaused ? (
                <button
                    type="button"
                    onClick={onResume}
                    className="px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                    <Play className="w-4 h-4 fill-current" /> Resume
                </button>
            ) : (
                <button
                    type="button"
                    onClick={onPause}
                    className="px-6 py-2 bg-purple-100 text-purple-700 rounded-full font-medium hover:bg-purple-200 transition-colors flex items-center gap-2"
                >
                    <Pause className="w-4 h-4 fill-current" /> Pause
                </button>
            )}

            <button
                type="button"
                onClick={onStop}
                className="px-4 py-2 border-2 border-red-500 text-red-500 rounded-full font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
            >
                <Square className="w-4 h-4 fill-current" /> Stop
            </button>
        </>
    );
}
