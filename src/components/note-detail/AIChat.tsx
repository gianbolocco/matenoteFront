"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, X } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "ai";
    content: string;
}

interface AIChatProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AIChat({ isOpen, onClose }: AIChatProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "ai",
            content: "Hello! I'm ready to help you study this note. What would you like to know?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isThinking, isOpen]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsThinking(true);

        // Mock response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: "Based on the content, a linear function is defined as f(x) = mx + b. The graph is always a straight line.",
            };
            setMessages((prev) => [...prev, aiMsg]);
            setIsThinking(false);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-y-4 right-4 w-96 bg-white rounded-2xl shadow-2xl border border-border flex flex-col z-50 animate-in slide-in-from-right-10 duration-300">

            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-gray-50/50 rounded-t-2xl">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                        <Bot className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">Study Assistant</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            Online
                        </p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-muted-foreground">
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""
                            }`}
                    >
                        {msg.role === "ai" && (
                            <div className="w-6 h-6 rounded-full bg-white border border-border flex items-center justify-center shrink-0 mt-1">
                                <Sparkles className="w-3 h-3 text-primary" />
                            </div>
                        )}
                        <div
                            className={`max-w-[85%] px-4 py-2.5 text-sm shadow-sm ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
                                    : "bg-white border border-border text-foreground rounded-2xl rounded-tl-sm"
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}

                {isThinking && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground ml-9">
                        <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                        </div>
                        Thinking...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-border rounded-b-2xl">
                <form onSubmit={handleSend} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question..."
                        autoFocus
                        className="w-full pl-4 pr-12 py-3 rounded-xl border border-border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isThinking}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}
