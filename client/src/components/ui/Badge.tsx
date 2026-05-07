import React from 'react';

export default function Badge({
  children,
  tone = 'violet',
}: {
  children: React.ReactNode;
  tone?: 'violet' | 'sky' | 'green' | 'amber' | 'red';
}) {
  const tones: Record<string, string> = {
    violet: 'bg-violet-500/15 text-violet-200 border-violet-500/20',
    sky: 'bg-sky-500/15 text-sky-200 border-sky-500/20',
    green: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/20',
    amber: 'bg-amber-500/15 text-amber-200 border-amber-500/20',
    red: 'bg-red-500/15 text-red-200 border-red-500/20',
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

