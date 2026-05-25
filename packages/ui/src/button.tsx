import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger"; // Menambahkan pilihan variant
}

export function Button({
  children,
  className = "",
  variant = "primary", // Default-nya primary
  ...props
}: ButtonProps) {
  
  // Menentukan warna berdasarkan variant
  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-500 hover:bg-red-700 text-white",
  };

  return (
    <button
      className={`px-6 py-3 rounded-2xl shadow transition cursor-pointer ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}