import { RotateCcw } from "lucide-react";

interface AudioPlayerProps {
    audioUrl: string | null;
    onReset: () => void;
}

export function AudioPlayer({ audioUrl, onReset }: AudioPlayerProps) {
    if (!audioUrl) return null;

    return (
        <div className="w-full">
            <audio src={audioUrl} controls className="w-full mb-4" />
            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={onReset}
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1.5"
                >
                    <RotateCcw className="w-4 h-4" /> Record New
                </button>
            </div>
        </div>
    );
}
