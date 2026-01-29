"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { StreakNotification } from "@/components/ui/StreakNotification";

interface NotificationContextType {
    showStreakNotification: (message?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);
    const [customMessage, setCustomMessage] = useState<string | undefined>(undefined);

    const showStreakNotification = useCallback((message?: string) => {
        setCustomMessage(message);
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 5000);
    }, []);

    return (
        <NotificationContext.Provider value={{ showStreakNotification }}>
            {children}
            <StreakNotification
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                message={customMessage}
            />
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
}
