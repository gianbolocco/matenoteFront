import { SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = "", label, error, options, placeholder, id, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        id={id}
                        className={`
                            w-full appearance-none bg-gray-50 border border-gray-200 
                            text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 
                            block p-3 pr-10 hover:bg-gray-100 transition-colors cursor-pointer outline-none
                            ${error ? "border-red-500" : ""}
                            ${className}
                        `}
                        {...props}
                    >
                        {placeholder && <option value="">{placeholder}</option>}
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </div>
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);

Select.displayName = "Select";
