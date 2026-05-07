import React from 'react';
import { motion } from 'framer-motion';
import { ToastType } from '../../context/ToastContextTypes';

export default function Toast({
  toast,
  onClose,
}: {
  toast: { id: string; type: ToastType; title: string; message?: string };
  onClose: () => void;
}) {
  const tone: Record<ToastType, string> = {
    success: 'border-emerald-500/30 bg-emerald-500/10',
    error: 'border-red-500/30 bg-red-500/10',
    info: 'border-sky-500/30 bg-sky-500/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={`glass ${tone[toast.type]} border rounded-2xl px-4 py-3`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-bold">{toast.title}</div>
          {toast.message ? <div className="mt-1 text-xs text-white/70">{toast.message}</div> : null}
        </div>
        <button
          className="text-white/70 hover:text-white/95 transition"
          onClick={onClose}
          aria-label="Close toast"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}

