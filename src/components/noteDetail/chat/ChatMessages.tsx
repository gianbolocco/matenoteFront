import { Bot, User } from "lucide-react";
import { ChatMessage } from "@/types";

interface ChatMessagesProps {
    messages: ChatMessage[];
    isLoading?: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4">
                        <Bot className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        AI Assistant
                    </h3>
                    <p className="text-xs text-gray-500 max-w-[200px]">
                        Ask any questions about the content of this note.
                    </p>
                </div>
            )}

            {messages.map((message, index) => (
                <div
                    key={message.timestamp || index}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""
                        }`}
                >
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === "user"
                            ? "bg-gray-900 text-white"
                            : "bg-blue-100 text-blue-600"
                            }`}
                    >
                        {message.role === "user" ? (
                            <User className="w-4 h-4" />
                        ) : (
                            <Bot className="w-4 h-4" />
                        )}
                    </div>

                    <div
                        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${message.role === "user"
                            ? "bg-gray-900 text-white rounded-tr-sm"
                            : "bg-white border border-gray-100 shadow-sm text-gray-700 rounded-tl-sm"
                            }`}
                    >
                        {message.content}
                    </div>
                </div>
            ))}

            {isLoading && (
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-tl-sm">
                        <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
