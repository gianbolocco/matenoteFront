"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Brain, Zap, Layout, Star, GraduationCap, Quote } from "lucide-react";
import { motion } from "framer-motion";

// University Logos Data
const UNIVERSITIES = [
    { name: "UBA", url: "https://www.freelogovectors.net/wp-content/uploads/2020/01/UBA_logo_University_of_Buenos_Aires.png" },
    { name: "UTN", url: "https://iconape.com/wp-content/png_logo_vector/utn.png" },
    { name: "UNLP", url: "https://upload.wikimedia.org/wikipedia/commons/7/74/UNLP_Logo_%28cropped%29.svg" },
    { name: "UADE", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Looo_UADE.svg/2560px-Looo_UADE.svg.png" },
    { name: "ITBA", url: "https://www.itba.edu.ar/wp-content/uploads/2020/03/Marca-ITBA-Color-ALTA.png" },
    { name: "Austral", url: "https://dia.austral.edu.ar/skins/Vector/images/Logo_Austral.png" },
    { name: "UCA", url: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Universidad_Cat%C3%B3lica_Argentina.png" },
    { name: "UNLAM", url: "https://repositoriocyt.unlam.edu.ar/retrieve/c67e7076-bc71-47ce-9f29-f8274760fd05" },
    { name: "UNSAM", url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Logo_UNSAM.png" },
    { name: "UNC", url: "https://biblioteca.mincyt.gob.ar/img/logos/organizations/UNC.svg" },
    { name: "UP", url: "https://fopea.org/wp-content/uploads/2023/11/Universidad-de-Palermo.png" },
];

// Testimonials Data
const TESTIMONIALS = [
    {
        name: "Sofia Martinez",
        role: "Architecture Student",
        university: "UBA",
        universityLogo: "https://www.freelogovectors.net/wp-content/uploads/2020/01/UBA_logo_University_of_Buenos_Aires.png",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        headline: "Saved my architectural history final.",
        text: "Matenote changed how I study history of architecture. The summaries are spot on and save me hours of reading. I felt so prepared.",
        date: "April 2025"
    },
    {
        name: "Lucas Rodriguez",
        role: "Systems Engineering",
        university: "UTN",
        universityLogo: "https://iconape.com/wp-content/png_logo_vector/utn.png",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        headline: "It's like a private AI tutor.",
        text: "The quiz generation feature is incredible for preparing for finals. It asks the exact questions I needed to practice.",
        date: "May 2025"
    },
    {
        name: "Valentina Gomez",
        role: "Law Student",
        university: "UADE",
        universityLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Looo_UADE.svg/2560px-Looo_UADE.svg.png",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        headline: "6 stars if I could.",
        text: "I was drowning in PDFs until I found this app. Now I can organize my cases and notes instantly. Highly recommended!",
        date: "June 2025"
    }
];

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-900 selection:text-white overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Matenote Logo" className="w-8 h-8 rounded-lg object-contain" />
                        <span className="text-xl font-bold tracking-tight">Matenote</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/login"
                            className="px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 hover:-translate-y-0.5 transition-all shadow-lg shadow-gray-900/10 flex items-center gap-2"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm font-medium text-gray-600 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        AI v2.0 is now live
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        Master your classes with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                            artificial intelligence
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        Transform messy notes, PDFs, and YouTube videos into structured summaries, flashcards, and quizzes instantly.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <Link
                            href="/login"
                            className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-semibold text-lg hover:bg-black hover:-translate-y-1 transition-all shadow-xl shadow-gray-900/20 flex items-center gap-2"
                        >
                            Start Learning Free
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* University Carousel */}
            <section className="py-16 bg-gray-50 border-y border-gray-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 mb-12 text-center text-sm font-medium text-gray-400 uppercase tracking-widest">
                    Trusted by students from top universities
                </div>
                <div className="relative w-full overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-gray-50 to-transparent" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-gray-50 to-transparent" />

                    <motion.div
                        className="flex items-center gap-12 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    >
                        {[...UNIVERSITIES, ...UNIVERSITIES].map((uni, i) => (
                            <div key={i} className="flex items-center justify-center w-32 h-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                <img src={uni.url} alt={uni.name} className="max-w-full max-h-full object-contain" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">Everything you need to ace your exams</h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Stop wasting time organizing. Start learning with tools designed for high-performance students.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Brain className="w-6 h-6 text-purple-600" />}
                            title="Smart Synthesis"
                            description="Our AI reads your documents and videos to extract key concepts, creating concise summaries automatically."
                        />
                        <FeatureCard
                            icon={<Zap className="w-6 h-6 text-yellow-500" />}
                            title="Instant Flashcards"
                            description="Turn any note into a study deck. Review seamlessly with spaced repetition to ace your exams."
                        />
                        <FeatureCard
                            icon={<Layout className="w-6 h-6 text-blue-600" />}
                            title="Mind Mapping"
                            description="Visualize connections between topics with auto-generated mind maps from your course materials."
                        />
                    </div>
                </div>
            </section>

            {/* Student Testimonials */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24 space-y-4">
                        <h2 className="text-4xl font-bold tracking-tight">Loved by Argentine Students</h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Join the community of students who are transforming their academic life.
                        </p>
                    </div>

                    <div className="flex flex-col gap-20">
                        {TESTIMONIALS.map((t, i) => (
                            <div key={i} className={`flex flex-col md:flex-row items-stretch gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Text Card */}
                                <div className="flex-1 bg-[#FDFBF7] rounded-[2.5rem] p-10 md:p-14 relative">
                                    {/* Quote Icon */}
                                    <div className="absolute -top-6 -left-4 bg-black text-white p-5 rounded-3xl w-20 h-20 flex items-center justify-center transform -rotate-12 shadow-2xl">
                                        <Quote className="w-8 h-8 opacity-90 fill-white" />
                                    </div>

                                    <div className="mt-8 space-y-8">
                                        <div className="flex gap-1.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                        <h3 className="font-serif text-4xl md:text-5xl font-medium italic text-gray-900 leading-[1.1] tracking-tight">
                                            "{t.headline}"
                                        </h3>
                                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
                                            {t.text}
                                        </p>
                                        <div className="pt-6 border-t border-gray-200/60">
                                            <div className="font-bold text-gray-900 text-lg">{t.role}, {t.university}</div>
                                            <div className="text-gray-400 text-sm font-medium">{t.date}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Image/Context Card */}
                                <div className="flex-1 relative rounded-[2.5rem] overflow-hidden min-h-[400px] shadow-sm">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-12">
                                        <img src={t.universityLogo} alt={t.university} className="max-h-60 object-contain brightness-0 invert opacity-60 drop-shadow-2xl" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-100 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div className="md:col-span-2 space-y-4">
                            <div className="flex items-center gap-2">
                                <img src="/logo.png" alt="Matenote Logo" className="w-8 h-8 rounded-lg object-contain" />
                                <span className="font-bold text-xl text-gray-900">Matenote</span>
                            </div>
                            <p className="text-gray-500 max-w-sm">
                                The AI-powered productivity tool designed for modern students. Study smarter, not harder.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                                <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                                <li><a href="#" className="hover:text-gray-900">Testimonials</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href="#" className="hover:text-gray-900">About</a></li>
                                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Matenote Inc. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-gray-400 hover:text-gray-600"><span className="sr-only">Twitter</span><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
                            <a href="#" className="text-gray-400 hover:text-gray-600"><span className="sr-only">GitHub</span><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-500 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
