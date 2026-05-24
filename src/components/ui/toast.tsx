'use client';
import { useEffect, useMemo, useState } from 'react';

import { Icon } from './icon';
import { twMerge } from 'tailwind-merge';
import { ToastContext } from '../toast-context';
type ToastProviderProps = {
  children: React.ReactNode;
};
type ToastType = {
  id: string;
  message: string;
  className?: string;
  icon?: string;
  iconClassName?: string;
};
interface ToastInterface {
  message: string;
  duration?: number;
  close: () => void;
  icon?: string;
  className?: string;
  iconClassName?: string;
}
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
export default function Toast({
  message,
  close,
  duration = 2000,
  icon,
  className,
  iconClassName,
}: ToastInterface) {

  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, duration);
    return () => clearTimeout(timer);
  }, [close, duration]);

  return (
    <>
      <div
        className={twMerge(
          'fixed z-[100] top-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 m-auto md:max-w-fit w-[calc(100%-32px)] md:min-w-[288px] animate-opacity md:animate-slideInDown rounded-md bg-white-100 dark:bg-black-100',
          className
        )}
      >
        <div className="p-4 shadow-sm min-h-14 flex items-center justify-start">
          {icon && <div className='flex items-center justify-center'>
            <Icon name={icon} size={20} className={iconClassName} />
          </div>}
          <p className="text-black-100 dark:text-white-500 text-sm mx-3">
            {message}
          </p>
        </div>
      </div>
    </>
  );
}
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  function openToast(
    message: string,
    icon?: string,
    className?: string,
    iconClassName?: string
  ) {
    const newToast = {
      id: genId(),
      message,
      icon,
      className,
      iconClassName,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  }
  function closeToast(id: string) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }
  const contextValue = useMemo(
    () => ({
      open: openToast,
      close: closeToast
    }),
    []
  );
  return (
    <>
      <ToastContext.Provider value={contextValue}>
        {toasts &&
          toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              icon={toast.icon}
              close={() => closeToast(toast.id)}
              className={toast.className}
              iconClassName={toast.iconClassName}
            />
          ))}
        {children}
      </ToastContext.Provider>
    </>
  );
}