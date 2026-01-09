import { NoteSectionContentText } from "@/types";

interface TextSectionProps {
    content: NoteSectionContentText;
}

export function SectionText({ content }: TextSectionProps) {
    const renderContentWithHighlights = (text: string, highlights?: string[]) => {
        if (!highlights || highlights.length === 0) return text;

        const escapeRegExp = (string: string) => {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        };

        const pattern = new RegExp(`(${highlights.map(escapeRegExp).join('|')})`, 'gi');
        const parts = text.split(pattern);

        return parts.map((part, index) => {
            const isHighlight = highlights.some(h => h.toLowerCase() === part.toLowerCase());
            if (isHighlight) {
                return (
                    <span
                        key={index}
                        className="bg-yellow-200/60 px-0.5 rounded text-gray-900 font-medium"
                    >
                        {part}
                    </span>
                );
            }
            return part;
        });
    };

    return (
        <div className="text-gray-600 leading-relaxed text-base">
            {renderContentWithHighlights(content.text, content.highlights)}
        </div>
    );
}
