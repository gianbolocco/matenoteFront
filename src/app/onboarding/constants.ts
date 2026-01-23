import {
    Briefcase, GraduationCap, Palette, User as UserIcon,
    BookOpen, Laptop, Rocket, School, UserCircle
} from "lucide-react";

export const PURPOSES = [
    { id: "Study", label: "Estudio", icon: GraduationCap, description: "Organizar apuntes e investigación" },
    { id: "Work", label: "Trabajo", icon: Briefcase, description: "Gestionar reuniones y proyectos" },
    { id: "Daily Life", label: "Vida Diaria", icon: UserIcon, description: "Diario personal y organización" },
    { id: "Creative", label: "Creativo", icon: Palette, description: "Capturar ideas e inspiración" },
];

export const INTRESTS_LIST = [
    "Tecnología", "Ciencia", "Negocios", "Arte y Diseño",
    "Salud y Fitness", "Psicología", "Historia", "Literatura",
    "Música", "Cine", "Programación", "Marketing", "Finanzas",
    "Educación", "Filosofía", "Desarrollo Personal"
];

export const COUNTRIES = [
    { value: "Argentina", label: "Argentina" },
    { value: "United States", label: "Estados Unidos" },
    { value: "Spain", label: "España" },
    { value: "Mexico", label: "México" },
    { value: "Colombia", label: "Colombia" },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Peru", label: "Perú" },
    { value: "Chile", label: "Chile" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "Paraguay", label: "Paraguay" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Other", label: "Otro" }
];

export const OCCUPATIONS = [
    { value: "Estudiante secundario", label: "Estudiante secundario", icon: School },
    { value: "Estudiante universitario", label: "Estudiante universitario", icon: GraduationCap },
    { value: "Autodidacta", label: "Autodidacta", icon: BookOpen },
    { value: "Profesional", label: "Profesional", icon: Briefcase },
    { value: "Emprendedor", label: "Emprendedor", icon: Rocket },
    { value: "Profesor", label: "Profesor", icon: UserCircle }
];
