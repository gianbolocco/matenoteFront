import { X, Mic } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Modal } from "@/components/ui/Modal";
import { useFolders } from "@/hooks/useFolders";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { AudioVisualizer } from "./audio/AudioVisualizer";
import { RecordingTimer } from "./audio/RecordingTimer";
import { RecordingControls } from "./audio/RecordingControls";
import { AudioPlayer } from "./audio/AudioPlayer";
import { UploadTab } from "./audio/UploadTab";

interface AudioModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (file: File, folderId?: string) => void;
}

type Tab = "record" | "upload";

export function AudioModal({ isOpen, onClose, onSubmit }: AudioModalProps) {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState<Tab>("record");

    // Custom Hook for Recording Logic
    const {
        isRecording,
        isPaused,
        recordingTime,
        recordedBlob,
        audioUrl,
        error: recorderError,
        visualizerRef,
        startRecording,
        pauseRecording,
        resumeRecording,
        stopRecording,
        resetRecording
    } = useAudioRecorder();

    // Upload state
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState("");

    // Shared state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [selectedFolderId, setSelectedFolderId] = useState<string>("");

    const { folders, isLoading: isLoadingFolders } = useFolders({
        userId: user?.id,
        enabled: isOpen
    });

    const folderOptions = folders.map(f => ({ value: f.id || f._id || "", label: f.title }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        // Validation for minimum duration (2 minutes = 120 seconds)
        if (activeTab === "record" && recordingTime < 120) {
            setSubmitError("Recording must be at least 2 minutes long.");
            return;
        }

        let fileToUpload: File | null = null;

        if (activeTab === "upload") {
            fileToUpload = audioFile;
        } else if (recordedBlob) {
            fileToUpload = new File([recordedBlob], "recording.webm", { type: "audio/webm" });
        }

        if (!fileToUpload) return;

        setIsSubmitting(true);
        try {
            await onSubmit(fileToUpload, selectedFolderId || undefined);

            // Resets
            setAudioFile(null);
            resetRecording();
            setSelectedFolderId("");
            setSubmitError("");
            setUploadError("");
            onClose();
        } catch (err) {
            console.error(err);
            setSubmitError("Failed to create note from audio.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (isRecording && !isPaused) {
            pauseRecording();
        }
        onClose();
    };

    const activeError = recorderError || uploadError || submitError;

    return (
        <Modal isOpen={isOpen} onClose={handleClose} className="max-w-md p-6 relative">
            <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <Mic className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Create from Audio</h3>
            </div>

            <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                <button
                    onClick={() => setActiveTab("record")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === "record"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Record
                </button>
                <button
                    onClick={() => {
                        if (isRecording && !isPaused) pauseRecording();
                        setActiveTab("upload");
                    }}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === "upload"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Upload
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Folder Selection */}
                {folders.length > 0 && (
                    <Select
                        label="Save to Folder (Optional)"
                        value={selectedFolderId}
                        onChange={(e) => setSelectedFolderId(e.target.value)}
                        options={folderOptions}
                        placeholder="Library only"
                        disabled={isLoadingFolders}
                    />
                )}

                {/* Content Area */}
                <div>
                    {activeTab === "record" ? (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
                            {!recordedBlob ? (
                                <>
                                    <AudioVisualizer
                                        visualizerRef={visualizerRef}
                                        isRecording={isRecording}
                                        isPaused={isPaused}
                                    />
                                    <RecordingTimer
                                        time={recordingTime}
                                        isRecording={isRecording}
                                        isPaused={isPaused}
                                    />
                                    <div className="flex items-center gap-4">
                                        <RecordingControls
                                            isRecording={isRecording}
                                            isPaused={isPaused}
                                            onStart={startRecording}
                                            onPause={pauseRecording}
                                            onResume={resumeRecording}
                                            onStop={stopRecording}
                                        />
                                    </div>
                                </>
                            ) : (
                                <AudioPlayer
                                    audioUrl={audioUrl}
                                    onReset={resetRecording}
                                />
                            )}
                        </div>
                    ) : (
                        <UploadTab
                            audioFile={audioFile}
                            onFileSelect={setAudioFile}
                            onError={setUploadError}
                        />
                    )}
                    {activeError && <p className="mt-2 text-sm text-red-500 text-center">{activeError}</p>}
                </div>

                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={activeTab === "record" ? (!recordedBlob || recordingTime < 120) : !audioFile}
                    className="w-full"
                >
                    Generate Notes {activeTab === "record" && recordingTime < 120 && "(Min 2m)"}
                </Button>
            </form>
        </Modal>
    );
}
