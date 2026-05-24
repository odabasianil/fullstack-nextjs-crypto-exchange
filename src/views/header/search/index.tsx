'use client';

import { useState } from "react";
import { SearchContent } from "./content";
import { Icon } from "@/components/ui/icon";
import { twMerge } from "tailwind-merge";

export const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
     <div className="relative mr-2">
        <div 
          onClick={handleClick}
          className={twMerge(
            "cursor-pointer hover:text-primary",
            isOpen && 'text-primary'
          )}
        >
          <Icon
            name="search"
            size={24}
            color="transparent"
            className="dark:hidden text-black-200 "
          />
          <Icon
            name="search"
            size={24}
            className="hidden dark:block"
          />
        </div>
        <SearchContent
          isOpen={isOpen}
          handleClick={handleClick}
        />
      </div>
    </>
  )
}