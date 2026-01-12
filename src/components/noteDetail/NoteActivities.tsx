import { Brain, FileQuestion, CheckSquare, Layers, Loader2 } from "lucide-react";
import { useState } from "react";
import { Note } from "@/types";
import { MindMapModal } from "./MindMapModal";
import { generateMindMap } from "@/services/noteService";
import { useRouter } from "next/navigation";
import { ActivityCard } from "./ActivityCard";

interface NoteActivitiesProps {
    note: Note;
}

export function NoteActivities({ note: initialNote }: NoteActivitiesProps) {
    const [note, setNote] = useState<Note>(initialNote);
    const [isMindMapOpen, setIsMindMapOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const router = useRouter();

    const handleMindMapClick = async () => {
        if (note.mindmap) {
            setIsMindMapOpen(true);
            return;
        }

        try {
            setIsGenerating(true);
            const mindMapData = await generateMindMap(note.id);

            // Update local state with the new mindmap
            const updatedNote = { ...note, mindmap: mindMapData };
            setNote(updatedNote);

            router.refresh();
        } catch (error) {
            console.error("Failed to generate mind map", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Study Activities
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <ActivityCard
                    title={note.mindmap ? 'Mind Map' : 'Generate Mind Map'}
                    description={note.mindmap
                        ? 'Visualize concepts with an interactive map.'
                        : 'Create an AI-powered mind map from this note.'}
                    icon={isGenerating ? Loader2 : Brain}
                    iconClass={isGenerating ? 'animate-spin' : ''}
                    color="bg-violet-50 text-violet-600"
                    onClick={handleMindMapClick}
                    disabled={isGenerating}
                    badge={isGenerating ? 'Generating...' : null}
                    isLoading={isGenerating}
                />

                <ActivityCard
                    title="Practice Quiz"
                    description="Test your knowledge with AI-generated questions."
                    icon={FileQuestion}
                    color="bg-blue-50 text-blue-600"
                    onClick={() => { }}
                    disabled={true}
                    badge="Coming Soon"
                />

                <ActivityCard
                    title="Flashcards"
                    description="Memorize key terms and definitions."
                    icon={Layers}
                    color="bg-amber-50 text-amber-600"
                    onClick={() => { }}
                    disabled={true}
                    badge="Coming Soon"
                />

                <ActivityCard
                    title="True or False"
                    description="Quick check of your understanding."
                    icon={CheckSquare}
                    color="bg-green-50 text-green-600"
                    onClick={() => { }}
                    disabled={true}
                    badge="Coming Soon"
                />
            </div>

            <MindMapModal
                isOpen={isMindMapOpen}
                onClose={() => setIsMindMapOpen(false)}
                note={note}
            />
        </section>
    );
}
