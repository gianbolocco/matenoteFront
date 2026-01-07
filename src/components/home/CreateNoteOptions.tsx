import { FileText, Youtube, Mic, Plus, AlignLeft } from "lucide-react";
import { useState } from "react";
import { OptionCard } from "./createOptions/OptionCard";
import { YoutubeModal } from "./createOptions/YoutubeModal";
import { PdfModal } from "./createOptions/PdfModal";

interface CreateNoteOptionsProps {
    onNoteCreated?: () => void;
    onYoutubeCreate?: (url: string) => void;
    onPdfCreate?: (file: File) => void;
}

export function CreateNoteOptions({ onNoteCreated, onYoutubeCreate, onPdfCreate }: CreateNoteOptionsProps) {
    const [showYoutubeModal, setShowYoutubeModal] = useState(false);
    const [showPdfModal, setShowPdfModal] = useState(false);

    const handleYoutubeSubmit = (url: string) => {
        if (onYoutubeCreate) {
            onYoutubeCreate(url);
        } else {
            console.warn("onYoutubeCreate prop missing");
        }
    };

    const handlePdfSubmit = (file: File) => {
        if (onPdfCreate) {
            onPdfCreate(file);
        } else {
            console.warn("onPdfCreate prop missing");
        }
    };

    return (
        <section>
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
                <Plus className="w-4 h-4" />
                <span>Create New</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <OptionCard
                    icon={FileText}
                    title="PDF Document"
                    description="Upload a PDF to extract summaries and flashcards."
                    onClick={() => setShowPdfModal(true)}
                />

                <OptionCard
                    icon={Youtube}
                    title="YouTube Video"
                    description="Paste a URL to generate notes from a video transcript."
                    onClick={() => setShowYoutubeModal(true)}
                />

                <OptionCard
                    icon={Mic}
                    title="Audio Recording"
                    description="Record lectures directly to convert speech to text."
                    disabled={true}
                    badgeText="Coming Soon"
                />

                <OptionCard
                    icon={AlignLeft}
                    title="Raw Text"
                    description="Paste text directly to generate notes and summaries."
                    disabled={true}
                    badgeText="Coming Soon"
                />
            </div>

            <YoutubeModal
                isOpen={showYoutubeModal}
                onClose={() => setShowYoutubeModal(false)}
                onSubmit={handleYoutubeSubmit}
            />

            <PdfModal
                isOpen={showPdfModal}
                onClose={() => setShowPdfModal(false)}
                onSubmit={handlePdfSubmit}
            />
        </section>
    );
}
