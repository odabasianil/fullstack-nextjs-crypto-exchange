'use client'

import { usePathname } from "next/navigation";
import { AccountMenu } from "./menu"
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { twMerge } from "tailwind-merge";

export const ACCOUNT_MENU = [
  {
    icon: 'home',
    text: 'Dashboard',
    link: '/me/dashboard',
  },
  {
    icon: 'assets',
    text: 'Assets',
    link: '',
    submenus: [
      {
        text: 'Overview',
        link: '/me/wallet/account/overview',
      },
      {
        text: 'Spot',
        link: '/me/wallet/account/main',
      },
      {
        text: 'Futures',
        link: '/me/wallet/account/futures',
      },
    ],
  },
  {
    icon: 'document',
    text: 'Orders',
    link: '',
    submenus: [
      {
        text: 'Spot Order',
        link: '/me/orders/exchange',
      },
      {
        text: 'Futures Order',
        link: '/me/orders/exchange',
      }
    ],
  },
  {
    icon: 'referral',
    text: 'Referral',
    link: '/activity/referral/offers'
  },
  {
    icon: 'user',
    text: 'Account',
    link: '',
    submenus: [
      {
        text: 'Identification',
        link: '/me/settings/kyc',
      },
      {
        text: 'Security',
        link: '/me/security',
      },
      {
        text: 'Payment',
        link: '/me/payment/c2c',
      },
      {
        text: 'API Management',
        link: '/me/settings/api-management',
      },
      {
        text: 'Account Statement',
        link: '/me/wallet/account/statement',
      },
      {
        text: 'Financial Reports',
        link: '/me/financial-reports',
      },
    ],
  },
  {
    icon: 'settings-2',
    text: 'Settings',
    link: '/me/settings/preference'
  }
]

export const AccountSidebar = () => {
  const pathname = usePathname();
  const [openedMobileMenu, setOpenedMobileMenu] = useState(false);

  const isActiveLink = ACCOUNT_MENU.find((item) => {
    if (item?.submenus) {
      const activeSubmenu = item.submenus.find((subitem) => subitem.link === pathname);
      if (activeSubmenu) {
        return activeSubmenu;
      }
    }

    if (item.link === pathname) {
      return item;
    }
  })

  const activeMenuText = !isActiveLink?.submenus ? isActiveLink?.text : isActiveLink?.submenus.find((subitem) => subitem.link === pathname)?.text;

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
            <Icon name={isActiveLink?.icon} size={24} />
            <div className="font-semibold">{activeMenuText}</div>
          </div>
          <div>
            <Icon name="chevron-left" className={twMerge(openedMobileMenu ? "rotate-90" : "-rotate-90")} size={24} />
          </div>
        </div>
        {
          openedMobileMenu && (
            <div className="w-full min-w-[100%] max-w-[100%] fixed h-screen z-50 bg-white dark:bg-background">
              <AccountMenu setOpenedMobileMenu={setOpenedMobileMenu} />
            </div>
          )
        }
      </div>
      <div className="hidden md:block lg:w-[240px] lg:min-w-[240px] lg:max-w-[240px] md:w-[200px] md:min-w-[200px] md:max-w-[200px] w-full min-w-[100%] max-w-[100%]">
        <AccountMenu />
      </div>
    </>
  )
}