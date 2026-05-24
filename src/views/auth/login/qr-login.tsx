import { Icon } from "@/components/ui/icon"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const QrLogin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }


  return (
    <>
      <div
        onClick={handleClick}
        className={twMerge(
          isOpen ? "md:fixed" : "hidden",
          "z-10 top-0 left-0 w-full h-full"
          )}
        >
      </div>
      <div
        className={
          twMerge(
            "relative hidden md:block h-10 w-10 rounded-lg bg-white-200 dark:bg-black-100 cursor-pointer p-1",
            'hover:bg-white-200 hover:dark:bg-black-100',
            isOpen && 'bg-white-300 dark:bg-secondary'
          )}
        onClick={handleClick}
      >
        <Icon name="qr" size={32} />

        {
          isOpen && (
            <div className="absolute top-12 right-3 bg-white dark:bg-black-100 h-4 w-4 z-30 border-t border-l border-white-100 md:dark:border-secondary rotate-45"></div>
          )
        }
        <div
          onClick={(e) => e.stopPropagation()}
          className={twMerge(
            "z-20 shadow-md absolute top-14 -right-10 w-[425px] rounded-2xl bg-white dark:bg-black-100 cursor-default",
            "opacity-0 invisible transition-all duration-0",
            'border border-white-100 md:dark:border-secondary',
            isOpen && "opacity-100 visible"
            )}
          >
            <div className="p-10 w-full">
              <div className="flex">
                <div className="dark:bg-white w-[180px] h-[180px] flex items-center justify-center border border-white-100 md:dark:border-secondary rounded-2xl ">
                  <Image
                    src='/images/home/download-app.svg'
                    alt="qr"
                    width={148}
                    height={148}
                  />
                </div>
                <div className="w-[165px] h-[180px] flex items-center justify-end">
                  <Image
                    src='/images/qrcode-login-light.svg'
                    alt="qr"
                    width={150}
                    height={148}
                    className="dark:hidden"
                  />
                  <Image
                    src='/images/dark/qrcode-login-dark.svg'
                    alt="qr"
                    width={150}
                    height={148}
                    className="hidden dark:block"
                  />
                </div>
              </div>
              <div className="text-sm mt-6 text-center">
                Anında giriş yapmak için bu kodu 
                <Link
                  target="_blank"
                  href="/download"
                  className="text-primary-200 dark:text-primary mx-1"
                >
                  FAZ 3 uygulamasıyla
                </Link>
                tarayın.
              </div>
            </div>
        </div>
      </div>
    </>
  )
}