"use client";
import { Icon } from "@/components/ui/icon";
import Image from "next/image";
import Link from "next/link";

export default function AccountIdentification() {
  return (
    <div className="pt-6 md:pt-0">
      <div className="font-semibold hidden md:block px-8 py-[28px] bg-white-200 dark:bg-background-200 text-[32px] leading-10 -mx-4">Identification</div>
      <div className="px-4 md:px-0 md:mx-4">
        <div className="md:mt-10 pb-10 border-b border-white-100 dark:border-gray-300 flex flex-col md:flex-row items-center w-full">
          <Image src="/images/user.png" width={64} height={64} alt="User" className="w-20 h-20 md:w-16 md:h-16 rounded-full mb-4 mb:mb-0 md:mr-4" />
          <div className="flex flex-col items-center md:items-start">
            <div className="text-2xl font-semibold">User-d4fc4</div>
            <div className="text-gray-300 dark:text-gray mb-2 text-sm md:hidden ">ID: 96744312</div>
            <div className="bg-primary text-black-100 text-sm py-0.5 mt-1 px-2 w-min rounded font-semibold">Verified</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <div className="block md:flex-[0_0_58.3%] md:max-w-[58.3%] border-b border-white-100 dark:border-gray-300 md:border-none pb-6 md:pb-0">
            <div className="md:text-xl font-semibold pt-8 mb-4">Account Limits</div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-sm text-gray-300 dark:text-gray">
                <Icon name="lock" size={16} />
                Fiat Deposit & Withdrawal Limits
              </div>
              <div className="text-sm dark:text-white-500">--</div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-sm text-gray-300 dark:text-gray">
                <Icon name="lock" size={16} />
                Crypto Deposit Limit
              </div>
              <div className="text-sm dark:text-white-500">--</div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-sm text-gray-300 dark:text-gray">
                <Icon name="lock" size={16} />
                Crypto Withdrawal Limit
              </div>
              <div className="text-sm dark:text-white-500">--</div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-sm text-gray-300 dark:text-gray">
                <Icon name="lock" size={16} />
                P2P Transaction Limits
              </div>
              <div className="text-sm dark:text-white-500">--</div>
            </div>
          </div>

          <div className="block md:flex-[0_0_33.3%] md:max-w-[33.3%]">
            <div className="md:text-xl font-semibold pt-8 mb-4">FAQ</div>
            <Link href="/faq" className="underline text-sm dark:text-white-500">
              Identity Verification
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}