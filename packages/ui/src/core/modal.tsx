"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children?: ReactNode;
  className?: string; // Tambahkan prop className opsional di sini
}

export function Modal({ open, onClose, children, className = "max-w-lg" }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Konten modal dengan class dinamis */}
      <div className={`relative rounded-2xl bg-white p-6 md:p-8 shadow-2xl w-full m-4 ${className}`}>
        {children}
      </div>
    </div>,
    document.body
  );
}