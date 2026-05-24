"use client";

import { Icon } from "./icon";
import { twMerge } from "tailwind-merge";
import { memo, useEffect, useRef, useState } from "react";
export interface ModalProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
  iconSize?: number;
  showCloseButton?: React.ReactNode;
  className?: string;
  titleClass?: string;
  titleWrapperClass?: string;
  title?: string;
  backdropClassName?: string;
  isBackdropClickable?: boolean;
  id?: string;
  description?: string;
  button?: React.ReactNode;
  isMobileOpen?: boolean;
  closeIconClass?: string;
  showBackButton?: boolean;
  onBackButtonClick?: () => void;
}

export const Modal = memo((props: ModalProps) => {
  const {
    children,
    open,
    setOpen,
    iconSize = 24,
    showCloseButton = false,
    isBackdropClickable = true,
    titleClass,
    title,
    className,
    titleWrapperClass,
    description,
    id,
    backdropClassName = "",
    isMobileOpen = false,
    closeIconClass = "",
    showBackButton = false,
    onBackButtonClick,
  } = props;
  const ref = useRef<any>(null);

  const [animateOpen, setAnimateOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setAnimateOpen(true);
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "auto";
      const timer = setTimeout(() => {
        setAnimateOpen(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open) return;

  return (
    <div>
      <div
        className={twMerge(
          "fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-40",
          backdropClassName
        )}
        onClick={() => isBackdropClickable && setOpen(false)}
      />

      <section
        id={id}
        ref={ref}
        className={twMerge(
          "scroll-lock fixed bottom-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ",
          "bg-white dark:bg-black-200 dark:md:bg-black-100",
          "rounded-2xl p-6 max-w-[80vw] h-fit max-h-none",
          isMobileOpen
            ? twMerge(
                "transition-transform-250 invisible opacity-0",
                "md:p-6 p-4 translate-3d-100 top-auto bottom-0 left-0 w-full max-w-none max-h-[calc(100%-80px)] rounded-tl-2xl",
                "md:rounded-2xl md:top-1/2 md:bottom-1/2 md:left-1/2 md:max-w-[80vw] md:max-h-none md:-translate-x-1/2 md:-translate-y-1/2 md:visible md:opacity-100 md:transition-none"
              )
            : "",
          animateOpen && isMobileOpen
            ? "visible opacity-100 translate-3d-reset left-0 md:left-1/2"
            : "",
          className
        )}
      >
        {(title || showCloseButton) && (
          <div
            className={twMerge(
              "flex items-center justify-between w-full pb-4",
              titleWrapperClass
            )}
          >
            {showBackButton && (
              <button
                type="button"
                onClick={() => onBackButtonClick && onBackButtonClick()}
                className={twMerge("z-40", closeIconClass)}
              >
                <Icon name="arrow-right" className="rotate-180" size={iconSize} />
              </button>
            )}
            <div className="text-left">
              {title && (
                <h2
                  className={twMerge(
                    "text-lg font-semibold w-full",
                    titleClass
                  )}
                >
                  {title}
                </h2>
              )}
              {description && (
                <div className="text-sm mt-2 text-gray-400">{description}</div>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={twMerge("z-40", closeIconClass)}
              >
                <Icon name="close" size={iconSize} />
              </button>
            )}
          </div>
        )}
        {children}
      </section>
    </div>
  );
});

Modal.displayName = "Modal";
