import { NoteSectionContentList } from "@/types";

interface ListSectionProps {
    content: NoteSectionContentList;
}

export function SectionList({ content }: ListSectionProps) {
    if (content.style === "mantra") {
        return (
            <div className="pl-6 border-l-4 border-violet-400 py-1">
                <ul className="space-y-4">
                    {content.items.map((item, idx) => (
                        <li key={idx} className="text-gray-800 font-medium text-lg italic leading-relaxed">
                            "{item}"
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <ul className="space-y-2">
            {content.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                    <div className="flex-shrink-0 mt-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    </div>
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                </li>
            ))}
        </ul>
    );
}
