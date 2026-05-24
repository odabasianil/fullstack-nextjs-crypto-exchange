import React, { useEffect, useState } from "react";
import navMainData from "@/data/home/nav.json";
import navRightData from "@/data/home/right-nav.json";
import NavItem from "../header-item/header-item";
import Image from "next/image";
import { Search } from "../search";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { SelectCurrency } from "../nav/select-currency";
import { SelectLanguage } from "../nav/select-language";
import { Download } from "../nav/download";
import { setCookie } from "@/utils/set-cookie";

const SecurityNav: React.FC = () => {
  const toggleTheme = () => {
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setCookie("theme", 'dark', 365);
      
      const themeChangeEvent = new CustomEvent('themeChange', { detail: 'dark' });
      window.dispatchEvent(themeChangeEvent);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setCookie("theme", 'light', 365);
      
      const themeChangeEvent = new CustomEvent('themeChange', { detail: 'light' });
      window.dispatchEvent(themeChangeEvent);
    }
  };

  return (
    <nav className="flex items-center px-4 md:px-6 w-full">
      <Link href="/" className="mr-3 h-16 flex items-center">
        <Image src="/images/logo/logo-big-black.png" width={120} height={64} alt="FAZ 3 Logo" className="dark:hidden" />
        <Image src="/images/logo/logo-big.png" width={120} height={64} alt="FAZ 3 Logo" className="hidden dark:block" />
      </Link>

      <div className="flex w-full">
        <div className=" lg:flex justify-between w-full text-sm lg:text-[14px]">
          <ul className="flex items-center w-full justify-end">
            <div className="group relative ml-4 mr-2">
              <Icon
                name="download"
                size={24}
                className="cursor-pointer hover:!text-primary"
              />
              <Download />
            </div>

            <div className="group relative mx-2">
              <Icon
                name="language-icon"
                size={24}
                className="cursor-pointer hover:!text-primary"
              />
              <div
                className={twMerge(
                  "z-10 w-max bg-white dark:bg-black-100 transition-all shadow p-6",
                  "absolute top-10 right-0 opacity-0 invisible",
                  "group-hover:visible group-hover:opacity-100"
                )}
              >
                <div className="grid grid-cols-[3fr_2fr] gap-6 w-[400px]">
                  <SelectLanguage />
                  <SelectCurrency />
                </div>
              </div>
            </div>
            <div onClick={toggleTheme} className="ml-2">
              <Icon
                name="theme"
                size={24}
                className="cursor-pointer dark:hidden hover:!text-primary"
              />
              <Icon
                name="theme-dark"
                size={24}
                className="cursor-pointer hidden dark:block hover:!text-primary"
              />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SecurityNav;
