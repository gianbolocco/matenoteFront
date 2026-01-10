import { NoteSectionContentCode } from "@/types";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeSectionProps {
    content: NoteSectionContentCode;
}

export function SectionCode({ content }: CodeSectionProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(cleanCode(content.code));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const cleanCode = (code: string) => {
        if (!code) return "";
        // Remove markdown code block markers (captured groups for language are ignored)
        let cleaned = code.replace(/^```[a-z]*\n?/i, '').replace(/```$/, '');
        // Handle potentially double-escaped newlines which can happen in raw JSON transport
        cleaned = cleaned.replace(/\\n/g, '\n');
        return cleaned;
    };

    return (
        <div className="my-4">
            <div className="bg-[#1d1f21] rounded-xl overflow-hidden group border border-gray-800">
                <div className="bg-[#2d2f31] px-4 py-2 flex items-center justify-between border-b border-gray-700">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider font-bold">
                        {content.language || 'code'}
                    </span>

                    <button
                        onClick={handleCopy}
                        className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-md hover:bg-gray-700 flex items-center gap-2 group/btn"
                    >
                        {copied ? (
                            <>
                                <Check className="w-3.5 h-3.5 text-green-400" />
                                <span className="text-xs font-medium text-green-400">Copied</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-3.5 h-3.5 group-hover/btn:text-white" />
                                <span className="text-xs font-medium group-hover/btn:text-white">Copy</span>
                            </>
                        )}
                    </button>
                </div>
                <div className="relative">
                    <SyntaxHighlighter
                        language={(content.language || 'text').toLowerCase()}
                        style={atomDark}
                        customStyle={{
                            margin: 0,
                            padding: '1.5rem',
                            background: 'transparent',
                            fontSize: '0.875rem',
                            lineHeight: '1.6',
                        }}
                        wrapLines={true}
                        showLineNumbers={false}
                    >
                        {cleanCode(content.code)}
                    </SyntaxHighlighter>
                </div>
            </div>
            {content.explanation && (
                <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-sm leading-relaxed italic flex items-start gap-3">
                    <div className="w-1 h-full min-h-[1.2em] w-[3px] bg-blue-400 rounded-full mt-0.5 shrink-0" />
                    <p>{content.explanation}</p>
                </div>
            )}
        </div>
    );
}
