import { NoteSection, NoteSectionContentText, NoteSectionContentList, NoteSectionContentTable, NoteSectionContentCode } from "@/types";
import { SectionText } from "./sections/SectionText";
import { SectionList } from "./sections/SectionList";
import { SectionTable } from "./sections/SectionTable";
import { SectionCode } from "./sections/SectionCode";

interface NoteSectionsProps {
    sections: NoteSection[];
}

export function NoteSections({ sections }: NoteSectionsProps) {
    return (
        <div className="space-y-12">
            {sections.map((section, index) => (
                <div key={index} className="flex gap-5">
                    {/* Number Badge */}
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm font-semibold text-gray-900 mt-1">
                        {index + 1}
                    </div>

                    <div className="space-y-2 w-full">
                        {section.subtitle && (
                            <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                {section.subtitle}
                            </h3>
                        )}

                        <div className="pl-0">
                            {section.type === 'TEXT' && (
                                <SectionText content={section.content as NoteSectionContentText} />
                            )}
                            {section.type === 'LIST' && (
                                <SectionList content={section.content as NoteSectionContentList} />
                            )}
                            {section.type === 'TABLE' && (
                                <SectionTable content={section.content as NoteSectionContentTable} />
                            )}
                            {section.type === 'CODE' && (
                                <SectionCode content={section.content as NoteSectionContentCode} />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
