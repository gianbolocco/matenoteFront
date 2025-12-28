"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the User interface
export interface User {
    id: string;
    name: string;
    email: string;
    plan: "Free" | "Pro" | "Enterprise";
    avatarUrl?: string;
    settings: {
        theme: "light" | "dark";
        notifications: boolean;
    };
}

// Define the Context State interface
interface UserContextType {
    user: User | null;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
}

// Create the Context with undefined default
const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock User Data
const MOCK_USER: User = {
    id: "69509b8a8af4b913268882d3",
    name: "Gianlucca",
    email: "gianlucca@example.com",
    plan: "Pro",
    settings: {
        theme: "light",
        notifications: true,
    },
};

// Provider Component
export function UserProvider({ children }: { children: ReactNode }) {
    // Start with null to simulate "not logged in" initially, 
    // or MOCK_USER to simulate "persisted session". 
    // Let's use MOCK_USER by default for this demos.
    const [user, setUser] = useState<User | null>(MOCK_USER);
    const [isLoading, setIsLoading] = useState(false);

    const login = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setUser(MOCK_USER);
            setIsLoading(false);
        }, 500);
    };

    const logout = () => {
        setUser(null);
    };

    const updateUser = (updates: Partial<User>) => {
        if (!user) return;
        setUser({ ...user, ...updates });
    };

    return (
        <UserContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}

// Custom Hook for consumption
export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
