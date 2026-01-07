"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Components
import { UsagePurposeStep } from "../../components/onboarding/UsagePurposeStep";
import { ProfileDetailsStep } from "../../components/onboarding/ProfileDetailsStep";
import { InterestsStep } from "../../components/onboarding/InterestsStep";

export default function OnboardingPage() {
    const router = useRouter();
    const { updateUser, user, isLoading } = useUser();
    const [step, setStep] = useState(1);

    // Protect Route
    useEffect(() => {
        if (!isLoading) {
            // If not logged in -> Redirect to Home (or Login)
            if (!user) {
                router.replace("/");
                return;
            }

            // If logged in but already has data -> Redirect to Home
            const isProfileIncomplete = !user.country || !user.usagePurpose || !user.age;

            if (!isProfileIncomplete) {
                router.replace("/home");
            }
        }
    }, [user, isLoading, router]);

    const [formData, setFormData] = useState({
        usagePurpose: "",
        country: "Argentina",
        age: "",
        occupation: "",
        interests: [] as string[]
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = () => setStep((p) => Math.min(p + 1, 3));
    const handleBack = () => setStep((p) => Math.max(p - 1, 1));

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await updateUser({
                ...formData,
                age: parseInt(formData.age) || 0,
            });
            router.push("/home");
        } catch (error) {
            console.error("Onboarding failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isStep1Valid = !!formData.usagePurpose;
    const isValidAge = !!formData.age && parseInt(formData.age) >= 0 && parseInt(formData.age) <= 99;
    const isStep2Valid = !!formData.country && !!formData.occupation.trim() && isValidAge;
    const isStep3Valid = formData.interests.length > 0;

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-xl">
                {/* Logo & Header */}
                <div className="text-center mb-10">
                    <img src="/logo.png" alt="Matenote" className="w-16 h-16 mx-auto mb-4 object-contain" />
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        {step === 1 && "What brings you to Matenote?"}
                        {step === 2 && "Tell us about yourself"}
                        {step === 3 && "What are your interests?"}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {step === 1 && "We'll tailor the experience to your needs."}
                        {step === 2 && "Help us personalize your content."}
                        {step === 3 && "Pick up to 3 topics (optional, but recommended)."}
                    </p>
                </div>

                <div className="bg-white">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <UsagePurposeStep
                                    value={formData.usagePurpose}
                                    onChange={(val) => setFormData({ ...formData, usagePurpose: val })}
                                />
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <ProfileDetailsStep
                                    country={formData.country}
                                    age={formData.age}
                                    occupation={formData.occupation}
                                    onChange={(field, val) => setFormData({ ...formData, [field]: val })}
                                />
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <InterestsStep
                                    selectedInterests={formData.interests}
                                    onChange={(interests) => setFormData({ ...formData, interests })}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-10">
                        {step > 1 ? (
                            <Button variant="ghost" onClick={handleBack} disabled={isSubmitting}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        ) : (
                            <div /> // Spacer
                        )}

                        {step < 3 ? (
                            <Button
                                onClick={handleNext}
                                disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}
                            >
                                Continue
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                isLoading={isSubmitting}
                                disabled={!isStep3Valid}
                                className="bg-black hover:bg-gray-800 text-white px-8"
                            >
                                Get Started
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
