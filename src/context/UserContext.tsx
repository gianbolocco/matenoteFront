"use client";
import { User } from "@/types";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios, { AxiosInstance } from "axios";
import { useRouter, usePathname } from "next/navigation";
import * as userService from "@/services/userService";


// Define the Context State interface
interface UserContextType {
    user: User | null;
    isLoading: boolean;
    login: (token?: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (updates: Partial<User>) => Promise<void>;
}

// Create the Context with undefined default
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider Component
export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Helper to get API URL
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
        } catch (error: any) {
            // If 401/403, it just means not logged in.
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                setUser(null);
            } else {
                console.error("Failed to fetch user session", error);
                setUser(null);
            }
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

    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && user) {
            // Check if onboarding is needed
            // Logic: If critical profile data is missing, redirect to onboarding.
            // We check for 'country' and 'usagePurpose' as indicators of completion.
            const needsOnboarding = !user.country || !user.usagePurpose || !user.age;

            if (needsOnboarding && pathname !== "/onboarding") {
                router.push("/onboarding");
            }
        }
    }, [user, isLoading, pathname, router]);

    const updateUser = async (updates: Partial<User>) => {
        if (!user) return;
        try {
            // Optimistic update
            setUser({ ...user, ...updates });

            // Call API
            const updatedUser = await userService.updateUser(user.id, updates);

            // Merge response to ensure data consistency
            setUser({ ...updatedUser, ...updates });
        } catch (error) {
            console.error("Failed to update user", error);
            // Revert on failure (could refetch, but for now just log)
            fetchUser();
        }
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
