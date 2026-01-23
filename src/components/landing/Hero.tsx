"use client";

import Link from "next/link";
import { Sparkles, Home, Search, Folder, User, Calendar, FileText, Mic, Youtube, Clock, File } from "lucide-react";
import { User as UserType } from "@/types";
import { motion } from "framer-motion";

interface HeroProps {
    user: UserType | null;
}

export function Hero({ user }: HeroProps) {
    const today = new Date().toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "short"
    });

    const notes = [
        { id: 1, title: "Resumen de Historia", summary: "La revolución industrial y sus consecuencias en...", type: "pdf", date: "hace 2 horas" },
        { id: 2, title: "Clase de Matemáticas", summary: "Funciones derivadas e integrales básicas...", type: "audio", date: "hace 5 horas" },
        { id: 3, title: "Marketing Digital", summary: "Estrategias de SEO y SEM para principiantes...", type: "youtube", date: "hace 1 día" },
        { id: 4, title: "Filosofía Moderna", summary: "Conceptos clave de Kant y Hegel...", type: "pdf", date: "hace 2 días" },
        { id: 5, title: "Biología Celular", summary: "Estructura y función de la célula eucariota...", type: "audio", date: "hace 3 días" },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case "pdf": return <FileText className="w-4 h-4 text-violet-600" />;
            case "audio": return <Mic className="w-4 h-4 text-blue-500" />;
            case "youtube": return <Youtube className="w-4 h-4 text-red-500" />;
            default: return <File className="w-4 h-4 text-gray-400" />;
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FDFBF7] pt-20">
            <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Column: Text */}
                <div className="space-y-8 relative z-10 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-700 rounded-full text-sm font-bold tracking-wide uppercase">
                        <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
                        Nuevo: Modo Estudio 2.0
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-gray-900 tracking-tight leading-[1]">
                        Cebá tu <br />
                        conocimiento <br />
                        con <span className="text-violet-600 italic">Matenote</span>
                    </h1>

                    <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                        La IA que te acompaña en cada estudio, como un buen mate. Resúmenes, quizzes y apuntes al instante para que nunca estudies solo.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <Link
                            href={user ? "/home" : "/login"}
                            className="bg-violet-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-violet-700 transition-all flex items-center gap-2 shadow-xl shadow-violet-200 hover:shadow-2xl hover:-translate-y-1"
                        >
                            <Sparkles className="w-5 h-5 fill-current" />
                            Empieza a aprender
                        </Link>
                    </div>

                    <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
                        <div className="flex -space-x-3">
                            <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                            <img src="https://i.pravatar.cc/100?img=5" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                            <img src="https://i.pravatar.cc/100?img=8" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">
                            Más de <span className="text-gray-900 font-bold">10,000 estudiantes</span> cebando ideas.
                        </p>
                    </div>
                </div>

                {/* Right Column: Phone Mockup */}
                <div className="relative flex justify-center lg:justify-end my-12 lg:mt-0">
                    {/* Background Blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-violet-200 to-pink-100 rounded-full blur-3xl opacity-60 -z-10" />

                    {/* Phone Container - Mobile Optimized */}
                    <div className="relative w-[280px] h-[580px] sm:w-[320px] sm:h-[640px] bg-gray-900 rounded-[2.5rem] sm:rounded-[3rem] border-[6px] sm:border-8 border-gray-900 shadow-2xl overflow-hidden ring-1 ring-gray-900/50 rotate-0 lg:rotate-3 hover:rotate-0 transition-transform duration-500">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-5 sm:h-6 bg-gray-900 rounded-b-2xl z-20"></div>

                        {/* Side Buttons */}
                        <div className="absolute top-24 -left-2 sm:-left-3 w-1 h-8 sm:h-10 bg-gray-800 rounded-l-md"></div>
                        <div className="absolute top-40 -left-2 sm:-left-3 w-1 h-12 sm:h-16 bg-gray-800 rounded-l-md"></div>
                        <div className="absolute top-32 -right-2 sm:-right-3 w-1 h-16 sm:h-20 bg-gray-800 rounded-r-md"></div>

                        {/* Screen Content */}
                        <div className="w-full h-full bg-gray-50 flex flex-col relative overflow-hidden">
                            {/* App Header */}
                            <div className="pt-10 sm:pt-12 px-4 sm:px-5 pb-4 sm:pb-6 bg-white border-b border-gray-100 z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 rounded-full text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                                        <Calendar className="w-3 h-3" />
                                        <span>{today}</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                        <User className="w-4 h-4 text-gray-500" />
                                    </div>
                                </div>
                                <h3 className="font-extrabold text-xl sm:text-2xl text-gray-900 leading-tight">
                                    Bienvenido, <br />
                                    <span className="text-violet-600">Estudiante</span>
                                </h3>
                            </div>

                            {/* Scrolling Content */}
                            <div className="flex-1 overflow-hidden relative">
                                <motion.div
                                    className="absolute inset-0 p-3 sm:p-4 space-y-3"
                                    animate={{ y: [0, -500] }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                >
                                    {[...notes, ...notes, ...notes].map((note, idx) => (
                                        <div key={idx} className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 flex flex-col gap-2 sm:gap-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="p-1.5 bg-gray-50 rounded-lg border border-gray-100">
                                                    {getIcon(note.type)}
                                                </div>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 capitalize">{note.type}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-tight mb-1">{note.title}</h4>
                                                <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2">{note.summary}</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-400 mt-1">
                                                <Clock className="w-3 h-3" />
                                                <span className="text-[10px]">{note.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>

                                {/* Gradient Fade */}
                                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none z-10" />
                                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none z-10" />
                            </div>

                            {/* Navbar */}
                            <div className="h-14 sm:h-16 bg-white border-t border-gray-100 flex items-center justify-around text-gray-400 relative z-20 px-2">
                                <div className="flex flex-col items-center gap-1 text-violet-600">
                                    <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-[9px] sm:text-[10px] font-medium">Inicio</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 hover:text-gray-600">
                                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-[9px] sm:text-[10px] font-medium">Buscar</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 hover:text-gray-600">
                                    <Folder className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-[9px] sm:text-[10px] font-medium">Biblioteca</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Abstract Element - Repositioned to Bottom Left to prevent overlap */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                        className="absolute bottom-10 -left-4 sm:-left-12 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border border-gray-100 z-30"
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[3px] border-violet-100 flex items-center justify-center text-[10px] sm:text-xs font-bold text-violet-600">
                                    75%
                                </div>
                                <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
                                    <circle cx="50%" cy="50%" r="48%" stroke="#7c3aed" strokeWidth="3" fill="none" strokeDasharray="100" strokeDashoffset="25" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">Progreso</div>
                                <div className="font-bold text-gray-900 text-sm sm:text-base">Excelente! 🧉</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
