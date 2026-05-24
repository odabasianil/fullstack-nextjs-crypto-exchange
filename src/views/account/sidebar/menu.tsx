'use client'

import { twMerge } from "tailwind-merge";
import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ACCOUNT_MENU } from ".";



export const AccountMenu = ({setOpenedMobileMenu}: {setOpenedMobileMenu?: any}) => {
  const pathname = usePathname();
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const isActiveLink = (
    requestUrl: any,
    item: { link?: any; submenus?: any[] }
  ): boolean => {
    return (
      requestUrl === item.link ||
      item?.submenus?.some((subitem: any) => subitem.link === requestUrl) ||
      false
    );
  };

  const ParentItem = ({item}: {item: any}) => (
    <>
      <div className="flex pt-3 pb-3 pr-2 cursor-pointer min-h-[48px] items-center">
        <Icon
          name={item.icon}
          alt={item.text}
          size={20}
          className="hidden md:block"
        />
        <Icon
          name={item.icon}
          alt={item.text}
          size={24}
          className="md:hidden"
        />
        <div className="font-semibold pl-2">{item.text}</div>
      </div>
      {item?.submenus?.length ? (
        <div className="">
          <Icon
            name="chevron-down"
            size={16}
            className={twMerge("text-gray ml-1 mr-2 min-w-4 transform transition-transform duration-500",
              openTabs.includes(item.text) && "rotate-180"
            )}
          />
        </div>
      ) : (
        ""
      )}
    </>
  )
  
  const handleToggle = (item: any) => {
    const index = openTabs.indexOf(item.text);
    if (index === -1) {
      setOpenTabs([...openTabs, item.text]);
    } else {
      setOpenTabs(openTabs.filter((tab) => tab !== item.text));
    }
  }

  useEffect(() => {
    const activeMenu = ACCOUNT_MENU?.find((item) => isActiveLink(pathname, item));
    if (activeMenu?.text) {
      setOpenTabs([activeMenu.text]);
    }
  }, [pathname]);

  return (
    <>
        <div className="hidden md:flex p-3 justify-start items-center"></div>
        {ACCOUNT_MENU?.map((item) => {
          const isActive = isActiveLink(pathname, item);

          return (
            <>
              {(item?.submenus && item?.submenus?.length > 0) ? 
                <div
                  onClick={() => handleToggle(item)}
                  className={twMerge(
                    "dark:text-gray-900 text-white-1000 h-fit cursor-pointer border-transparent border-l-[3px] px-[15px] md:p-0 md:pl-6 flex items-center justify-between md:dark:hover:bg-black-900 md:dark:hover:text-white-100 rounded-r-xl",
                    isActive &&
                      "dark:text-white-100 text-black-100",
                  )}
                > 
                  <ParentItem item={item}/>
                </div> : <Link
                  href={item.link}
                  onClick={() => setOpenedMobileMenu && setOpenedMobileMenu(false)}
                  className={twMerge(
                    "dark:text-gray-900 text-white-1000 h-fit cursor-pointer border-transparent border-l-[3px] px-[15px] md:pr-0 md:pl-6 flex items-center justify-between md:dark:hover:bg-black-900 md:dark:hover:text-white-100 rounded-r-xl",
                    pathname.includes(item.link) &&
                      "dark:text-white-100 text-black-100 md:bg-gray-100 md:dark:bg-secondary",
                  )}
                >
                  <ParentItem item={item}/>
                </Link>
              }
              <div className={twMerge(
                openTabs.includes(item.text) ? "block" : "hidden"
              )}>
                {item?.submenus?.map((subitem) => (
                  <Link
                    onClick={() => setOpenedMobileMenu && setOpenedMobileMenu(false)}
                    className={twMerge(
                      "dark:bg-background-800 text-gray-900 pl-[52px] h-fit flex items-center justify-between cursor-pointer md:dark:hover:bg-black-900 md:dark:hover:text-white-100 hover:text-black-100 rounded-r-xl",
                      pathname.includes(subitem.link) &&
                        "dark:text-white-100 text-black-100 md:bg-gray-100 md:dark:bg-secondary font-medium"
                    )}
                    href={subitem.link}
                  >
                    <div className="flex pt-3 pr-8 pb-3 min-h-[48px] items-center">
                      <div className="font-semibold pl-1.5">{subitem.text}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          );
        })}
    </>
  )
}