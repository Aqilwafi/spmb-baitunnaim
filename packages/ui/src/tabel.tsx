import type { HTMLAttributes } from "react";

export function Table({
  className = "",
  ...props
}: HTMLAttributes<HTMLTableElement>) {
  return (
    <table
      className={`w-full border-collapse ${className}`}
      {...props}
    />
  );
}

export function TableHead(
  props: HTMLAttributes<HTMLTableSectionElement>,
) {
  return <thead {...props} />;
}

export function TableBody(
  props: HTMLAttributes<HTMLTableSectionElement>,
) {
  return <tbody {...props} />;
}

export function TableRow(
  props: HTMLAttributes<HTMLTableRowElement>,
) {
  return <tr {...props} />;
}

export function TableHeader(
  props: HTMLAttributes<HTMLTableCellElement>,
) {
  return <th {...props} />;
}

export function TableCell(
  props: HTMLAttributes<HTMLTableCellElement>,
) {
  return <td {...props} />;
}