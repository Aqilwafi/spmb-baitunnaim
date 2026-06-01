// packages/ui/src/Modal.tsx
"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  open: boolean;
  children: ReactNode;
}

export function Modal({ open, children }: ModalProps) {
  useEffect(() => {
    // Mencegah background scroll saat modal terbuka
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  if (!open) return null;

  // Gunakan Portal agar modal "keluar" dari hirarki DOM form
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative rounded-2xl bg-white p-8 shadow-2xl max-w-lg w-full m-4">
        {children}
      </div>
    </div>,
    document.body
  );
}