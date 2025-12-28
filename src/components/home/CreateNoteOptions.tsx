import { FileText, Youtube, Mic, Plus, AlignLeft, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { createNoteFromYoutube } from "@/services/noteService";
import { useUser } from "@/context/UserContext";

interface CreateNoteOptionsProps {
    onNoteCreated?: () => void;
    onYoutubeCreate?: (url: string) => void;
}

export function CreateNoteOptions({ onNoteCreated, onYoutubeCreate }: CreateNoteOptionsProps) {
    const { user } = useUser();
    const [showYoutubeModal, setShowYoutubeModal] = useState(false);
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleYoutubeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !youtubeUrl) return;

        // Validate YouTube URL
        // Handles:
        // - https://www.youtube.com/watch?v=VIDEO_ID
        // - https://youtu.be/VIDEO_ID
        // - https://www.youtube.com/embed/VIDEO_ID
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        if (!youtubeRegex.test(youtubeUrl)) {
            setError("Please enter a valid YouTube video URL");
            return;
        }

        // Check if onYoutubeCreate is accessible (it should be)
        if (onYoutubeCreate) {
            onYoutubeCreate(youtubeUrl);
            setShowYoutubeModal(false);
            setYoutubeUrl("");
            setError("");
        } else {
            // Fallback if prop not provided (though we expect it)
            try {
                setIsSubmitting(true);
                setError("");
                // We'd need to import createNoteFromYoutube here if using fallback
                // But for now let's rely on the prop
                console.warn("onYoutubeCreate prop missing");
            } catch (err) {
                setError("Failed to create note.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <section>
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                <Plus className="w-4 h-4" />
                <span>Create New</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* PDF Option */}
                <button className="group relative flex flex-col items-start p-6 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-left">
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors duration-200">
                        <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">PDF Document</h3>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        Upload a PDF to extract summaries and flashcards.
                    </p>
                </button>

                {/* YouTube Option */}
                <button
                    onClick={() => setShowYoutubeModal(true)}
                    className="group relative flex flex-col items-start p-6 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-left"
                >
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors duration-200">
                        <Youtube className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">YouTube Video</h3>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        Paste a URL to generate notes from a video transcript.
                    </p>
                </button>

                {/* Audio Option (Disabled) */}
                <div className="relative flex flex-col items-start p-6 bg-gray-50 border border-gray-100 rounded-2xl opacity-80 cursor-not-allowed">
                    <div className="absolute top-4 right-4 px-2.5 py-1 bg-gray-200 text-gray-500 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        Coming Soon
                    </div>
                    <div className="p-3 bg-gray-200 text-gray-400 rounded-xl mb-4">
                        <Mic className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-400 mb-1">Audio Recording</h3>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                        Record lectures directly to convert speech to text.
                    </p>
                </div>

                {/* Text Option (Disabled) */}
                <div className="relative flex flex-col items-start p-6 bg-gray-50 border border-gray-100 rounded-2xl opacity-80 cursor-not-allowed">
                    <div className="absolute top-4 right-4 px-2.5 py-1 bg-gray-200 text-gray-500 text-[10px] font-bold uppercase tracking-wider rounded-full">
                        Coming Soon
                    </div>
                    <div className="p-3 bg-gray-200 text-gray-400 rounded-xl mb-4">
                        <AlignLeft className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-400 mb-1">Raw Text</h3>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                        Paste text directly to generate notes and summaries.
                    </p>
                </div>
            </div>

            {/* YouTube Modal */}
            {showYoutubeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowYoutubeModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                                <Youtube className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Import from YouTube</h3>
                        </div>

                        <form onSubmit={handleYoutubeSubmit}>
                            <div className="mb-6">
                                <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-700 mb-2">
                                    Video URL
                                </label>
                                <input
                                    id="youtube-url"
                                    type="text"
                                    required
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={youtubeUrl}
                                    onChange={(e) => setYoutubeUrl(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                />
                                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-900/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    "Generate Notes"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
