"use client";

import { useUser } from "@/context/UserContext";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Universities } from "@/components/landing/Universities";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { MobileAppSection } from "@/components/landing/MobileAppSection";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
    const { user } = useUser();

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-900 selection:text-white overflow-x-hidden">
            <Navbar user={user} />
            <Hero user={user} />
            <Universities />
            <HowItWorks />
            <MobileAppSection />
            <Features />
            <Testimonials />
            <Footer />
        </div>
    );
}
