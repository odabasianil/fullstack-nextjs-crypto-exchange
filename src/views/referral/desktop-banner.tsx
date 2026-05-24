'use client'

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

export const ReferralDesktopBanner = () => {
  const toast = useToast();

  return (
    <>
      <div
        className={twMerge(
          "bg-cover bg-center bg-no-repeat bg-[url('/images/referral/referral-background-desktop.png')] dark:bg-[url('/images/referral/referral-background-desktop-dark.png')]",
          "bg-white dark:bg-background-200",
        )}
      >
        <div className="container mx-auto max-w-[1248px] w-full md:pb-[82px] flex items-center justify-between">
          <div className="pt-12">
            <div className="text-[48px] font-semibold leading-[56px] mb-4">
              Refer Friends. <br /> Get 100 USD Equivalent Trading Fee Credit Each.
            </div>
            <Link href={"/"} className="flex items-center gap-1">
              <Icon name="faq-book" size={24} />
              <div className="text-sm ml-1">View referral rules</div>
              &gt;
            </Link>
          </div>
          <div className="w-max flex justify-end">
            <div className="bg-white dark:bg-background-200 p-8 mt-6 rounded-2xl min-w-[502px]">
              <div className="flex items-center justify-between rounded-md px-3 py-3.5 mb-4 bg-white-100 dark:bg-secondary">
                <div>Referral ID</div>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => toast?.open('Copied to clipboard', 'check-circle', '', 'text-green')}>
                  <div>YOUR_REFERRAL_CODE</div>
                  <Icon name="copy" size={20} />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md px-3 py-3.5 mb-4 bg-white-100 dark:bg-secondary">
                <div>Referral Link</div>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => toast?.open('Copied to clipboard', 'check-circle', '', 'text-green')}>
                  <div>https://ww...80I4</div>
                  <Icon name="copy" size={20} />
                </div>
              </div>
              <Button className="w-full font-semibold">
                Invite Friends
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}