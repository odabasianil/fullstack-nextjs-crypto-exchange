import { Icon } from "@/components/ui/icon";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface SubItem {
  item: string;
  desc: string;
}

interface NavItemProps {
  subItems: {
    item: string;
    subItem?: SubItem[];
  }[];
}

const MobileNavItem: React.FC<NavItemProps> = ({ subItems }) => {
  const hasSubItems = subItems.some((subItem) => subItem.subItem);

  return (
    <ul
      className={clsx(
        "z-20 w-full transition-all",
      )}
    >
      {subItems.map((subItem: any, index) =>
        subItem.subItem ? (
          <div key={index}>
            <span className="flex items-center text-gray-100 dark:text-gray-200 text-xs font-semibold !h-12 pl-[4rem]">
              {subItem.item}
            </span>
            <ul className="">
              {subItem.subItem.map((item:any, subIndex: number) => (
                <li key={subIndex} className="h-12 flex items-center pl-[4rem] text-black-100 dark:text-white-100 hover:bg-white-100 hover:dark:bg-secondary w-full">
                  <Link
                    href={item.link}
                    className="w-full text-sm font-medium"
                  >
                    {item.item} 
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <li
            key={index}
            className="h-12 flex items-center pl-[4rem] hover:bg-white-100 hover:dark:bg-secondary w-full text-black-100 dark:text-white-100"
          >
            <Link
              href={subItem.link}
              className="w-full text-sm font-medium"
            >
              {subItem.item} 
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

export default MobileNavItem;
