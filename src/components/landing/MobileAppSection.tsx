
"use client";

export function MobileAppSection() {


    return (
        <section className="py-32 bg-gray-50 overflow-hidden relative border-t border-gray-100">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-100/50 rounded-full blur-3xl -z-10" />

            <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-10 relative z-10 transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-bold tracking-widest text-gray-500 uppercase shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                    Próximamente
                </div>

                {/* Headings */}
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-[1.1]">
                        Lleva tu estudio <br />
                        <span className="text-violet-600">a cualquier lugar</span>
                    </h2>

                    <p className="text-gray-500 text-xl leading-relaxed max-w-2xl mx-auto">
                        Muy pronto podrás acceder a todos tus resúmenes y flashcards desde tu bolsillo. La app de Matenote estará disponible para iOS y Android.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* App Store Button */}
                    <button className="relative flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-2xl border border-gray-800 hover:scale-105 transition-transform duration-300 group overflow-hidden shadow-xl">
                        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-md bg-black/60">
                            <span className="text-xs font-bold uppercase tracking-wider">Próximamente</span>
                        </div>
                        <img src="/apple-logo.png" alt="Apple Logo" className="w-8 h-8 object-contain inverted" />
                        <div className="text-left leading-none">
                            <div className="text-[10px] font-medium mb-0.5 tracking-wide opacity-80">Consíguelo en el</div>
                            <div className="text-xl font-bold">App Store</div>
                        </div>
                    </button>

                    {/* Google Play Button */}
                    <button className="relative flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-2xl border border-gray-800 hover:scale-105 transition-transform duration-300 group overflow-hidden shadow-xl">
                        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-md bg-black/60">
                            <span className="text-xs font-bold uppercase tracking-wider">Próximamente</span>
                        </div>
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.00034 3.46875C4.78159 3.6875 4.65659 4.03125 4.65659 4.46875V19.5312C4.65659 19.9688 4.78159 20.3125 5.00034 20.5312L5.09409 20.625L13.1566 12.5625L13.2503 12.4688L5.09409 4.3125L5.00034 3.46875Z" fill="#00E2F7" />
                            <path d="M15.8441 15.25L13.1566 12.5625L5.00034 20.625C5.31284 20.9375 5.81284 21.0312 6.34409 20.7188L15.8441 15.25Z" fill="#36FAB2" />
                            <path d="M15.8441 8.75L6.34409 3.28125C5.81284 2.96875 5.31284 3.0625 5.00034 3.46875L13.1566 11.5312L15.8441 8.75Z" fill="#FF5E6D" />
                            <path d="M13.1566 12.4688L15.8441 15.25L20.3441 12.6875C21.6253 11.9688 21.6253 10.7812 20.3441 10.0625L15.8441 8.75L13.1566 11.4375L13.1566 12.4688Z" fill="#FFCD00" />
                        </svg>
                        <div className="text-left leading-none">
                            <div className="text-[10px] font-medium mb-0.5 tracking-wide opacity-80">DISPONIBLE EN</div>
                            <div className="text-xl font-bold">Play Store</div>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}
