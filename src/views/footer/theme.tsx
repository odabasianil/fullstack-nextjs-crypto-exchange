'use client'

import { Icon } from "@/components/ui/icon"
import { setCookie } from "@/utils/set-cookie";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge"

export const FooterTheme = () => {
  const { t } = useTranslation();

  const [theme, setTheme] = useState<string>('dark');

  const toggleTheme = () => {
    if (localStorage.getItem('theme') === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", 'dark');
      setCookie("theme", 'dark', 365);
      setTheme('dark');
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", 'light');
      setCookie("theme", 'light', 365);
      setTheme('light');
    }

    // Tema değişikliği için bir CustomEvent oluştur ve tetikle
    const themeChangeEvent = new CustomEvent('themeChange', { detail: theme });
    window.dispatchEvent(themeChangeEvent);
  };

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  return (
    <>
      <div className="flex gap-2 items-center">
        <p className="text-sm">{t('footer.theme')}</p>
        <div className="flex items-center">
          <div className={twMerge(
            "bg-gray-100 dark:bg-gray-300 border border-white-400 dark:border-secondary rounded-[8px]",
            "h-[22px] w-[42px] p-0.5 cursor-pointer",
            "inline-flex items-center relative"
          )}
            onClick={() => toggleTheme()}
          >
            <div className={twMerge(
              "hidden absolute left-0.5 bottom-0 top-0 ",
              "bg-white my-0.5 w-[18px] rounded-md",
              "items-center justify-center",
              theme === "light" && "flex"
            )}
            >
              <Icon name="theme" size={16} className="!text-black" />
            </div>
            <div className={twMerge(
              "hidden absolute right-0.5 bottom-0 top-0",
              "bg-white my-0.5 w-[18px] rounded-md",
              "items-center justify-center",
              theme === "dark" && "flex"
            )}
            >
              <Icon name="theme-dark" size={16} className={twMerge(theme === 'dark' && 'text-black-100')} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}