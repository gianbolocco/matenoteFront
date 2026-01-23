import { Brain, Zap, HelpCircle, Headphones, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Features() {
    return (
        <section className="py-24 bg-gray-50/50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                        Todo lo que necesitas para <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                            sacar 10 en tus exámenes
                        </span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Deja de perder tiempo organizando. Empieza a aprender con herramientas diseñadas para estudiantes de alto rendimiento.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <FeatureCard
                        icon={<Brain className="w-6 h-6 text-white" />}
                        iconBg="bg-blue-600"
                        title="Síntesis Inteligente"
                        description="Nuestra IA lee tus documentos y videos para extraer conceptos clave, creando resúmenes concisos automáticamente."
                    />
                    <FeatureCard
                        icon={<Zap className="w-6 h-6 text-white" />}
                        iconBg="bg-amber-400"
                        title="Flashcards Instantáneas"
                        description="Convierte cualquier nota en un mazo de estudio. Repasa sin problemas con repetición espaciada para acechar tus exámenes."
                    />
                    <FeatureCard
                        icon={<HelpCircle className="w-6 h-6 text-white" />}
                        iconBg="bg-violet-600"
                        title="Generador de Quiz"
                        description="Pon a prueba tu conocimiento antes del examen real. Genera preguntas de opción múltiple basadas en tu material."
                    />
                </div>

                {/* Podcast Feature - Wide Card */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-12 overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="flex-1 space-y-6">
                        <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center">
                            <Headphones className="w-7 h-7 text-pink-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">AI Study Podcast</h3>
                        <p className="text-gray-500 leading-relaxed max-w-lg">
                            ¿Cansado de leer? Transforma tus apuntes en una conversación de podcast atractiva y realista. Escucha a dos anfitriones de IA discutir tus temas de estudio mientras vas en el transporte, haces ejercicio o cocinas.
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 rounded-full text-xs font-bold text-pink-600 uppercase tracking-wider">
                            Próximamente
                        </div>
                    </div>

                    {/* Audio Visualizer Simulation */}
                    <div className="flex-1 w-full max-w-md bg-[#2A1B3D] rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center gap-6 relative overflow-hidden">
                        {/* Bars Animation */}
                        <div className="flex items-center gap-1.5 h-16">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-2 bg-pink-500 rounded-full animate-music-bar"
                                    style={{
                                        height: '30%',
                                        animationDelay: `${i * 0.1}s`,
                                        animationDuration: '1.5s'
                                    }}
                                />
                            ))}
                        </div>
                        <span className="text-gray-400 text-sm font-mono tracking-widest uppercase">Generando Audio...</span>

                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes music-bar {
                    0%, 100% { height: 30%; }
                    50% { height: 80%; }
                }
                .animate-music-bar {
                    animation: music-bar 1s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}

interface FeatureCardProps {
    icon: React.ReactNode;
    iconBg: string;
    title: string;
    description: string;
}

function FeatureCard({ icon, iconBg, title, description }: FeatureCardProps) {
    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col items-start">
            <div className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm lg:text-base">
                {description}
            </p>
        </div>
    );
}
