import React from 'react';

export default function Card({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`glass rounded-3xl p-5 ${className}`}>{children}</div>;
}

