interface RecordingTimerProps {
    time: number;
    isRecording: boolean;
    isPaused: boolean;
}

export function RecordingTimer({ time, isRecording, isPaused }: RecordingTimerProps) {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`text-3xl font-mono font-semibold mb-6 ${isRecording && !isPaused ? "text-red-600" :
            isPaused ? "text-violet-500" : "text-gray-900"
            }`}>
            {formatTime(time)}
        </div>
    );
}
