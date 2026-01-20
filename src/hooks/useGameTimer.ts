import { useState, useEffect, useCallback } from "react";

export function useGameTimer(isRunning: boolean) {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning) {
            timer = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    const formatTime = useCallback((seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }, []);

    const reset = useCallback(() => {
        setElapsedTime(0);
    }, []);

    return {
        elapsedTime,
        formattedTime: formatTime(elapsedTime),
        reset,
        formatTime // Exporting helper function if needed for static values
    };
}
