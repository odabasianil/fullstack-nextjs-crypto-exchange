import { createContext } from 'react';
type ToastContextValue = {
  open: (
    message: string,
    icon?: string,
    className?: string,
    iconClassName?: string,
  ) => void;
  close: (id: string) => void;
};
export const ToastContext = createContext<ToastContextValue | null>(null);