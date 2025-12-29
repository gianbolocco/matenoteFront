import { SendHorizontal, Loader2 } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
    onSend: (message: string) => void;
    isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !isLoading) {
            onSend(message);
            setMessage("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
            <div className="relative">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask something about this note..."
                    className="w-full pl-4 pr-12 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all outline-none"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={!message.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white text-blue-600 rounded-lg shadow-sm hover:shadow-md hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <SendHorizontal className="w-4 h-4" />
                    )}
                </button>
            </div>
        </form>
    );
}
