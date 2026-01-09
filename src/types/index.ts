export interface User {
    id: string;
    name: string;
    email: string;
    plan: string;
    avatar?: string;
    provider?: string;
    createDate?: string;
    interests: string[];
    country: string;
    occupation: string;
    usagePurpose: string;
    age: number;
}

export type SectionType = "TEXT" | "LIST" | "TABLE" | "CODE";

export interface NoteSectionContentText {
    text: string;
    highlights?: string[];
}

export interface NoteSectionContentList {
    style: "default" | "mantra";
    items: string[];
}

export interface NoteSectionContentTable {
    title?: string;
    columns: string[];
    rows: Array<Record<string, string>>;
}

export interface NoteSectionContentCode {
    language?: string;
    code: string;
    explanation?: string;
}

export type NoteSectionContent =
    | NoteSectionContentText
    | NoteSectionContentList
    | NoteSectionContentTable
    | NoteSectionContentCode;

export interface NoteSection {
    type: SectionType;
    subtitle?: string;
    content: NoteSectionContent;
}

export interface NoteUnit {
    title: string;
    sections: NoteSection[];
}

export interface Note {
    id: string;
    title: string;
    summary: string;
    units?: NoteUnit[];
    // Keeping this for backward compatibility if needed during migration, 
    // but ultimately 'units' replaces 'sections'.
    sections?: any[];
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
