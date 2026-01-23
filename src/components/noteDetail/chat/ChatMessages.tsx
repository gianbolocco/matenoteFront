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
                    <div className="w-48 h-48">
                        <img src="/matibot.svg" alt="MatiBot" className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-sm font-semibold text-violet-600 mb-1">
                        MatiBot
                    </h3>
                    <p className="text-xs text-gray-500 max-w-[200px]">
                        Preguntame lo que quieras sobre el contenido de esta nota.
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
                        className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-100 ${message.role === "user"
                            ? "bg-gray-900 text-white"
                            : "bg-white p-1"
                            }`}
                    >
                        {message.role === "user" ? (
                            <User className="w-5 h-5" />
                        ) : (
                            <img src="/matibot.svg" alt="MatiBot" className="w-full h-full object-contain" />
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
                    <div className="w-11 h-11 rounded-full bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
                        <img src="/matibot.svg" alt="MatiBot" className="w-full h-full object-contain" />
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
