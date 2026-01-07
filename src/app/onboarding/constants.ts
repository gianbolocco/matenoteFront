import { Briefcase, GraduationCap, Palette, User as UserIcon } from "lucide-react";

export const PURPOSES = [
    { id: "Study", label: "Study", icon: GraduationCap, description: "Organize study notes & research" },
    { id: "Work", label: "Work", icon: Briefcase, description: "Manage meetings & projects" },
    { id: "Daily Life", label: "Daily Life", icon: UserIcon, description: "Journaling & life organization" },
    { id: "Creative", label: "Creative", icon: Palette, description: "Capture ideas & inspiration" },
];

export const INTRESTS_LIST = [
    "Technology", "Science", "Business", "Art & Design",
    "Health & Fitness", "Psychology", "History", "Literature",
    "Music", "Cinema", "Coding", "Marketing", "Finance",
    "Education", "Philosophy", "Self Improvement"
];

export const COUNTRIES = [
    { value: "Argentina", label: "Argentina" },
    { value: "United States", label: "United States" },
    { value: "Spain", label: "Spain" },
    { value: "Mexico", label: "Mexico" },
    { value: "Colombia", label: "Colombia" },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Other", label: "Other" }
];
