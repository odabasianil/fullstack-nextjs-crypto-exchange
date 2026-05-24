'use client'

import { useState } from "react";
import { FooterLanguage } from "../footer/language";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { SelectLanguage } from "../header/nav/select-language";
import { twMerge } from "tailwind-merge";
import { CookieModal } from "../cookie-modal";

export const AuthFooter = () => {
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openCookie, setOpenCookie] = useState(false);

  const toggleLanguageMenu = () => {
    setOpenLanguage(!openLanguage);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center h-[70px] w-full md:w-[425px] text-gray-100">
        <div className="mx-4">
        <div className="group relative mx-2" onClick={toggleLanguageMenu}>
          <div className="text-sm hover:!text-primary flex gap-1 items-center">
            <Icon
              name="language-icon"
              size={16}
              className="cursor-pointer"
            />
            Türkçe
          </div>
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
              "hidden md:block absolute bottom-10 -left-12 opacity-0 invisible",
              "group-hover:visible group-hover:opacity-100"
            )}
          >
            <div className="flex max-w-[250px]">
              <SelectLanguage />
            </div>
          </div>
        </div>
        </div>
        <div className="text-sm hover:text-primary-100 mx-4 cursor-pointer" onClick={() => setOpenCookie(true)}>
          Çerezler
        </div>
        <Link href="/privacy-policy" className="mx-4 text-sm hover:text-primary-100">
          Koşullar
        </Link>
        <Link href="/privacy-policy" className="mx-4 text-sm hover:text-primary-100">
          Gizlilik
        </Link>
      </div>
      <CookieModal
        open={openCookie}
        setOpen={setOpenCookie}
      />
    </div>
  )
}