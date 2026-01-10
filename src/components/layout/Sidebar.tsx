"use client";

import { User, LogOut, LogIn, PanelLeft, Home, Timer, Folder, X, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
    isMobileOpen: boolean;
    setIsMobileOpen: (value: boolean) => void;
}

export function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }: SidebarProps) {
    const pathname = usePathname();
    const { user, login, logout } = useUser();

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    const navItems = [
        { name: "Home", href: "/home", icon: Home },
        { name: "Folders", href: "/folders", icon: Folder },
        { name: "Search", href: "/search", icon: Search },
        { name: "My Profile", href: "/profile", icon: User },
        { name: "Focus Timer", href: "/pomodoro", icon: Timer },
    ];

    return (
        <aside
            className={`
                fixed inset-y-0 left-0 z-50 h-full bg-sidebar border-r border-sidebar-border
                transition-all duration-300 ease-in-out flex flex-col
                md:relative md:translate-x-0
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
                ${isCollapsed ? "md:w-16" : "md:w-64 md:w-[16rem]"}
                w-64
            `}
        >
            {/* Header / Toggle */}
            <div className="flex items-center justify-between p-4 h-16 border-b border-sidebar-border shrink-0">
                <Link href="/" className="flex items-center gap-2 cursor-pointer">
                    <img src="/logo.png" alt="Matenote Logo" className="w-8 h-8 rounded-lg object-cover" />
                    {(!isCollapsed || (isMobileOpen && window.innerWidth < 768)) && (
                        <span className="font-semibold text-lg tracking-tight md:block hidden">Matenote</span>
                    )}
                    <span className="font-semibold text-lg tracking-tight md:hidden">Matenote</span>
                </Link>

                {/* Desktop Collapse Button */}
                <button
                    onClick={toggleSidebar}
                    className="hidden md:block cursor-pointer p-1.5 rounded-md hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors ml-auto"
                    aria-label="Toggle Sidebar"
                >
                    <PanelLeft className="w-5 h-5" />
                </button>

                {/* Mobile Close Button */}
                <button
                    onClick={() => setIsMobileOpen(false)}
                    className="md:hidden p-1.5 rounded-md hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors ml-auto"
                    aria-label="Close Sidebar"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 flex flex-col gap-1 px-3 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors group
                                ${isActive ? "bg-gray-100 text-primary font-medium" : "text-muted-foreground hover:bg-gray-50 hover:text-primary"}
                                ${isCollapsed ? "md:justify-center md:px-2" : ""}
                            `}
                        >
                            <item.icon className="shrink-0 w-5 h-5" />
                            <span className={`text-sm ${isCollapsed ? "md:hidden" : "block"}`}>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / User Profile */}
            <div className="border-t border-sidebar-border p-3 shrink-0">
                {user ? (
                    <div className={`flex items-center gap-3 ${isCollapsed ? "md:justify-center" : "px-2"}`}>
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-border flex items-center justify-center shrink-0 overflow-hidden">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-4 h-4 text-muted-foreground" />
                            )}
                        </div>
                        <div className={`flex-1 overflow-hidden min-w-0 ${isCollapsed ? "md:hidden" : "block"}`}>
                            <p className="text-sm font-medium truncate text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.plan} Plan</p>
                        </div>
                        <button
                            onClick={logout}
                            className={`text-muted-foreground hover:text-red-600 transition-colors ml-1 cursor-pointer ${isCollapsed ? "md:hidden" : "block"}`}
                            title="Logout"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className={`flex items-center justify-center ${isCollapsed ? "" : "px-2 py-1"}`}>
                        {(!isCollapsed || isMobileOpen) ? (
                            <Link href="/login" className={`text-sm font-medium text-primary hover:underline ${isCollapsed ? "md:hidden" : "block"}`}>
                                Log In
                            </Link>
                        ) : (
                            <Link href="/login" title="Log In" className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 hidden md:flex">
                                <LogIn className="w-4 h-4 rotate-180" />
                            </Link>
                        )}
                        {/* Mobile Login Icon if needed, or just keep text */}
                    </div>
                )}
            </div>
        </aside>
    );
}
