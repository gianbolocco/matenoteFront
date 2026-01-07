export interface User {
    id: string;
    name: string;
    email: string;
    plan: string;
    avatar?: string;
    provider?: string;
}

export interface NoteSection {
    subtitle: string;
    content: string;
    highlights: string[];
}

export interface Note {
    id: string;
    title: string;
    summary: string;
    sections?: NoteSection[];
    source: string; // Filename or URL
    sourceType: "pdf" | "audio" | "youtube" | "text";
    userId: string;
    createDate: string; // ISO Date string
    _id?: string;
}

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
    timestamp: string;
}
