import { NoteSectionContentCode } from "@/types";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodeSectionProps {
    content: NoteSectionContentCode;
}

export function SectionCode({ content }: CodeSectionProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Simple syntax highlighting regex for demo purposes
    const highlightCode = (code: string) => {
        // Handle potentially escaped newlines from API
        const processedCode = code.replace(/\\n/g, '\n');

        const keywords = /\b(def|return|class|if|else|import|from|print|const|let|var|function|export|default)\b/g;
        const numbers = /\b\d+\b/g;
        const strings = /(['"])(?:(?=(\\?))\2.)*?\1/g;
        const comments = /#.*/g;

        // Note: This is a very basic tokenizer and order matters. 
        // Real syntax highlighting should use a parser/library.
        // We act on split text to avoid complex overlapping.

        // For simplicity in this "no-library" request, we just return the code string 
        // wrapped in colors if we matched a simple keyword, 
        // but robustly doing this with regex split components is tricky without a parser state.
        // Instead, let's just highlight keywords safely by splitting.

        return processedCode.split(/(\b(?:def|return|class|if|else|import|from|print|const|let|var|function|export|default)\b|(['"](?:(?=(\\?))\2.)*?\1)|#.*)/g).map((part, i) => {
            if (!part) return null;
            if (/^(def|return|class|if|else|import|from|print|const|let|var|function|export|default)$/.test(part)) {
                return <span key={i} className="text-pink-400 font-bold">{part}</span>;
            }
            if (/^(['"](?:(?=(\\?))\2.)*?\1)$/.test(part)) {
                return <span key={i} className="text-green-400">{part}</span>;
            }
            if (/^#.*/.test(part)) {
                return <span key={i} className="text-gray-500 italic">{part}</span>;
            }
            return part;
        });
    };

    return (
        <div className="my-4">
            <div className="bg-gray-900 rounded-xl overflow-hidden group">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                    <span className="text-xs font-mono text-gray-400 uppercase">{content.language || 'code'}</span>

                    <button
                        onClick={handleCopy}
                        className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-gray-700 flex items-center gap-1.5"
                    >
                        {copied ? (
                            <>
                                <Check className="w-3.5 h-3.5 text-green-400" />
                                <span className="text-xs font-medium text-green-400">Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium">Copy</span>
                            </>
                        )}
                    </button>
                </div>
                <div className="p-4 overflow-x-auto">
                    <pre className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">
                        <code>{highlightCode(content.code)}</code>
                    </pre>
                </div>
            </div>
            {content.explanation && (
                <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm leading-relaxed italic">
                    {content.explanation}
                </div>
            )}
        </div>
    );
}
