import React, { createContext, useCallback, useMemo, useState } from 'react';

type ToastType = 'success' | 'error' | 'info';

type Toast = {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
};

type ToastContextValue = {
  toasts: Toast[];
  pushToast: (t: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
};

export const ToastContext = createContext<ToastContextValue>({
  toasts: [],
  pushToast: () => {},
  removeToast: () => {},
});

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (t: Omit<Toast, 'id'>) => {
      const id = uid();
      const toast: Toast = { id, ...t };
      setToasts((prev) => [toast, ...prev].slice(0, 4));
      window.setTimeout(() => removeToast(id), 3600);
    },
    [removeToast]
  );

  const value = useMemo(() => ({ toasts, pushToast, removeToast }), [toasts, pushToast, removeToast]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

