import React, { useEffect, useState } from "react";
import navMainData from "@/data/home/nav.json";
import navRightData from "@/data/home/right-nav.json";
import NavItem from "../header-item/header-item";
import Image from "next/image";
import { Search } from "../search";
import userMenuData from "@/data/home/user-menu.json";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { SelectLanguage } from "./select-language";
import { SelectCurrency } from "./select-currency";
import { Download } from "./download";
import { twMerge } from "tailwind-merge";
import { SearchContent } from "../search/content";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import MobileNavItem from "../header-item/mobile-item";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { setCookie } from "@/utils/set-cookie";
import { userService } from "@/core/services/auth/user.service";

const listElClass = 'cursor-pointer hover:bg-white-100 hover:dark:bg-secondary px-6 flex justify-between items-center h-[56px] text-black-100 dark:text-white-100';

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string[]>([]);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [theme, setTheme] = useState<string>('dark');

  const toggleUserMenu = () => {
    setOpenUserMenu(!openUserMenu);
  }

  const toggleLanguageMenu = () => {
    setOpenLanguage(!openLanguage);
  }

  const handleClickSearch = () => {
    setIsOpenSearch((prev) => !prev);
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
 
    setOpenLanguage(false);
    setIsOpenSearch(false);
  }

  const toggleItem = (item: string) => {
    if (openSubMenu.includes(item)) {
      setOpenSubMenu(openSubMenu.filter((i) => i !== item));
    } else {
      setOpenSubMenu([...openSubMenu, item]);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'auto';
    }
  }
  , [isOpen]);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const logout = async () => {
    try {
      await userService.logout();
      setCookie('user', '', -1);
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  }

  const user = userService.getUser();

  return (
    <nav className="flex items-center justify-between px-4 md:px-6 w-full">
      <div className="flex items-center h-[4rem]">
        <Image src="/images/logo/logo-big-black.png" width={120} height={64} alt="FAZ 3 Logo" className="dark:hidden" />
        <Image src="/images/logo/logo-big.png" width={120} height={64} alt="FAZ 3 Logo" className="hidden dark:block" />
      </div>
      <div className="flex items-center gap-4">
        { user && (
          <li className="cursor-pointer flex items-center justify-center" onClick={toggleUserMenu}>
            <Icon
              name="user"
              size={24}
              className="text-black-100 dark:text-white-100"
            />
          </li>
        )}
        <div className="cursor-pointer" onClick={toggleMenu}>
          <Icon name="menu" size={24} />
        </div>

      </div>

       <div className={twMerge(
          "z-[70] top-0 right-0 w-full h-full overflow-y-auto bg-white dark:bg-black-100 md:max-w-[375px]",
          " fixed transition-all duration-500",
          openUserMenu ? " opacity-100 visible md:right-0" : "md:-right-12 opacity-0 invisible",
        )}>
          <div className="flex justify-end items-center h-[4rem] mr-6">
            <div onClick={toggleUserMenu}>
              <Icon name="close" size={24}  />
            </div>
          </div>
          <ul className=" pb-4 w-full">
            <div className="px-6 text-xl mb-4 text-black-100 font-semibold dark:text-white-100">
              {user?.email}
            </div>
            {userMenuData.map((data, index) => (
              <Link
                key={index}
                href={data.link}
                className={twMerge(
                  "px-6 flex items-center hover:bg-white-100 hover:dark:bg-secondary h-[56px] justify-between w-full text-black-100 dark:text-white-100 font-medium",
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon name={data.icon} size={24} className="!text-gray" />
                  {data.text} 
                </div>
              </Link>
              ))}
            <div
              onClick={() => {
                logout();
              }}
              className={twMerge(
                "border-t border-white-100 dark:border-secondary px-6 flex items-center gap-2 hover:bg-white-100 hover:dark:bg-secondary h-[56px] w-full text-black-100 dark:text-white-100 font-medium",
              )}
            >
                <Icon name="settings" size={24} className="!text-gray" />
                Logout

            </div>
          </ul>
        </div>

        <div className={twMerge(
          "z-[70] top-0 right-0 w-full h-full overflow-y-auto bg-white dark:bg-black-100 md:max-w-[375px]",
          " fixed transition-all duration-500",
          isOpen ? " opacity-100 visible md:right-0" : "opacity-0 invisible md:-right-12",
        )}>
          <div className="flex justify-end items-center h-[4rem] mr-6">
            <div onClick={toggleMenu}>
              <Icon className="text-black-200 dark:text-white-100" name="close" size={24}  />
            </div>
          </div>

          <ul className="px-6 pb-4 w-full">
            {!user && <div className="flex items-center justify-center gap-[14px]">
              {navRightData.map((data, index) => (
                <li
                  className="w-full"
                  key={index}
                >
                  <Link href={data.link} className="w-full">
                    <Button
                      appearance={data.type}
                      className="px-4 h-10 font-medium w-full text-sm"
                    >
                      {data.item}
                    </Button>
                  </Link>
                </li>
              ))}
            </div>}
            <div>
              <div className="mt-6">
                <Input
                  type="text"
                  placeholder="Coin, Function, Announcement"
                  onClick={handleClickSearch}
                  value=''
                  label={<Icon name="search" size={16} color="transparent" />}
                  labelClassName="text-gray"
                  wrapperClassName="w-full"
                  className="h-10 pl-10 pb-1 w-full placeholder:font-medium placeholder:text-gray placeholder:text-sm"
                />
              </div>
            </div>
            <SearchContent isOpen={isOpenSearch} handleClick={handleClickSearch} />
          </ul>
          <ul className="">
            {navMainData.map((data, index) => (
                <li
                  className="flex flex-col justify-center relative group m-0"
                  key={index}
                  onClick={() => data.subItem && toggleItem(data.item)}
                >
                  <div className="flex items-center hover:bg-white-100 hover:dark:bg-secondary px-6 h-[56px]">
                    <Link
                      href={data.link}
                      className={twMerge(
                        "group whitespace-nowrap flex items-center justify-between w-full text-black-100 dark:text-white-100 font-medium",
                        data.subItem && "pointer-events-none"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon name={data.icon} size={24} className="!text-gray" />
                        {data.item} 
                      </div>
                      {data.subItem && <Icon name="dropdown" size={16} className={twMerge(openSubMenu.includes(data.item) && "rotate-180")} />}
                    </Link>
                  </div>
                  {(data.subItem && openSubMenu.includes(data.item)) && <div className="!bg-white dark:!bg-black-100">
                    <MobileNavItem subItems={data.subItem} />
                  </div> }
                </li>
              ))}
          </ul>
          <ul>
            <li className={twMerge(listElClass, 'hover:bg-transparent')}>
              <div className="flex items-center gap-2">
                <Icon name="language-icon" size={24} className="!text-gray" />
                Theme
              </div>
              <ThemeSwitcher theme={theme} setTheme={setTheme} />
            </li>
            <li className={twMerge(listElClass)}>
              <Link href='/chat?sourceEntry=4' className="flex items-center gap-2">
                <Icon name="language-icon" size={24} className="!text-gray" />
                24/7 Chat Support
              </Link>
            </li>
            <li className={twMerge(listElClass)}>
              <Link href='/download' className="flex items-center gap-2">
                <Icon name="download" size={24} className="!text-gray" />
                Download
              </Link>
            </li>
            <li className={twMerge(listElClass)} onClick={toggleLanguageMenu}>
              <div className="flex items-center gap-2" >
                <Icon name="language-icon" size={24} className="!text-gray" />
                English
              </div>

              {openLanguage && <div className="fixed bg-white dark:bg-black-100 top-0 right-0 w-full h-full md:max-w-[375px]">
                <div className="flex justify-end items-center h-[4rem] mr-6">
                  <div onClick={toggleLanguageMenu}>
                    <Icon name="close" size={24}  />
                  </div>
                </div>
                <div className="px-6 pb-6 grid grid-cols-[3fr_2fr] gap-6">
                  <SelectLanguage />
                  <SelectCurrency />
                </div>
              </div>}
            </li>
            <li className={twMerge(listElClass)} onClick={toggleLanguageMenu}>
              <div className="flex items-center gap-2">
                <Icon name="currency-icon" size={24} className="!text-gray" />
                USD
              </div>
            </li>
          </ul>
        </div>
    </nav>
  );
};

export default MobileNav;
