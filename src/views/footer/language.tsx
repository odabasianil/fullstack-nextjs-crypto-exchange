import { Icon } from "@/components/ui/icon";
import { twMerge } from "tailwind-merge";
import { SelectLanguage } from "../header/nav/select-language";
import { SelectCurrency } from "../header/nav/select-currency";
import { useTranslation } from "react-i18next";

export const FooterLanguage = (props: any) => {
  const { openLanguage, toggleLanguageMenu } = props;
  const { i18n } = useTranslation();
  const activeLanguage = i18n?.language == "tr" ? "Türkçe" : "English";

  return (
    <>
      <div
        className="flex items-center gap-2 group relative"
        onClick={toggleLanguageMenu}
      >
        <Icon name="language-icon" size={24} />
        <p className="text-sm font-medium cursor-default group-hover:text-primary">
          {activeLanguage}
        </p>
        <div
          className={twMerge(
            "bg-white dark:bg-black-100 transition-all",
            "w-[232px] p-6 rounded-[8px] shadow-md",
            "hidden md:block absolute bottom-8 left-0 opacity-0 invisible",
            "group-hover:visible group-hover:opacity-100 "
          )}
        >
          <div className="grid grid-cols-1 gap-6">
            <SelectLanguage isOnlyShow />
          </div>
        </div>
      </div>

      {openLanguage && (
        <div className="z-20 md:hidden fixed bg-white dark:bg-black-100 top-0 left-0 w-full h-full  ">
          <div className="flex justify-end items-center h-[4rem] mr-6">
            <div onClick={toggleLanguageMenu}>
              <Icon name="close" size={24} />
            </div>
          </div>
          <div className="px-6 pb-6 grid grid-cols-[3fr_2fr] gap-6">
            <SelectLanguage />
            <SelectCurrency />
          </div>
        </div>
      )}
    </>
  );
};
