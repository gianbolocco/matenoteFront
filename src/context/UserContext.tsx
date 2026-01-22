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
        // Load from local storage for instant UI state
        const storedUser = localStorage.getItem('matenote_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from local storage");
                localStorage.removeItem('matenote_user');
            }
        }
        fetchUser();
    }, []);

    const fetchUser = async () => {
        // Only set loading if we don't have a user (optimistic)
        // If we have a stored user, we leave isLoading false mostly or handle it? 
        // Actually, existing code sets isLoading(true). 
        // If we found a user in LS, we probably want to skip generic loading spinner if possible, 
        // but for safety let's keep it simple or maybe set it to false initially if found?
        // Let's follow the standard pattern: background revalidation.
        // If we set user from LS, we might not want to set isLoading(true) to avoid flicker if we want "instant" feel.
        // However, the original code sets isLoading(true) at start of fetchUser.
        // Let's modify fetchUser to not reset isLoading if we have a user, or handle it gracefully.
        // But for now, let's just save to LS.

        // Actually, to fully support "persistence" request:
        // We want to avoid the "not logged in" flash. 
        // If we set user from LS, the `isLoading` state in provider should probably reflect that we "have" a user?
        // But `isLoading` determines if we render children in some layouts.

        // Let's just hook into the existing flow.

        // We'll let the initial useEffect handle the LS load.
        // We won't block UI with isLoading if we have LS data? 
        // The AppLayout checks `if (isLoading) return <Spinner>`
        // So if we set User from LS, we should also set isLoading false?
        // But then we fire fetchUser which sets isLoading(true).

        // Let's just modify fetchUser to not force isLoading=true if we already have a user?
        // OR better:

        try {
            const response = await axios.get(`${API_URL}/auth/session`, {
                withCredentials: true
            });
            setUser(response.data.user);
            localStorage.setItem('matenote_user', JSON.stringify(response.data.user));
        } catch (error: any) {
            // If 401/403, it just means not logged in.
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                // Expected behavior when not logged in
                setUser(null);
                localStorage.removeItem('matenote_user');
            } else {
                console.error("Failed to fetch user session:", {
                    message: error.message,
                    status: error.response?.status,
                    code: error.code
                });

                // If it's a generic Network Error, it might be the Mixed Content issue
                if (error.message === "Network Error") {
                    console.error("POSSIBLE CAUSE: Mixed Content Error. Check if you are calling HTTP endpoint from HTTPS site.");
                }

                setUser(null);
                localStorage.removeItem('matenote_user');
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
        localStorage.removeItem('matenote_user');
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
            const newOptimisticUser = { ...user, ...updates };
            setUser(newOptimisticUser);
            localStorage.setItem('matenote_user', JSON.stringify(newOptimisticUser));

            // Call API
            const updatedUser = await userService.updateUser(user.id, updates);

            // Merge response to ensure data consistency
            const finalUser = { ...updatedUser, ...updates };
            setUser(finalUser);
            localStorage.setItem('matenote_user', JSON.stringify(finalUser));
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
