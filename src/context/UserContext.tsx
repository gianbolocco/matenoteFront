"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios, { AxiosInstance } from "axios";
import { useRouter } from "next/navigation";

// Define the User interface
export interface User {
    id: string;
    name: string;
    email: string;
    plan: "Free" | "Pro" | "Enterprise";
    //avatarUrl?: string;
}

// Define the Context State interface
interface UserContextType {
    user: User | null;
    isLoading: boolean;
    login: (token?: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (updates: Partial<User>) => void;
}

// Create the Context with undefined default
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider Component
export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Helper to get API URL
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/auth/session`, {
                withCredentials: true
            });
            setUser(response.data.user);
        } catch (error) {
            console.error("Failed to fetch user session", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (token?: string) => {
        // Token is legacy/optional now, we rely on cookies.
        // If a token is passed, we might ignore it or use it if the backend strict require it for non-cookie flows (unlikely given instructions).
        // For now, we just refresh the session.
        await fetchUser();
    };

    const logout = async () => {
        try {
            await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
        } catch (error) {
            console.error("Logout failed", error);
        }
        setUser(null);
        router.push("/login");
    };

    const updateUser = (updates: Partial<User>) => {
        if (!user) return;
        setUser({ ...user, ...updates });
        // Optionally sync with backend here
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
