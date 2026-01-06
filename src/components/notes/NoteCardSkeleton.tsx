export function NoteCardSkeleton() {
    return (
        <div className="flex flex-col h-[280px] bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-pulse">
            <div className="p-5 flex-1 space-y-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-lg shrink-0"></div>
                </div>

                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-4/6"></div>
                </div>
            </div>

            <div className="px-5 pb-5 mt-auto">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                    <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="h-3 w-24 bg-gray-200 rounded-full"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
