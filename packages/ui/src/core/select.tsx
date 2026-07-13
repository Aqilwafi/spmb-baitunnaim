import type { SelectHTMLAttributes } from "react";
import type { MasterData } from "@bn/types";

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: MasterData[];
  placeholder?: string;
}

export function Select({
  options,
  placeholder,
  className = "",
  ...props
}: SelectProps) {
  return (
    <select
      className={`
        w-full
        appearance-none
        rounded-md
        border
        px-3
        py-2
        pr-10
        text-black
        cursor-pointer
        ${className}
      `}
      {...props}
    >
      {placeholder && (
        <option value="">
          {placeholder}
        </option>
      )}

      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}