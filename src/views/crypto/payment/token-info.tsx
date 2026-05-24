'use client'

import { Icon } from "@/components/ui/icon";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export const TokenInfo = ({
  title,
  description,
  children
}: {
  title: string;
  description: React.ReactNode | string;
  children?: React.ReactNode;
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="mt-2 mb-6 p-4 border border-white-100 dark:border-secondary rounded-2xl ">
      <div className="w-full flex items-start gap-x-6 divide-x overflow-hidden">
        <div className="flex flex-col gap-2">
          {title && <div className="text-xl">{title}</div>}
          {description && <div className={twMerge("text-gray-300 dark:text-gray text-sm overflow-hidden", showMore ? "" : "truncate", children && 'max-w-[600px]')}>{description}</div>}
          <div className="flex items-center cursor-pointer text-xs" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show less" : "Show more"}
            <Icon
              name="chevron-left"
              className={twMerge(
                "transform",
                showMore ? "-rotate-90" : "rotate-90"
              )}
              size={16}
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}