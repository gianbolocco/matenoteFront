import { Search } from "lucide-react";

export type FilterType = "all" | "pdf" | "audio" | "youtube";

interface NotesToolbarProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export function NotesToolbar({ searchQuery, onSearchChange, activeFilter, onFilterChange }: NotesToolbarProps) {
    return (
        <div className="py-2 flex flex-col md:flex-row gap-5 items-center justify-between">
            {/* Search Bar - Cleaner Look */}
            <div className="relative w-full md:max-w-lg group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 border-none rounded-xl leading-5 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-900/5 transition-all duration-200 ease-out font-medium text-sm"
                    placeholder="Search library..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {(["all", "pdf", "video", "audio"] as const).map((type) => {
                    const value = type === "video" ? "youtube" : type;
                    const label = type === "all" ? "All Notes" : type.charAt(0).toUpperCase() + type.slice(1);

                    return (
                        <button
                            key={type}
                            onClick={() => onFilterChange(value as FilterType)}
                            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap border ${activeFilter === value
                                ? "bg-gray-900 text-white"
                                : "bg-transparent border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
