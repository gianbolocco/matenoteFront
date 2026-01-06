"use client";

import Link from "next/link";
import GoogleButton from "@/components/common/GoogleButton";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
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
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back</h1>
                        <p className="text-gray-500">
                            Enter your details to access your notes.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <GoogleButton text="Sign in with Google" />

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Placeholder for future email/password login */}
                        <div className="text-center text-sm text-gray-400">
                            Email login coming soon
                        </div>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-gray-500">Don't have an account? </span>
                        <Link href="/register" className="font-semibold text-primary hover:text-primary/80 hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Column - Visual */}
            <div className="hidden lg:block bg-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5" />
                <div className="absolute inset-0 flex items-center justify-center p-24">
                    <div className="relative w-full aspect-square max-w-md">
                        {/* Abstract shapes or App Preview could go here */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 animate-pulse" />
                        <div className="relative z-10 bg-white/80 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
                            <div className="space-y-4">
                                <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                                <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
                                <div className="h-32 w-full bg-gray-50 rounded-xl border border-gray-100 mt-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
