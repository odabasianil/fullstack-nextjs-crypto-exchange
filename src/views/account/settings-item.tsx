'use client';

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import { twMerge } from "tailwind-merge";

export const SettingsItem = (props: any) => {
  const {
    children,
    icon,
    title,
    desc,
    subLink,
    subLinkText,
    onClick,
    buttonText,
    isHiddenBorder=false
  } = props;

  return (
    <>
      <div className={twMerge(
        "py-6 md:py-3 flex flex-col md:flex-row md:justify-between md:items-center",
        !isHiddenBorder && "border-b border-white-100 dark:border-secondary md:border-none"
      )}>
        <div className="flex gap-2">
          {icon && <Icon name={icon} size={20} className="mt-0.5 min-w-5" />}
          <div className="">
            <div className="">{title}</div>
            {desc && <div className="mt-2 text-sm text-gray-300 dark:text-gray max-w-[634px]">{desc}</div>}
            {subLink && <Link href={subLink} target="_blank" className="text-sm underline text-primary">{subLinkText}</Link>}
          </div>
        </div>
        <div className={twMerge(
          "flex items-center gap-8 mt-4 md:mt-0 justify-between md:justify-normal",
          children ? 'justify-between' : "justify-end"
        )}>
          {children}
          {buttonText && <Button onClick={() => onClick && onClick()} appearance="secondary" className="text-sm w-24 h-8 font-semibold">{buttonText}</Button>}
        </div>
      </div>
    </>
  )
}