import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
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
        rounded-md
        border
        px-3
        py-2
        outline-none
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