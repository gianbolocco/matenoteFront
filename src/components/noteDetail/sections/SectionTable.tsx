import { NoteSectionContentTable } from "@/types";

interface TableSectionProps {
    content: NoteSectionContentTable;
}

export function SectionTable({ content }: TableSectionProps) {
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            {content.title && (
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-700 text-sm">{content.title}</h4>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                        <tr>
                            {content.columns.map((col, idx) => (
                                <th key={idx} scope="col" className="px-6 py-3 font-medium">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {content.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="bg-white hover:bg-gray-50/50 transition-colors">
                                {content.columns.map((col, cIdx) => (
                                    <td key={cIdx} className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap">
                                        {row[col]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
