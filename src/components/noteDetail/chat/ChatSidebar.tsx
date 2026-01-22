import { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useUser } from "@/context/UserContext";
import { ChatMessage } from "@/types";
import { getChatHistory, sendMessage } from "@/services/chatService";

interface ChatSidebarProps {
    noteId: string;
}

export function ChatSidebar({ noteId }: ChatSidebarProps) {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadHistory = async () => {
            if (isOpen && user && noteId) {
                try {
                    setError(null);
                    const history = await getChatHistory(noteId, user.id);
                    setMessages(history);
                } catch (error) {
                    console.error("Failed to load chat history:", error);
                    setError("Failed to load chat history. Please try again later.");
                }
            }
        };
        loadHistory();
    }, [isOpen, user, noteId]);

    const handleSendMessage = async (text: string) => {
        if (!user) return;

        // Optimistically add user message
        const userMessage: ChatMessage = {
            role: "user",
            content: text,
            timestamp: new Date().toISOString()
        };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            const newMessages = await sendMessage(noteId, user.id, text);
            // The API might return the whole history or just the new pair.
            // To be safe and fix the "always first message" bug, we should take the *last* assistant message.
            const assistantMessages = newMessages.filter(m => m.role === "assistant");
            const lastAssistantMessage = assistantMessages[assistantMessages.length - 1];

            if (lastAssistantMessage) {
                setMessages((prev) => [...prev, lastAssistantMessage]);
            }
        } catch (error: any) {
            console.error(error);
            const errorMessage = error.response?.status === 404
                ? "Chat service unavailable or note not found."
                : "Failed to send message. Please try again.";
            setError(errorMessage);

            // Remove the optimistic message on error to verify user knows it failed? 
            // Or keep it and show error. Let's keep it but show error.
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button (Fixed) */}
            {/* Floating Action Button (Bottom Right) */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 z-40 p-4 bg-black text-white rounded-full shadow-xl hover:bg-gray-800 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group ${isOpen ? "translate-y-20 opacity-0" : "translate-y-0 opacity-100"
                    }`}
                title="Open Assistant"
            >
                <div className="relative">
                    <MessageSquare className="w-7 h-7" />
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-violet-400 border-2 border-black"></span>
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
                        <div className="p-2 bg-violet-100 text-violet-600 rounded-lg">
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
                <div className="flex-1 overflow-hidden flex flex-col relative">
                    {error && (
                        <div className="absolute top-0 left-0 right-0 z-10 p-3 bg-red-50 border-b border-red-100 text-red-600 text-sm font-medium flex items-center justify-center text-center">
                            {error}
                        </div>
                    )}
                    <ChatMessages messages={messages} isLoading={isLoading} />
                </div>

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
