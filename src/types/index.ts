export interface User {
    id: string;
    name: string;
    email: string;
    plan: string;
    avatar?: string;
    provider?: string;
    createDate?: string;
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

export interface Folder {
    _id?: string;
    id?: string; // Add optional id to be safe, or mandatory if we are sure
    title: string;
    color: string;
    userId: string;
    notes: Note[];
    createDate?: string;
}
