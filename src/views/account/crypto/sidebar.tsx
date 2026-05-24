'use client'

import { Icon } from "@/components/ui/icon"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge"
import { WithdrawMenu } from "./menu";
import { useTranslation } from "react-i18next";

export const getTabs = (t: any) => [
  {
    icon: 'deposit-crypto',
    text: t('account.deposit_crypto'),
    link: '/wallet/account/deposit/crypto/BTC',
  },
  {
    icon: 'withdraw-crypto',
    text: t('account.withdraw_crypto'),
    link: '/wallet/account/withdrawal/crypto/BTC',
  },
  {
    icon: 'deposit-fiat',
    text: t('account.deposit_fiat'),
    link: '/crypto/deposit',
  },
  {
    icon: 'deposit-fiat',
    text: t('account.withdraw_fiat'),
    link: '/crypto/withdraw',
  },
]

export const WithdrawSidebar = () => {
  const pathname = usePathname();
  const [openedMobileMenu, setOpenedMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setOpenedMobileMenu(!openedMobileMenu);
  }

  useEffect(() => {
    if (openedMobileMenu) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }, [openedMobileMenu])

  return (
    <>
      <div className="w-full md:hidden">
        <div className="py-3 px-[15px] border-b borde-white-100 dark:border-secondary flex items-center justify-between" onClick={toggleMobileMenu} >
          <div className="flex items-center gap-2">
            <Icon name={'withdraw-crpyto'} size={24} />
            <div className="font-semibold">Withdraw Crypto</div>
          </div>
          <div>
            <Icon name="chevron-left" className={twMerge(openedMobileMenu ? "rotate-90" : "-rotate-90")} size={24} />
          </div>
        </div>
        {
          openedMobileMenu && (
            <div className="w-full min-w-[100%] max-w-[100%] fixed h-screen z-50 bg-white dark:bg-background">
              <WithdrawMenu setOpenedMobileMenu={setOpenedMobileMenu} />
            </div>
          )
        }
      </div>
      <div className="hidden md:block lg:w-[240px] lg:min-w-[240px] lg:max-w-[240px] md:w-[200px] md:min-w-[200px] md:max-w-[200px] w-full min-w-[100%] max-w-[100%]">
        <WithdrawMenu />
      </div>
    </>
  )
}