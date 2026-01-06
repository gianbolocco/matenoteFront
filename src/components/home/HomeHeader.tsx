import { User } from "@/types";
import { Sparkles, Calendar, Clock } from "lucide-react";

interface HomeHeaderProps {
    user: User | null;
    onLogin: () => void;
}

export function HomeHeader({ user, onLogin }: HomeHeaderProps) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short"
    });

    return (
        <header className="py-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{today}</span>
                    </div>

                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                            {getGreeting()}, <br />
                            {user ? user.name.split(' ')[0] : "Guest"}
                        </h1>
                    </div>

                    <p className="text-lg text-gray-500 font-normal max-w-lg leading-relaxed">
                        {user
                            ? "Your second brain is ready. What will you master today?"
                            : "Unlock your potential with AI-powered study tools."}
                    </p>
                </div>
            </div>
        </header>
    );
}
