import { Icon } from "@/components/ui/icon";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge"
import { getTabs } from "./sidebar";
import { useTranslation } from "react-i18next";



export const WithdrawMenu = ({ setOpenedMobileMenu }: { setOpenedMobileMenu?: any }) => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const TABS = getTabs(t);

  return (
    <>
      <div className="hidden md:flex p-3 justify-start items-center"></div>

      {
        TABS.map((item, index) => (
          <Link
            href={item.link}
            className={twMerge(
              "mb-2 dark:text-gray-900 text-white-1000 h-fit cursor-pointer border-transparent border-l-[3px] px-[15px] md:pr-0 md:pl-6 flex items-center justify-between md:dark:hover:bg-black-900 md:dark:hover:text-white-100 rounded-r-xl",
              pathname.includes(item.link) &&
              "dark:text-white-100 text-black-100 md:bg-gray-100 md:dark:bg-black-100",
            )}
          >
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
                size={32}
                className="md:hidden"
              />
              <div className="whitespace-nowrap font-semibold pl-2">{item.text}</div>
            </div>
            {
              item.text.includes('Fiat') && (
                <Icon
                  name="chevron-left"
                  size={20}
                  className="rotate-180 text-gray-300 dark:text-gray"
                />
              )
            }
          </Link>
        ))
      }

    </>
  )
}