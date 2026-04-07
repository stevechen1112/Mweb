"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export const Button: React.FC<ButtonProps> = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyle = "px-6 py-2 rounded-md font-bold transition-colors duration-300";
  const styles = {
    primary: "bg-primary text-white hover:bg-red-700",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
  };

  return (
    <button
      className={`${baseStyle} ${styles[variant]} ${className} hover:scale-105 active:scale-95 transition-transform`}
      {...props}
    >
      {children}
    </button>
  );
};
