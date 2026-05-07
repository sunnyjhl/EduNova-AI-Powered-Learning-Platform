import React from 'react';
import { motion } from 'framer-motion';

export default function Spinner({ className = '' }: { className?: string }) {
  return (
    <motion.div
      aria-label="Loading"
      className={`h-6 w-6 rounded-full border-2 border-white/20 border-t-violet-400 ${className}`}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
    />
  );
}

