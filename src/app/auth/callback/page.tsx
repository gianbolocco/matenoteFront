"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";

function AuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useUser();
    const [status, setStatus] = useState("Processing login...");

    useEffect(() => {
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (error) {
            setStatus("Login failed: " + error);
            setTimeout(() => router.push("/login"), 3000);
            return;
        }

        // Attempt to establish session via cookie
        login()
            .then(() => {
                setStatus("Login successful! Redirecting...");
                router.push("/home");
            })
            .catch((err: any) => {
                console.error("Login processing error:", err);
                setStatus("Failed to verify session.");
                // Optional: redirect to login anyway or show error
                setTimeout(() => router.push("/login"), 3000);
            });
    }, [searchParams, router, login]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="p-8 bg-white rounded-xl shadow-lg text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-800">{status}</h2>
                <p className="text-gray-500 mt-2 text-sm">Please wait while we set up your session.</p>
            </div>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <AuthCallbackContent />
        </Suspense>
    );
}
