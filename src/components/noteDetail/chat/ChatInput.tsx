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
                    maxLength={300}
                    placeholder="Escribí un mensaje..."
                    className="w-full pl-4 pr-24 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-violet-100 focus:bg-white transition-all outline-none"
                    disabled={isLoading}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className={`text-[10px] font-medium transition-colors text-gray-400`}>
                        {message.length}/300
                    </span>
                    <button
                        type="submit"
                        disabled={!message.trim() || isLoading}
                        className="p-1.5 bg-white text-violet-600 rounded-lg shadow-sm hover:shadow-md hover:bg-violet-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <SendHorizontal className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
