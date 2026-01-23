"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { User } from "@/types";

interface NavbarProps {
    user: User | null;
}

export function Navbar({ user }: NavbarProps) {
    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Matenote Logo" className="w-8 h-8 rounded-lg object-contain" />
                    <span className="text-xl font-bold tracking-tight">Matenote</span>
                </div>

                <div className="flex items-center gap-6">
                    <Link
                        href={user ? "/home" : "/login"}
                        className="px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 hover:-translate-y-0.5 transition-all shadow-lg shadow-gray-900/10 flex items-center gap-2"
                    >
                        Comenzar
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
