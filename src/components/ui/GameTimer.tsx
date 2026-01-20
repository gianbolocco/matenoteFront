import { Timer } from "lucide-react";

interface GameTimerProps {
    time: string;
}

export function GameTimer({ time }: GameTimerProps) {
    return (
        <div className="w-full flex justify-end mb-2">
            <div className="flex items-center text-violet-600 font-medium bg-violet-50 px-3 py-1 rounded-full text-sm">
                <Timer className="w-4 h-4 mr-1.5" />
                {time}
            </div>
        </div>
    );
}
