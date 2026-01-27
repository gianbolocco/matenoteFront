import { FileText, Youtube, Mic, Plus, AlignLeft } from "lucide-react";
import { useState } from "react";
import { OptionCard } from "./createOptions/OptionCard";
import { YoutubeModal } from "./createOptions/YoutubeModal";
import { PdfModal } from "./createOptions/PdfModal";
import { AudioModal } from "./createOptions/AudioModal";

interface CreateNoteOptionsProps {
    onNoteCreated?: () => void;
    onYoutubeCreate?: (url: string, folderId?: string, interest?: string) => void;
    onPdfCreate?: (file: File, folderId?: string, interest?: string) => void;
    onAudioCreate?: (file: File, folderId?: string, interest?: string) => void;
}

export function CreateNoteOptions({ onNoteCreated, onYoutubeCreate, onPdfCreate, onAudioCreate }: CreateNoteOptionsProps) {
    const [showYoutubeModal, setShowYoutubeModal] = useState(false);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [showAudioModal, setShowAudioModal] = useState(false);

    const handleYoutubeSubmit = (url: string, folderId?: string, interest?: string) => {
        if (onYoutubeCreate) {
            onYoutubeCreate(url, folderId, interest);
        } else {
            console.warn("onYoutubeCreate prop missing");
        }
    };

    const handlePdfSubmit = (file: File, folderId?: string, interest?: string) => {
        if (onPdfCreate) {
            onPdfCreate(file, folderId, interest);
        } else {
            console.warn("onPdfCreate prop missing");
        }
    };

    const handleAudioSubmit = (file: File, folderId?: string, interest?: string) => {
        if (onAudioCreate) {
            onAudioCreate(file, folderId, interest);
        } else {
            console.warn("onAudioCreate prop missing");
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
                    bgColorClass="bg-violet-50"
                    iconColorClass="text-violet-500"
                    hoverBgClass="group-hover:bg-violet-500"
                    onClick={() => setShowPdfModal(true)}
                />

                <OptionCard
                    icon={Youtube}
                    title="YouTube Video"
                    description="Paste a URL to generate notes from a video transcript."
                    bgColorClass="bg-red-50"
                    iconColorClass="text-red-600"
                    hoverBgClass="group-hover:bg-red-600"
                    onClick={() => setShowYoutubeModal(true)}
                />

                <OptionCard
                    icon={Mic}
                    title="Audio Recording"
                    description="Record lectures directly or upload audio files to convert speech to text."
                    bgColorClass="bg-blue-50"
                    iconColorClass="text-blue-500"
                    hoverBgClass="group-hover:bg-blue-500"
                    onClick={() => setShowAudioModal(true)}
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

            <AudioModal
                isOpen={showAudioModal}
                onClose={() => setShowAudioModal(false)}
                onSubmit={handleAudioSubmit}
            />
        </section>
    );
}
