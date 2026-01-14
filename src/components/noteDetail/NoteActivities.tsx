import { Brain, FileQuestion, CheckSquare, Layers, Loader2 } from "lucide-react";
import { useState } from "react";
import { Note } from "@/types";
import { MindMapModal } from "./MindMapModal";
import { generateMindMap } from "@/services/noteService";
import { createFlashcards } from "@/services/flashcardService";
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

    const [isGeneratingFlashcards, setIsGeneratingFlashcards] = useState(false);

    const handleFlashcardsClick = async () => {
        // If flashcards already exist (we have an ID), navigate to them
        if (note.flashcardsId) {
            router.push(`/flashcards/${note.flashcardsId}`);
            return;
        }

        // Otherwise generate them
        try {
            setIsGeneratingFlashcards(true);
            const flashcards = await createFlashcards(note.id);

            const targetId = flashcards._id || flashcards._id;
            if (!targetId) {
                console.error("Created flashcards but no ID returned:", flashcards);
                return;
            }

            // Navigate directly to the new flashcards
            router.push(`/flashcards/${targetId}`);

            // Optionally update local state if we were to stay on this page
            // const updatedNote = { ...note, flashcardsId: flashcards.id };
            // setNote(updatedNote);

        } catch (error) {
            console.error("Failed to generate flashcards", error);
        } finally {
            setIsGeneratingFlashcards(false);
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
                    title={note.flashcardsId ? "Flashcards" : "Generate Flashcards"}
                    description={note.flashcardsId
                        ? "Review your flashcards deck."
                        : "Memorize key terms and definitions."}
                    icon={isGeneratingFlashcards ? Loader2 : Layers}
                    iconClass={isGeneratingFlashcards ? 'animate-spin' : ''}
                    color="bg-amber-50 text-amber-600"
                    onClick={handleFlashcardsClick}
                    disabled={isGeneratingFlashcards}
                    badge={isGeneratingFlashcards ? "Generating..." : null}
                    isLoading={isGeneratingFlashcards}
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
