"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Settings as SettingsIcon } from "lucide-react";

type Mode = "work" | "shortBreak" | "longBreak";

export default function PomodoroPage() {
    const [mode, setMode] = useState<Mode>("work");
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(25 * 60);

    // Configuration state (in minutes)
    const [workTime, setWorkTime] = useState(25);
    const [shortBreakTime, setShortBreakTime] = useState(5);
    const [longBreakTime, setLongBreakTime] = useState(15);
    const [showSettings, setShowSettings] = useState(false);

    // Use a ref for the interval to clear it properly
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Reset timer when mode changes or settings change (if not active)
        if (!isActive) {
            switch (mode) {
                case "work":
                    setTimeLeft(workTime * 60);
                    break;
                case "shortBreak":
                    setTimeLeft(shortBreakTime * 60);
                    break;
                case "longBreak":
                    setTimeLeft(longBreakTime * 60);
                    break;
            }
        }
    }, [mode, workTime, shortBreakTime, longBreakTime]);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Optional: Play sound or notification here
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        switch (mode) {
            case "work":
                setTimeLeft(workTime * 60);
                break;
            case "shortBreak":
                setTimeLeft(shortBreakTime * 60);
                break;
            case "longBreak":
                setTimeLeft(longBreakTime * 60);
                break;
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-full w-full max-w-2xl mx-auto p-6">
            <div className="w-full bg-white border border-border rounded-2xl shadow-sm p-8 md:p-12 relative overflow-hidden">

                {/* Settings Toggle */}
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <SettingsIcon className="w-5 h-5" />
                </button>

                {/* Mode Switcher */}
                <div className="flex justify-center gap-2 mb-12">
                    {[
                        { id: "work", label: "Work" },
                        { id: "shortBreak", label: "Short Break" },
                        { id: "longBreak", label: "Long Break" },
                    ].map((m) => (
                        <button
                            key={m.id}
                            onClick={() => {
                                setMode(m.id as Mode);
                                setIsActive(false);
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${mode === m.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                                }`}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>

                {/* Timer Display */}
                <div className="text-center mb-12">
                    <div className="text-8xl md:text-9xl font-bold tracking-tight text-foreground font-mono">
                        {formatTime(timeLeft)}
                    </div>
                    <p className="mt-4 text-muted-foreground font-medium uppercase tracking-widest text-sm">
                        {isActive ? "Running" : "Paused"}
                    </p>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6">
                    <button
                        onClick={toggleTimer}
                        className="h-16 w-16 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                    >
                        {isActive ? (
                            <Pause className="w-8 h-8 fill-current" />
                        ) : (
                            <Play className="w-8 h-8 fill-current ml-1" />
                        )}
                    </button>

                    <button
                        onClick={resetTimer}
                        className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100 text-foreground hover:bg-gray-200 transition-colors"
                        title="Reset Timer"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>

                {/* Settings Panel (Conditional) */}
                {showSettings && (
                    <div className="mt-12 pt-8 border-t border-border animate-in fade-in slide-in-from-top-4 duration-300">
                        <h3 className="text-lg font-semibold mb-4 text-center">Timer Settings (minutes)</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-muted-foreground text-center">Work</label>
                                <input
                                    type="number"
                                    value={workTime}
                                    onChange={(e) => setWorkTime(Number(e.target.value))}
                                    className="w-full text-center border border-border rounded-md py-1"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-muted-foreground text-center">Short Break</label>
                                <input
                                    type="number"
                                    value={shortBreakTime}
                                    onChange={(e) => setShortBreakTime(Number(e.target.value))}
                                    className="w-full text-center border border-border rounded-md py-1"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-muted-foreground text-center">Long Break</label>
                                <input
                                    type="number"
                                    value={longBreakTime}
                                    onChange={(e) => setLongBreakTime(Number(e.target.value))}
                                    className="w-full text-center border border-border rounded-md py-1"
                                />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
