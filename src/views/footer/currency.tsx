import { Icon } from "@/components/ui/icon"
import { twMerge } from "tailwind-merge"
import { SelectCurrency } from "../header/nav/select-currency"

export const FooterCurrency = (props: any) => {
  const { toggleLanguageMenu } = props;

  return (
    <>
      <div className="flex items-center gap-2 relative group" onClick={toggleLanguageMenu}>
        <Icon
          name='currency-icon'
          size={24}
        />
        <p className="text-sm font-medium cursor-default group-hover:text-primary">USD-$</p>
        <div className={twMerge(
            "bg-white dark:bg-black-100 transition-all",
            "w-[232px] p-6 rounded-[8px] shadow-md",
            "hidden md:block absolute bottom-8 left-0 opacity-0 invisible",
            "group-hover:visible group-hover:opacity-100"
          )}
        >
          <div className="grid grid-cols-1 gap-6">
            <SelectCurrency isOnlyShow />
          </div>
        </div>
      </div>
    </>
  )
}