"use client";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { useState } from "react";

interface FaqMenuProps {
  data: any[];
  requestUrl: string;
  isClose?: boolean;
  parentUrl?: any;
}

const FaqMenu: React.FC<FaqMenuProps> = ({
  data,
  requestUrl,
  isClose = false,
  parentUrl,
}) => {
  const [close, setClose] = useState(isClose);

  const handleClick = () => {
    setClose(!close);
  };

  const isActiveLink = (
    requestUrl: string,
    item: { link: string; submenus: any[] }
  ): boolean => {
    return (
      requestUrl === item?.link ||
      item?.submenus?.some((subitem: any) => subitem.link === requestUrl)
    );
  };

  const isActiveChildLink = (parentUrl: string): boolean => {
    return data.some((item) => {
      return item.submenus.some((submenu: any) => {
        console.log(parentUrl, submenu.link)
        return parentUrl === submenu.link;
      });
    });
  };

  return (
    <>
      <div
        className={twMerge(
          "lg:w-[240px] lg:min-w-[240px] lg:max-w-[240px] md:w-[200px] md:min-w-[200px] md:max-w-[200px] w-full min-w-[100%] max-w-[100%] border-black-900 dark:border-r transition-width",
          close && "!w-12 !min-w-12"
        )}
      >
        <div
          className=" dark:bg-background-800 bg-white-800 flex p-3 justify-start items-center cursor-pointer"
          onClick={handleClick}
        >
          <Icon
            className="lg:hidden block"
            name="open-mobile-toggle"
            size={24}
          />
        </div>
        {data?.map((item) => {
          const isActive = parentUrl
            ? isActiveChildLink(parentUrl)
            : isActiveLink(requestUrl, item);
          const shouldShowSubmenu = isActive && !close;

          return (
            <div key={item.link}>
              <a
                href={item.link}
                className={twMerge(
                  "dark:bg-background-800 bg-white-800 dark:text-gray-900 text-white-1000 h-fit cursor-pointer border-transparent border-l-[3px] pl-3 flex items-center justify-between dark:hover:bg-black-900 dark:hover:text-primary-300",
                  isActive && close &&
                    "dark:text-gray-800 text-black-1100 border-primary-300 bg-gray-1000 dark:bg-black-900",
                )}
              >
                <div className="flex pt-3 pb-3 pr-2 cursor-pointer min-h-[48px] items-center">
                  <Image
                    src={item.icon}
                    alt={item.text}
                    width={24}
                    height={24}
                    className=""
                  />
                  <div
                    className={twMerge(
                      "text-sm pl-1.5",
                      close && "min-w-0 max-w-0 max-h-6 overflow-hidden"
                    )}
                  >
                    {item.text}
                  </div>
                </div>
                {item.submenus.length && !close ? (
                  <div className="py-3 px-4">
                    <Icon
                      name="chevron-down"
                      size={16}
                      className={twMerge(
                        "text-gray min-w-4",
                        isActive && "transform rotate-180"
                      )}
                    />
                  </div>
                ) : (
                  ""
                )}
              </a>
              {shouldShowSubmenu && (
                <div className={twMerge(
                  "border-gray-1000 dark:border-black-900 border-r-0",
                )}>
                  {item.submenus.map((subitem: any) => (
                    <a
                      key={subitem.link}
                      className={twMerge(
                        "dark:bg-background-800 text-gray-900 border-transparent border-l-[3px] pl-10 h-fit flex items-center justify-between cursor-pointer dark:hover:bg-black-900 dark:hover:text-primary-300 hover:text-primary-100",
                        (requestUrl === subitem.link ||
                          parentUrl == subitem.link) &&
                          "dark:text-gray-800 text-black-1100 border-primary-300 bg-gray-1000 dark:bg-black-900 font-medium"
                      )}
                      href={subitem.link}
                    >
                      <div className="flex pt-3 pr-8 pb-3 min-h-[48px] items-center">
                        <div className="text-sm pl-1.5">{subitem.text}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FaqMenu;
