import React from 'react';

export default function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm outline-none transition placeholder:text-white/40 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20 ${className}`}
      {...props}
    />
  );
}

