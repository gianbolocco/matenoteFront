"use client";

import { Flame, Trophy, Coffee, Zap, Moon } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface StreakCardProps {
    currentStreak: number;
    longestStreak: number;
}

function getStreakStatus(streak: number): { label: string; Icon: LucideIcon } {
    if (streak === 0) return { label: "Empezá hoy", Icon: Moon };
    if (streak < 3) return { label: "Calentando el agua", Icon: Flame };
    if (streak < 7) return { label: "Agua a punto", Icon: Coffee };
    if (streak < 14) return { label: "En racha", Icon: Flame };
    if (streak < 30) return { label: "Imparable", Icon: Zap };
    return { label: "Leyenda del mate", Icon: Trophy };
}

function getMotivationalText(streak: number): string {
    if (streak === 0) return "Todavía no cebaste nada. El mate te está esperando.";
    if (streak === 1) return "Un día ya cuenta. Cebá otro.";
    return randomFrom([
        `${streak} días. Este mate ya es parte de tu identidad.`,
        "Esta racha está firme como mate bien amargo.",
        `Has mantenido el foco por ${streak} días consecutivos. Tu hábito ya es tan natural como el mate de las mañanas.`,
        "Esto ya empieza a ser costumbre.",
        "El mate no se lava y vos tampoco aflojás.",
        `${streak} días seguidos. El mate te aplaude de pie.`,
        "Este hábito no se corta ni con bombilla tapada.",
        `Llevás ${streak} días seguidos. El agua ya está a punto, ¡seguí cebando!`
    ]);
}

function randomFrom(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export function StreakCard({ currentStreak, longestStreak }: StreakCardProps) {
    const status = getStreakStatus(currentStreak);
    const StatusIcon = status.Icon;

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 rounded-2xl bg-gray-50 border border-gray-200">
            {/* Left Content */}
            <div className="flex-1 space-y-3">
                {/* Badge + Status */}
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-600 text-xs font-bold uppercase tracking-wide">
                        <StatusIcon className="w-4 h-4" />
                        {status.label}
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    Tu Racha de Estudio
                </h2>

                {/* Motivational Text */}
                <p className="text-gray-500 leading-relaxed max-w-md">
                    {getMotivationalText(currentStreak)}
                </p>
            </div>

            {/* Right Content: Counter with Mate Icon */}
            <div className="flex flex-col items-center gap-2">
                <div className="flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-violet-100 border border-violet-200">
                    <span className="text-2xl md:text-3xl flex items-center justify-center gap-1 font-bold text-violet-600"><Flame/>{currentStreak}</span>
                    <p className="text-lg text-violet-500 font-medium">días</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Trophy className="w-3 h-3" />
                    <span>Mejor racha: <span className="font-semibold text-gray-600">{longestStreak}</span></span>
                </div>
            </div>
        </div>
    );
}
