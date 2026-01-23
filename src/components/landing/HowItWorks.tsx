"use client";

import { FileUp, Sparkles, GraduationCap } from "lucide-react";

const STEPS = [
    {
        icon: FileUp,
        label: "Paso 1",
        title: "Sube tu material",
        description: "Arrastra tus PDFs, pega links de YouTube o sube grabaciones de audio.",
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        icon: Sparkles,
        label: "Paso 2",
        title: "La IA analiza",
        description: "Nuestra IA procesa el contenido, extrae conceptos clave y estructura la información.",
        color: "text-violet-600",
        bg: "bg-violet-50"
    },
    {
        icon: GraduationCap,
        label: "Paso 3",
        title: "Empieza a estudiar",
        description: "Repasa con resúmenes, ponte a prueba con quiz y memoriza con flashcards.",
        color: "text-pink-600",
        bg: "bg-pink-50"
    }
];

export function HowItWorks() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                        ¿Cómo funciona?
                    </h2>
                    <p className="text-gray-500 font-medium text-lg">
                        Tres pasos simples para optimizar tus horas de estudio.
                    </p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-indigo-50" />

                    {STEPS.map((step, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center group">
                            {/* Icon Circle */}
                            <div className={`
                                w-24 h-24 rounded-3xl ${step.bg} flex items-center justify-center mb-8 relative z-10 
                                transition-all duration-300 border border-gray-200
                            `}>
                                <step.icon className={`w-10 h-10 ${step.color}`} />
                            </div>

                            {/* Label */}
                            <div className={`
                                mb-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider 
                                ${step.bg} ${step.color}
                            `}>
                                {step.label}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 leading-relaxed text-sm md:text-base max-w-xs">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
