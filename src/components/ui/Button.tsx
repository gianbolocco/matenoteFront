import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", children, isLoading, variant = "primary", size = "md", disabled, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all focus:outline-none focus:ring-4 disabled:opacity-70 disabled:cursor-not-allowed";

        const variants = {
            primary: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900/20",
            secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-200",
            ghost: "bg-transparent text-gray-600 hover:bg-gray-50 focus:ring-gray-100",
            danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-100"
        };

        const sizes = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-3 text-base",
            lg: "px-6 py-4 text-lg"
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                {...props}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        <span>Processing...</span>
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = "Button";
