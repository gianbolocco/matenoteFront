"use client";

import Link from "next/link";
import GoogleButton from "@/components/common/GoogleButton";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white">
            {/* Left Column - Form */}
            <div className="p-8 lg:p-12 xl:p-24 flex flex-col justify-center relative">
                <Link
                    href="/"
                    className="absolute top-8 left-8 text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="w-full max-w-sm mx-auto space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create an account</h1>
                        <p className="text-gray-500">
                            Start organizing your thoughts with AI.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <GoogleButton text="Sign up with Google" />

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Placeholder for future email/password registration */}
                        <div className="text-center text-sm text-gray-400">
                            Email registration coming soon
                        </div>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-gray-500">Already have an account? </span>
                        <Link href="/login" className="font-semibold text-primary hover:text-primary/80 hover:underline">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Column - Visual */}
            <div className="hidden lg:block bg-gray-900 relative overflow-hidden text-white">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                    <div className="space-y-6 max-w-lg relative z-10">
                        <h2 className="text-4xl font-bold tracking-tight">Unlock your potential</h2>
                        <p className="text-gray-400 text-lg">
                            Join thousands of students and professionals using our AI to learn faster and work smarter.
                        </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>
            </div>
        </div>
    );
}
