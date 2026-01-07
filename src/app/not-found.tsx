import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
            <div className="space-y-6 max-w-md">
                {/* Icon/Visual */}
                <div className="text-9xl font-bold text-gray-100 select-none">
                    404
                </div>

                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Page not found
                </h1>

                <p className="text-gray-500 text-lg">
                    Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
                </p>

                <div className="pt-4 flex justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
