"use client";

import { twMerge } from "tailwind-merge";
import { FooterList } from "./list";
import { SocialMenu } from "./social-menu";
import { CopyRight } from "./copyright";
import { FooterLanguage } from "./language";
import { FooterTheme } from "./theme";
import { useState } from "react";

export const Footer = ({
  isMobileHidden = false,
}: {
  isMobileHidden?: boolean;
}) => {
  const [openLanguage, setOpenLanguage] = useState(false);

  const toggleLanguageMenu = () => {
    setOpenLanguage(!openLanguage);
  };

  return (
    <div
      className={twMerge(
        "container max-w-[1200px] py-[3rem] md:py-[4rem]",
        isMobileHidden && "hidden md:block"
      )}
    >
      <div
        className={twMerge(
          "flex flex-col mx-auto",
          "md:grid md:grid-cols-[1fr_4fr] md:gap-6 md:px-6"
        )}
      >
        <div className="order-2 md:order-1 mt-12 md:mt-0">
          <SocialMenu />
          <div className="flex flex-row gap-10 md:gap-4 md:flex-col">
            <FooterLanguage
              openLanguage={openLanguage}
              toggleLanguageMenu={toggleLanguageMenu}
            />
            {/* <FooterCurrency // kaldırıldı.
              toggleLanguageMenu={toggleLanguageMenu}
            /> */}
            <FooterTheme />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <FooterList />
        </div>
      </div>
      <div className="flex justify-center items-center mx-auto mt-[3rem]">
        <CopyRight />
      </div>
    </div>
  );
};
