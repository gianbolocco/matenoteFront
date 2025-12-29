import { Quote } from "lucide-react";

interface NoteSummaryProps {
    summary: string;
}

export function NoteSummary({ summary }: NoteSummaryProps) {
    return (
        <section className="mb-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-300 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                <Quote className="absolute top-6 left-6 text-gray-300 w-12 h-12 -z-0 opacity-50" />

                <h2 className="text-lg font-bold text-gray-500 mb-4 relative z-10">
                    Summary
                </h2>
                <div className="text-gray-900/80 leading-relaxed relative z-10 text-lg">
                    {summary}
                </div>
            </div>
        </section>
    );
}
