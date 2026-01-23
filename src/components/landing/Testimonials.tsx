"use client";

import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
    {
        name: "Sofia Martinez",
        role: "Estudiante de Arquitectura",
        university: "UBA",
        universityLogo: "https://www.freelogovectors.net/wp-content/uploads/2020/01/UBA_logo_University_of_Buenos_Aires.png",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        headline: "Salvó mi final de historia.",
        text: "Matenote cambió cómo estudio historia de la arquitectura. Los resúmenes son exactos y me ahorran horas de lectura. Me sentí muy preparada.",
        date: "Abril 2025"
    },
    {
        name: "Lucas Rodriguez",
        role: "Ingeniería en Sistemas",
        university: "UTN",
        universityLogo: "https://iconape.com/wp-content/png_logo_vector/utn.png",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        headline: "Es como un tutor privado.",
        text: "La generación de cuestionarios es increíble para preparar finales. Pregunta exactamente lo que necesitaba practicar.",
        date: "Mayo 2025"
    },
    {
        name: "Valentina Gomez",
        role: "Estudiante de Derecho",
        university: "UADE",
        universityLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Looo_UADE.svg/2560px-Looo_UADE.svg.png",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        headline: "6 estrellas si pudiera.",
        text: "Me ahogaba en PDFs hasta que encontré esta app. Ahora puedo organizar mis casos y apuntes al instante. ¡Muy recomendada!",
        date: "Junio 2025"
    }
];

export function Testimonials() {
    return (
        <section className="py-24 bg-gray-50/50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 leading-[1.1]">Amado por estudiantes argentinos</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Únete a la comunidad de estudiantes que están transformando su vida académica.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((t, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
                            <div className="space-y-6">
                                {/* Header: User Info */}
                                <div className="flex items-center gap-4">
                                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-50" />
                                    <div>
                                        <div className="font-bold text-gray-900 leading-tight">{t.name}</div>
                                        <div className="text-xs text-gray-500 font-medium">{t.role}</div>
                                    </div>
                                    <div className="ml-auto">
                                        <img src={t.universityLogo} alt={t.university} className="h-8 w-auto object-contain opacity-40 grayscale" />
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">"{t.headline}"</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {t.text}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-medium">
                                <span>{t.university}</span>
                                <span>{t.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
