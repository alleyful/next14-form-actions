"use client";

import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "gradient";
  size?: "default" | "icon";
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "default",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-gray-800 text-gray-100 hover:bg-gray-700",
      ghost: "hover:bg-gray-800 text-gray-400",
      gradient:
        "bg-gradient-to-r from-[var(--tt-gradient-start)] via-[var(--tt-gradient-middle)] to-[var(--tt-gradient-end)] text-white hover:opacity-90",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      icon: "h-10 w-10",
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
