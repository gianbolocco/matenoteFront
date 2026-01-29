"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, X, Flame } from "lucide-react";
import { useEffect, useState } from "react";

interface StreakNotificationProps {
    isVisible: boolean;
    onClose: () => void;
    message?: string;
}

export function StreakNotification({ isVisible, onClose, message }: StreakNotificationProps) {

    // Simple CSS-based particle effect using DOM elements
    const [particles, setParticles] = useState<{ id: number, x: number, y: number, color: string }[]>([]);

    useEffect(() => {
        if (isVisible) {
            // Generate random particles
            const colors = ['#8b5cf6', '#d946ef', '#f59e0b', '#10b981'];
            const newParticles = Array.from({ length: 20 }).map((_, i) => ({
                id: i,
                x: Math.random() * 100, // percentage
                y: Math.random() * 100,
                color: colors[Math.floor(Math.random() * colors.length)]
            }));
            setParticles(newParticles);
        } else {
            setParticles([]);
        }
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed top-0 left-0 w-full flex justify-center pt-6 z-[100] pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="pointer-events-auto relative mx-4"
                    >
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 rounded-2xl opacity-30 blur-lg animate-pulse" />

                        <div className="relative bg-white/95 backdrop-blur-xl border border-white/20 p-1 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5">
                            <div className="flex items-center gap-4 p-3 pr-4 md:pr-6 md:p-4">
                                {/* Icon Container with floating bounce animation */}
                                <div className="relative">
                                    <motion.div
                                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/30"
                                    >
                                        <Trophy className="w-6 h-6 fill-white/20" />
                                    </motion.div>
                                    <div className="absolute -bottom-1 -right-1 bg-amber-400 p-1 rounded-full border-2 border-white">
                                        <Flame className="w-3 h-3 text-white fill-white" />
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 min-w-[200px]">
                                    <motion.h3
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="font-bold text-gray-900 leading-tight text-base md:text-lg"
                                    >
                                        ¡Racha Extendida!
                                    </motion.h3>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex items-center gap-1.5 mt-0.5"
                                    >
                                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                        <p className="text-sm font-medium text-gray-600">
                                            {message || "¡Seguí así, venís increíble!"}
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Tiny Confetti Particles (CSS Only) */}
                            {particles.map((p) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ y: 0, opacity: 1 }}
                                    animate={{ y: 100, opacity: 0, rotate: 360 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="absolute w-1.5 h-1.5 rounded-full"
                                    style={{
                                        left: `${p.x}%`,
                                        top: `-10px`,
                                        backgroundColor: p.color
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
