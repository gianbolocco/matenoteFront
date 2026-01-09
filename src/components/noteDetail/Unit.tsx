
import { NoteUnit, NoteSectionContentText, NoteSectionContentList, NoteSectionContentTable, NoteSectionContentCode } from "@/types";
import { SectionText } from "./sections/SectionText"
import { SectionList } from "./sections/SectionList"
import { SectionTable } from "./sections/SectionTable"
import { SectionCode } from "./sections/SectionCode"

interface UnitProps {
    unit: NoteUnit;
    index: number;
}

export function Unit({ unit, index }: UnitProps) {
    return (
        <div className="py-8 border-b border-gray-200 last:border-0 md:px-2">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-50 rounded-full text-lg font-bold text-indigo-600 border border-indigo-100">
                    {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                    {unit.title}
                </h3>
            </div>

            <div className="space-y-8 pl-2 md:pl-14">
                {unit.sections.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-3">
                        {section.subtitle && (
                            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                                {section.subtitle}
                            </h4>
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
                ))}
            </div>
        </div>
    );
}
