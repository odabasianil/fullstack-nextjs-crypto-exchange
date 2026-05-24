"use client";

import { Icon } from "./icon";
import { twMerge } from "tailwind-merge";
import { memo, useEffect, useRef, useState } from "react";
export interface ModalProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
  iconSize?: number;
  className?: string;
  title?: string;
}

export const ShareModal = memo((props: ModalProps) => {
  const { children, open, setOpen, iconSize = 24, title, className } = props;
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
    <div
      className={twMerge(
        "scroll-lock top-0 right-0 left-0 fixed w-full h-full z-50 bg-black-800 dark:bg-black-1200 flex items-center justify-center transition-transform-250"
      )}
    >
      <div
        className={twMerge(
          "bg-black-1200 dark:bg-black-1200 flex top-0 right-0 left-0 fixed w-full h-full md:scale-[0.9] transition-transform-250",
          animateOpen && "md:scale-100"
        )}
      >
        <div
          className={twMerge(
            "flex md:rounded-2xl flex-col m-auto md:max-h-full overflow-visible md:relative fixed bg-white dark:bg-background ",
            "max-h-[calc(100%-80px)] right-0 bottom-0 w-full top-[auto] rounded-tl-xl rounded-tr-xl",
            "invisible opacity-0 translate-3d-100 transition-transform-250 md:transition-none",
            className,
            animateOpen ? "translate-3d-reset visible opacity-100" : ""
          )}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className={twMerge("z-40 absolute md:right-[-40px] md:top-0 right-3.5 top-4")}
          >
            <Icon name="close" size={iconSize} className="md:text-white-800 text-black-100" />
          </button>
          <div className="md:p-8 px-4 py-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

ShareModal.displayName = "ShareModal";
