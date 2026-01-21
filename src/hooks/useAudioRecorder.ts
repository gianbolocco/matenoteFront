import { useState, useRef, useEffect } from "react";

interface UseAudioRecorderProps {
    onStop?: (blob: Blob) => void;
}

export function useAudioRecorder({ onStop }: UseAudioRecorderProps = {}) {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [error, setError] = useState<string>("");

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const visualizerRef = useRef<HTMLDivElement>(null);

    // Timer Logic - Max 1 hour
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRecording && !isPaused) {
            interval = setInterval(() => {
                setRecordingTime(prev => {
                    const newTime = prev + 1;
                    if (newTime >= 3600) { // Max 1 hour
                        stopRecording();
                    }
                    return newTime;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRecording, isPaused]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            cleanupAudio();
        };
    }, []);

    const cleanupAudio = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }
    };

    const updateVisualizer = () => {
        if (!analyserRef.current || !visualizerRef.current) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const animate = () => {
            if (!analyserRef.current || !visualizerRef.current) return;

            animationFrameRef.current = requestAnimationFrame(animate);
            analyserRef.current.getByteFrequencyData(dataArray);

            // Calculate average volume
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
            }
            const average = sum / bufferLength;

            // Map volume to scale and opacity
            const scale = 1 + (average / 255) * 1.5;
            const opacity = 0.3 + (average / 255) * 0.7;

            visualizerRef.current.style.transform = `scale(${scale})`;
            visualizerRef.current.style.opacity = opacity.toString();
        };

        animate();
    };

    const playStartSound = () => {
        try {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.type = 'sine';
            // Minimalist "ding"
            oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);

            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.3);

            setTimeout(() => {
                if (audioCtx.state !== 'closed') audioCtx.close();
            }, 350);
        } catch (e) {
            console.error("Failed to play start sound", e);
        }
    };

    const startRecording = async () => {
        try {
            playStartSound();
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Setup MediaRecorder
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                setRecordedBlob(blob);
                setAudioUrl(URL.createObjectURL(blob));

                stream.getTracks().forEach(track => track.stop());
                cleanupAudio();

                if (onStop) onStop(blob);
            };

            // Setup Visualizer
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            audioContextRef.current = audioCtx;
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;
            analyserRef.current = analyser;

            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);

            mediaRecorder.start();
            setIsRecording(true);
            setIsPaused(false);
            setError("");

            updateVisualizer();

        } catch (err) {
            console.error(err);
            setError("Microphone access denied or not available.");
        }
    };

    const pauseRecording = () => {
        if (mediaRecorderRef.current && isRecording && !isPaused) {
            mediaRecorderRef.current.pause();
            setIsPaused(true);
            if (audioContextRef.current) audioContextRef.current.suspend();
            if (visualizerRef.current) {
                // Reset visualizer visual state
                visualizerRef.current.style.transform = "scale(1)";
                visualizerRef.current.style.opacity = "0.3";
            }
        }
    };

    const resumeRecording = () => {
        if (mediaRecorderRef.current && isRecording && isPaused) {
            mediaRecorderRef.current.resume();
            setIsPaused(false);
            if (audioContextRef.current) audioContextRef.current.resume();
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsPaused(false);
        }
    };

    const resetRecording = () => {
        cleanupAudio();
        setRecordedBlob(null);
        setAudioUrl(null);
        setRecordingTime(0);
        chunksRef.current = [];
        setIsRecording(false);
        setIsPaused(false);
    };

    return {
        isRecording,
        isPaused,
        recordingTime,
        recordedBlob,
        audioUrl,
        error,
        visualizerRef,
        startRecording,
        pauseRecording,
        resumeRecording,
        stopRecording,
        resetRecording
    };
}
