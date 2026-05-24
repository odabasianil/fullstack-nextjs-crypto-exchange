'use client';

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next";

export const GetStarted = () => {
  const [number, setNumber] = useState('213,013,037');
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber((prev) => {
        const number = parseInt(prev.replace(/,/g, ''));
        return new Intl.NumberFormat().format(number + 1);
      })
    }
    , 1000)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-wrap pb-4 justify-center lg:justify-normal lg:pb-[0px] lg:pt-6 h-fit">
        <h1 className="mt-[0px] min-h-fit font-bold text-[32px] leading-10 lg:text-7xl mb-2 lg:mb-[1.5rem] text-center  lg:text-left" >
          <div className="text-primary-100">
            {number}
          </div>
          <div className="min-h-fit text-black-100 dark:text-white-100 leading-10 lg:leading-[76px]">
            <div>{t('home.get_started.title')}</div>
          </div>
        </h1>
        <div className="mb-[0px] flex flex-col lg:flex-row items-center gap-2 w-full">
          <Link
            href="/register"
          >
          <Button
            appearance="primary"
            className="px-8 min-w-[180px] font-medium"
            
          >
            {t('home.get_started.button')}
          </Button></Link>
        </div>
      </div>
      <div className="hidden lg:flex gap-12 items-center">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray">Veya Şununla Devam Edin:</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:bg-secondary border rounded-[10px] border-white-100 dark:border-secondary p-3">
              <Image
                src="/images/google-icon.png"
                width={24}
                height={24}
                alt="google"
              />
            </Link>
            <Link href="/" className="hover:bg-secondary border rounded-[10px] border-white-100 dark:border-secondary p-3">
              <Icon
                name="apple-icon"
                size={24}
                color="#fff"
                className="hidden dark:block"
              />
              <Icon
                name="apple-icon"
                size={24}
                className="block dark:hidden"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray">Uygulamayı İndir</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:bg-secondary border rounded-[10px] border-white-100 dark:border-secondary p-3">
              <Icon
                name="qr"
                size={24}
              />

            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}