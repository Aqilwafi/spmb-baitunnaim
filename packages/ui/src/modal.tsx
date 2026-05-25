import type { ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  children: ReactNode;
}

export function Modal({
  open,
  children,
}: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative rounded-lg bg-white p-6">
        {children}
      </div>
    </div>
  );
}