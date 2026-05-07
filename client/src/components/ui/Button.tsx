import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition';
  const variants: Record<string, string> = {
    primary:
      'bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-500 hover:brightness-110 text-white shadow-neon',
    secondary:
      'bg-white/5 border border-white/10 hover:bg-white/10 text-white/90',
    ghost: 'bg-transparent hover:bg-white/10 text-white/90 border border-transparent hover:border-white/10',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

