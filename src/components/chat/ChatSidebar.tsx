import { useState } from "react";
import { MessageSquare, X, ChevronRight, ChevronLeft } from "lucide-react";
import { ChatMessages, Message } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useUser } from "@/context/UserContext";

interface ChatSidebarProps {
    noteId: string;
}

export function ChatSidebar({ noteId }: ChatSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async (text: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: text,
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // Placeholder for API call
            // const response = await api.post(...)

            // Simulating response for now
            setTimeout(() => {
                const aiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: "This feature is coming soon! I'll be able to answer questions about your note.",
                };
                setMessages((prev) => [...prev, aiMessage]);
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button (Fixed) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-white border border-gray-200 shadow-lg p-3 rounded-l-xl transition-all duration-300 hover:bg-gray-50 group ${isOpen ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
                    }`}
                title="Open Chat"
            >
                <div className="relative">
                    <MessageSquare className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                </div>
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 right-0 z-50 w-full md:w-[400px] bg-white border-l border-gray-200 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Note Assistant</h3>
                            <p className="text-xs text-gray-500 font-medium">Ask questions about this note</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages Area */}
                <ChatMessages messages={messages} isLoading={isLoading} />

                {/* Input Area */}
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
            </aside>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
