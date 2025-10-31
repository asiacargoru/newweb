'use client';
import * as React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    const base = [
      'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2',
      'text-sm ring-offset-background placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ].join(' ');
    const cls = [base, className].join(' ');
    return <input ref={ref} className={cls} {...props} />;
  }
);
Input.displayName = 'Input';