"use client";

import Link from "next/link";
import GoogleButton from "@/components/ui/GoogleButton";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {

    return (
        <div className="min-h-screen w-full flex">
            {/* Left Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-background relative">
                <Link
                    href="/"
                    className="absolute top-8 left-8 text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                </Link>
                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="flex flex-col items-center justify-center space-y-5">
                        <div className="flex justify-center mb-6">
                            <img src="/logo.png" alt="Matenote Logo" className="w-20 h-20 object-cover" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                        <p className="text-muted-foreground">
                            Sign in to continue your AI-powered learning journey.
                        </p>
                    </div>

                    {/* Auth Actions */}
                    <div className="space-y-4 pt-4">
                        <GoogleButton text="Continue with Google" />

                        <p className="text-xs text-center text-muted-foreground pt-4">
                            By continuing, you agree to our{" "}
                            <Link href="#" className="underline hover:text-primary">Terms of Service</Link>
                            {" "}and{" "}
                            <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-8 text-center w-full text-sm text-muted-foreground opacity-60">
                    © {new Date().getFullYear()} NoteAI. All rights reserved.
                </div>
            </div>

            {/* Right Panel - Visual Branding (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 bg-black relative overflow-hidden items-center justify-center text-white p-12">
                {/* Lava Background Effect */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 0.9, 1.1, 1],
                            rotate: [0, 60, -60, 30, 0],
                            x: [0, 100, -80, 40, 0],
                            y: [0, -60, 80, -40, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-15%] left-[-15%] w-[650px] h-[650px] bg-violet-600/25 rounded-full blur-[120px] mix-blend-screen"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 0.8, 1.2, 1],
                            rotate: [0, -90, 45, -30, 0],
                            x: [0, -100, 80, -60, 0],
                            y: [0, 80, -100, 50, 0],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[-15%] right-[-15%] w-[750px] h-[750px] bg-blue-600/25 rounded-full blur-[140px] mix-blend-screen"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.4, 0.9, 1.3, 1],
                            x: [0, 120, -100, 60, 0],
                            y: [0, 60, -60, 30, 0],
                        }}
                        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[25%] left-[25%] w-[550px] h-[550px] bg-pink-600/20 rounded-full blur-[100px] mix-blend-screen"
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 max-w-lg text-center space-y-8">
                    <h2 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        Capture ideas.<br />Unlock potential.
                    </h2>
                    <p className="text-lg text-white/50 font-light">
                        Your ultimate AI second brain for effortless learning.
                    </p>
                </div>
            </div>
        </div>
    );
}
