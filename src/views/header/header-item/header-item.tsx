import { Icon } from "@/components/ui/icon";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

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

const NavItem: React.FC<NavItemProps> = ({ subItems }) => {
  const hasSubItems = subItems.some((subItem) => subItem.subItem);

  return (
    <ul
      className={clsx(
        "z-20 bg-white dark:bg-black-100 shadow-md absolute top-[64px] p-7 w-max text-white rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all",
        {
          "grid gap-6 grid-cols-[repeat(2,1fr)]": hasSubItems,
        }
      )}
    >
      {subItems.map((subItem: any, index) =>
        subItem.subItem ? (
          <div key={index} className="space-y-2">
            <span className="text-gray-100 dark:text-gray-200 text-sm font-medium">
              {subItem.item}
            </span>
            <ul className="">
              {subItem.subItem.map((item: any, subIndex: number) => (
                <li key={subIndex}
                  className={twMerge(
                    clsx(
                      "mt-[24px] w-[240px]",
                      item.disabled && "opacity-50 pointer-events-none",
                    )
                  )}>

                  <Link
                    href={item.link ?? '#'}
                    className={twMerge(
                      clsx(
                        "block w-full text-sm font-medium mt-6 group/edit"
                      )
                    )}
                  >
                    <div className="flex gap-2 items-center text-black-100 dark:text-white-100">
                      {item.item}
                      <Icon
                        name="arrow-right"
                        size={16}
                        className="opacity-0 relative -left-2 group-hover/edit:left-0 group-hover/edit:text-primary group-hover/edit:opacity-100 transition-all duration-500"
                      />
                    </div>
                    <span className="block text-xs text-black-300 dark:text-gray">
                      {item.desc}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <li
            key={index}
            className={clsx("group/edit w-[240px]", index === 0 ? "mt-0" : "mt-[24px]")}
          >
            <a href="#" className="flex gap-2 items-center text-black-100 dark:text-white-100 w-full text-sm font-medium">
              {subItem.item}
              <Icon
                name="arrow-right"
                size={16}
                className="opacity-0 relative -left-2 group-hover/edit:left-0 group-hover/edit:text-primary group-hover/edit:opacity-100 transition-all duration-500"
              />
            </a>
            <span className="block text-black-300 dark:text-gray text-xs">
              {subItem.desc}
            </span>
          </li>
        )
      )}
    </ul>
  );
};

export default NavItem;
