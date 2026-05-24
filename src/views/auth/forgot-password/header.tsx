'use client'

import { Icon } from "@/components/ui/icon"
import { setCookie } from "@/utils/set-cookie"
import { SelectCurrency } from "@/views/header/nav/select-currency"
import { SelectLanguage } from "@/views/header/nav/select-language"
import Image from "next/image"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

export const ForgotPasswordHeader = () => {
  const [openLanguage, setOpenLanguage] = useState(false);

  const toggleLanguageMenu = () => {
    setOpenLanguage(!openLanguage);
  }

  const toggleTheme = () => {
    if (localStorage.getItem('theme') === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", 'dark');
      setCookie('theme', 'dark', 365);
      // Tema değişikliği için bir CustomEvent oluştur ve tetikle
      const themeChangeEvent = new CustomEvent('themeChange', { detail: 'dark' });
      window.dispatchEvent(themeChangeEvent);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", 'light');
      setCookie('theme', 'light', 365);
      // Tema değişikliği için bir CustomEvent oluştur ve tetikle
      const themeChangeEvent = new CustomEvent('themeChange', { detail: 'light' });
      window.dispatchEvent(themeChangeEvent);
    }

    
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-6 w-full">
      <div className="mr-3">
        <Image src="/images/logo/logo-big-black.png" width={120} height={64} alt="FAZ 3 Logo" className="dark:hidden" />
        <Image src="/images/logo/logo-big.png" width={120} height={64} alt="FAZ 3 Logo" className="hidden dark:block" />
      </div>
      <div className="flex">
        <div className="flex w-full text-sm lg:text-[14px]">
          <div className="group relative mx-2" onClick={toggleLanguageMenu}>
            <Icon
              name="language-icon"
              size={24}
              className="cursor-pointer hover:!text-primary"
            />
              {openLanguage && <div className="md:hidden fixed bg-white dark:bg-[rgb(18,22,28)] top-0 left-0 w-full h-full">
                <div className="flex justify-end items-center h-[4rem] mr-6">
                  <div onClick={toggleLanguageMenu}>
                    <Icon name="close" size={24}  />
                  </div>
                </div>
                <div className="px-6 pb-6 w-full">
                  <SelectLanguage />
                </div>
              </div>}
            <div className={twMerge(
                "z-10 w-max bg-white dark:bg-black-100 transition-all shadow p-6",
                "hidden md:block absolute top-10 right-0 opacity-0 invisible",
                "group-hover:visible group-hover:opacity-100"
              )}
            >
              <div className="flex max-w-[250px]">
                <SelectLanguage />
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
        </div>
      </div>
    </nav>
  )
}