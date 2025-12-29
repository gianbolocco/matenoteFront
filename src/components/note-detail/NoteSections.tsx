import { NoteSection } from "@/types";

interface NoteSectionsProps {
    sections: NoteSection[];
}

export function NoteSections({ sections }: NoteSectionsProps) {
    const renderContentWithHighlights = (content: string, highlights: string[]) => {
        if (!highlights || highlights.length === 0) return content;

        // Escape special chars for regex
        const escapeRegExp = (string: string) => {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        };

        // Create a regex to match all highlights (case insensitive)
        const pattern = new RegExp(`(${highlights.map(escapeRegExp).join('|')})`, 'gi');

        // Split content by the pattern, keeping delimiters
        const parts = content.split(pattern);

        return parts.map((part, index) => {
            // Check if this part matches one of the highlights
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
        <div className="space-y-12">
            {sections.map((section, index) => (
                <div key={index} className="flex gap-5">
                    {/* Number Badge */}
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm font-semibold text-gray-900 mt-1">
                        {index + 1}
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                            {section.subtitle}
                        </h3>

                        <div className="text-gray-600 leading-relaxed text-base">
                            {renderContentWithHighlights(section.content, section.highlights)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
