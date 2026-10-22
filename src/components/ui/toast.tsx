"use client";

import { Check } from "lucide-react";

interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div aria-live="polite" className="toast" role="status">
      <span className="toast-check"><Check size={14} /></span>
      {message}
    </div>
  );
}
