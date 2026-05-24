"use client";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const Button = (props: any) => {
  return (
    <button
      {...props}
      className={twMerge(
        clsx(
          [
            "px-4",
            "py-2",
            "h-12",
            "rounded-sm",
            "bg-primary",
            "text-black-100",
            "border",
            "rounded-md",
            "transition-all",
            "hover:bg-primary-100",
            "hover:text-black-100",
            "flex justify-center items-center",
          ],
          props.appearance === "primary" && [
            "text-black-100",
            "bg-primary",
            "border-none",
            "hover:bg-primary-100",
          ],
          props.appearance === "ghost" && [
            "!bg-transparent",
            "!border !border-white-100 dark:!border-secondary",
            "text-gray-1000",
            "text-black-100 dark:text-white-100"
          ],
          props.appearance === "secondary" && [
            "bg-white-100 dark:bg-secondary",
            "!text-black-100 dark:!text-white-100",
            "hover:bg-gray-1050",
            "border-none",
            "hover:border-gray-1000",
          ],
          props.disabled && [
            'cursor-not-allowed',
            'bg-white-300 dark:bg-gray-300 border-none',
            'text-gray-300 dark:text-gray-200'
          ],
          props.disabledGray && [
            "pointer-events-none cursor-not-allowed bg-gray-800 text-white-700 hover:bg-gray-800 hover:text-white-700 dark:bg-gray-700 dark:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-600",
          ],
          props.appearance === "link" && [
            "text-primary-200",
            "dark:text-primary-300",
            "border-none",
            "bg-transparent",
            "border-none",
            "hover:bg-transparent",
            "hover:text-primary-700",
            "dark:hover:text-primary-200",
            "rounded-none",
            "font-normal",
            "px-0 py-0 h-auto"
          ],
        ),
        props.className
      )}
    >
      {props.children}
    </button>
  );
};
