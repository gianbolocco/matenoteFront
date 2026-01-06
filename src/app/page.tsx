import Link from "next/link";
import { Sparkles, Zap, Brain, Layout, ArrowRight, ShieldCheck } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-900 selection:text-white">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/logo.jpg" alt="Matenote Logo" className="w-8 h-8 rounded-lg object-contain" />
                        <span className="text-xl font-bold tracking-tight">Matenote</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/login"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/register"
                            className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 hover:-translate-y-0.5 transition-all shadow-lg shadow-gray-900/10"
                        >
                            Sign up free
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
                            href="/register"
                            className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-semibold text-lg hover:bg-black hover:-translate-y-1 transition-all shadow-xl shadow-gray-900/20 flex items-center gap-2"
                        >
                            Get Started
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/login"
                            className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-semibold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2"
                        >
                            Login to App
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-gray-50/50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
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

            {/* About Section */}
            <section className="py-24 px-6">
                <div className="max-w-3xl mx-auto text-center space-y-12">
                    <h2 className="text-4xl font-bold tracking-tight">About Us</h2>
                    <div className="prose prose-lg prose-gray mx-auto text-gray-500">
                        <p className="leading-relaxed">
                            At Matenote, we believe learning should be efficient and engaging.
                            Founded by a team of students and engineers, we understand the struggle
                            of drowning in information. That's why we built the ultimate second brain
                            for learners—combining cutting-edge AI with intuitive design to help you
                            retain more with less effort.
                        </p>
                        <p className="mt-6">
                            Our mission is to empower students worldwide to unlock their full academic potential.
                            Join thousands of learners who have upgraded their study routine.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100/50">
                        <div>
                            <div className="text-3xl font-bold text-gray-900">10k+</div>
                            <div className="text-sm text-gray-500 mt-1 uppercase tracking-wide font-medium">Active Students</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900">1M+</div>
                            <div className="text-sm text-gray-500 mt-1 uppercase tracking-wide font-medium">Notes Generated</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-gray-100 bg-white">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <img src="/logo.jpg" alt="Matenote Logo" className="w-6 h-6 rounded-md object-contain" />
                        <span className="font-semibold text-gray-900">Matenote</span>
                    </div>
                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Matenote Inc. All rights reserved.
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
