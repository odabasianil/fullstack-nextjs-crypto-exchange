'use client';

import { Icon } from './icon';
import { twMerge } from 'tailwind-merge';
import { useEffect, useRef } from 'react';
export interface ModalProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  title?: React.ReactNode;
  titleClass?: string;
  iconSize?: number;
  showCloseButton?: React.ReactNode;
  className?: string;
}

export const RightModal = (props: ModalProps) => {
  const {
    children,
    open,
    setOpen,
    title = '',
    titleClass = '',
    iconSize = 16,
    showCloseButton = true,
    className
  } = props;
  const ref = useRef(null);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'auto';
    }
  }, [open]);

  if (!open) return null;


  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-40" onClick={() => setOpen && setOpen(false)} />
      <section ref={ref}
        className={twMerge(
          'fixed bottom-0 -translate-x-0 left-auto right-0 z-[70] bg-white dark:bg-black-100 pt-4 w-auto max-h-screen h-full overflow-auto',
          className
        )}
      >
        {(showCloseButton || title) && (
          <div className={twMerge("flex justify-between items-start py-2 px-4 border-b border-b-white-300 dark:border-secondary", titleClass)}>
            {title && 
            <div className='flex items-center gap-2 '>
              <Icon name="chevron-left" size={20} className="text-gray-300 dark:text-gray" />
              <span className="mr-2 font-semibold">{title}</span>
            </div>
            }
            {showCloseButton && (
              <button
                type="button"
                onClick={() => setOpen && setOpen(false)}
                className="ml-auto"
              >
                <Icon name="close" size={iconSize} className="text-gray-300 dark:text-gray" />
              </button>
            )}
          </div>
        )}
        {children}
      </section>
    </>
  );
};
