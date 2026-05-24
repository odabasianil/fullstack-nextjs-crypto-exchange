"use client";
import React, { useEffect, useState } from "react";
import nav from "@/data/home/nav.json";
import navTr from "@/data/home/nav-tr.json";
import menuData from "@/data/home/user-menu.json";
import menuDataTr from "@/data/home/user-menu-tr.json";
import NavItem from "../header-item/header-item";
import Image from "next/image";
import { Search } from "../search";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { SelectLanguage } from "./select-language";
import { Download } from "./download";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { setCookie } from "@/utils/set-cookie";
import { useTranslation, initReactI18next } from "react-i18next";

interface NavProps {
  isFuturePage?: boolean;
}

const Nav: React.FC<NavProps> = ({ isFuturePage = false }) => {
  const { t, i18n } = useTranslation();
  const navMainData = i18n.language === "tr" ? navTr : nav;
  const userMenuData = i18n.language === "tr" ? menuDataTr : menuData;
  const logout = async () => {
    try {
      // await userService.logout();
      setCookie("user", "", -1);
      typeof window !== undefined && (window.location.href = "/");
    } catch (error) {
      console.log(error);
    }
  };

  const user = null;
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [user]);

  const toggleTheme = () => {
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setCookie("theme", "dark", 365);
      // Tema değişikliği için bir CustomEvent oluştur ve tetikle
      const themeChangeEvent = new CustomEvent("themeChange", {
        detail: "dark",
      });
      window.dispatchEvent(themeChangeEvent);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setCookie("theme", "light", 365);
      // Tema değişikliği için bir CustomEvent oluştur ve tetikle
      const themeChangeEvent = new CustomEvent("themeChange", {
        detail: "light",
      });
      window.dispatchEvent(themeChangeEvent);
    }
  };

  return (
    <nav className="flex items-center px-4 md:px-6 w-full">
      {isFuturePage && (
        <Link href="/" target="_blank" className="flex item-center mx-2">
          <Icon
            name="home"
            className="text-black-100 dark:text-white-100"
            size={24}
          />
        </Link>
      )}
      <Link href="/" className="mr-3 flex items-center h-16">
        <Image
          src="/images/logo/logo-big-black.png"
          width={120}
          height={64}
          alt="FAZ 3 Logo"
          className="dark:hidden"
        />
        <Image
          src="/images/logo/logo-big.png"
          width={120}
          height={64}
          alt="FAZ 3 Logo"
          className="hidden dark:block"
        />
      </Link>

      <div className="hidden md:flex w-full">
        <div className=" lg:flex justify-between w-full text-sm lg:text-[14px]">
          <ul className="flex items-center w-full">
            {navMainData.map((data, index) => (
              <li
                className="flex items-center relative group m-0 h-full py-5 pl-3 pr-3"
                key={index}
              >
                <Link
                  href={data.link}
                  className={twMerge(
                    "group whitespace-nowrap flex items-center justify-center text-black-100 dark:text-white-100 hover:text-primary hover:dark:text-primary font-medium",
                    (data as any)?.isBordered ? "font-medium px-4 py-2 h-8 rounded-md bg-primary text-black-100 dark:text-black-100 dark:hover:text-black-100 border border-none transition-all hover:bg-primary-100 hover:text-black-100 flex justify-center items-center": ""


                  )}
                >
                  {data.item}{" "}
                  {data.subItem && (
                    <Icon
                      name="dropdown"
                      size={16}
                      className="group-hover:rotate-180"
                    />
                  )}
                </Link>
                {data.subItem && <NavItem subItems={data.subItem} />}
              </li>
            ))}
          </ul>
          <ul className="hidden xl:flex items-center w-full justify-end relative">
            <Search />
            {!isLogged && (
              <>
                <li className="flex items-center justify-center group">
                  <Link href="/login">
                    <Button
                      appearance="secondary"
                      className={twMerge(
                        "ml-2 px-3 h-8 font-semibold !text-black-100 dark:!text-white-100"
                      )}
                    >
                      {t("login")}
                    </Button>
                  </Link>
                </li>
                <li className="flex items-center justify-center group">
                  <Link href="/register">
                    <Button
                      appearance="primary"
                      className={twMerge("ml-2 px-3 h-8 font-semibold")}
                    >
                      {t("register")}
                    </Button>
                  </Link>
                </li>
              </>
            )}
            {isLogged && (
              <li className="flex items-center justify-center group mx-2">
                <Link href="/me/dashboard" className="flex items-center">
                  <Icon
                    name="header-account-icon"
                    size={24}
                    className="text-black-100 dark:text-white-100 hover:!text-primary"
                  />
                </Link>
                <div className="border border-white-100 dark:border-secondary z-40 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-500 bg-white dark:bg-black-100 rounded-2xl absolute top-12 w-[240px]">
                  <div className="p-4 text-black-100 dark:text-white-100 text-base font-bold max-w-[238px] overflow-hidden text-ellipsis">
                    {(user as any)?.email}
                  </div>
                  {userMenuData.map((data, index) => (
                    <div key={index}>
                      <Link
                        href={data.link}
                        className="text-sm px-4 flex items-center gap-2 h-12 text-black-100 dark:text-white-100 hover:bg-white-100 dark:hover:bg-secondary"
                      >
                        <Icon
                          name={data.icon}
                          size={24}
                          className="text-gray dark:text-gray-200"
                        />
                        {data.text}
                      </Link>
                    </div>
                  ))}
                  <div
                    onClick={() => {
                      logout();
                    }}
                    className="rounded-b-2xl cursor-pointer text-black-100 dark:text-white-100 border-t border-white-100 dark:border-secondary text-sm px-4 flex items-center gap-2 h-12 hover:bg-white-100 dark:hover:bg-secondary"
                  >
                    <Icon
                      name="user"
                      size={24}
                      className="text-gray dark:text-gray-200"
                    />
                    {t("logout")}
                  </div>
                </div>
              </li>
            )}
            <div className="group relative mx-2">
              <Icon
                name="download"
                size={24}
                className="cursor-pointer text-black-100 dark:text-white-100 hover:!text-primary"
              />
              <Download />
            </div>

            <div className="group relative mx-2">
              <Icon
                name="language-icon"
                size={24}
                className="cursor-pointer text-black-100 dark:text-white-100 hover:!text-primary"
              />
              <div
                className={twMerge(
                  "z-30 w-max bg-white dark:bg-black-100 transition-all shadow p-6",
                  "absolute top-10 right-0 opacity-0 invisible",
                  "group-hover:visible group-hover:opacity-100"
                )}
              >
                <div className="grid grid-cols-[3fr] gap-6 w-[200px]">
                  <SelectLanguage />
                  {/* <SelectCurrency /> */}
                </div>
              </div>
            </div>
            <div onClick={toggleTheme} className="ml-2">
              <Icon
                name="theme"
                size={24}
                className="cursor-pointer dark:hidden text-black-100 dark:text-white-100 hover:!text-primary"
              />
              <Icon
                name="theme-dark"
                size={24}
                className="cursor-pointer hidden dark:block text-black-100 dark:text-white-100 hover:!text-primary"
              />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
