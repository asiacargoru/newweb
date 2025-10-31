'use client';

import React from "react";
import { toast as sonnerToast } from "sonner";

type ToastOptions = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: React.ReactNode;
};

export function useToast() {
  return {
    toast: (opts: ToastOptions) => {
      const message = opts.title ?? "";
      sonnerToast(message, {
        description: opts.description,
      });
    },
  };
}

export const toast = sonnerToast;
