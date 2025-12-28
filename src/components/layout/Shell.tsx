"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";

export function Shell({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
                {children}
            </main>
        </div>
    );
}
