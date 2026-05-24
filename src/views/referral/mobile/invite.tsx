'use client'

import { Icon } from "@/components/ui/icon"
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link"
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/scss';
import { twMerge } from "tailwind-merge";


export const ReferralInvite = () => {
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const toast = useToast();

  return (
    <>
      <div className="px-8 pt-6">
        <div className="font-bold leading-9 text-[28px] text-center mx-auto whitespace-pre-line px-8">Refer a Friend Both Earn $100</div>
        <div className="mt-2 text-sm text-center max-w-[327px] mx-auto">Refer friends to deposit over $50, and both receive $100 in trading fee rebate vouchers. </div>
        <Link href="/referral" className="flex justify-center text-sm text-primary-100 mx-auto">
          Learn More
        </Link>

        <div className="my-6">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            className="overflow-x-auto"
          >
            <SwiperSlide>
              <div className="">
                <Image src="/images/referral/share-link.png" width={294} height={135} alt="banner" className="rounded-2xl" />
                <div className="text-sm mt-4">How referral works</div>
                <div className="font-semibold mt-">1. Share your referral link with friends.</div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="">
                <Image src="/images/referral/deposit-task.png" width={294} height={135} alt="banner" className="rounded-2xl" />
                <div className="text-sm mt-4">How referral works</div>
                <div className="font-semibold mt-">2.Invite your friends to sign up and deposit more than $50 within 14 days of registration</div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className={twMerge("h-[3px] w-6 bg-[#333B47]", activeSlide === 0 && "bg-gray-200 dark:bg-gray")} />
            <div className={twMerge("h-[3px] w-6 bg-[#333B47]", activeSlide === 1 && "bg-gray-200 dark:bg-gray")} />
          </div>
        </div>

        <div className="mt-8 w-full mx-auto">
          <div className="text-sm font-semibold leading-[22px]">
            Invite via
          </div>
          <div className="text-sm mt-4 rounded-xl border border-white-100 dark:border-black-400 flex justify-between items-center px-4 py-2">
            <div>Referral Code</div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => toast?.open('Copied to clipboard', 'check-circle', '', 'text-green')}>
              <div>YOUR_REFERRAL_CODE</div>
              <Icon name="copy" size={16} />
            </div>
          </div>
          <div className="text-sm mt-4 rounded-xl border border-white-100 dark:border-black-400 flex justify-between items-center px-4 py-2">
            <div>Referral Link</div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => toast?.open('Copied to clipboard', 'check-circle', '', 'text-green')}>
              <div>https://ww..80I4</div>
              <Icon name="copy" size={16} />
            </div>
          </div>
        </div>

        <div className="mt-8 w-full mx-auto">
          <div className="text-sm font-semibold leading-[22px]">
            Share to
          </div>
          <div className="flex mt-4 justify-between items-center overflow-x-auto">
            <div>
              <div className="bg-white rounded-full p-1">
                <Icon name="twitter" size={28} className="text-black" />
              </div>
              <div className="text-xs text-center mt-2">X</div>
            </div>
            <div>
              <div className="bg-white rounded-full p-1">
                <Icon name="twitter" size={28} className="text-black" />
              </div>
              <div className="text-xs text-center mt-2">X</div>
            </div>
            <div>
              <div className="bg-white rounded-full p-1">
                <Icon name="twitter" size={28} className="text-black" />
              </div>
              <div className="text-xs text-center mt-2">X</div>
            </div>
            <div>
              <div className="bg-white rounded-full p-1">
                <Icon name="twitter" size={28} className="text-black" />
              </div>
              <div className="text-xs text-center mt-2">X</div>
            </div>
            <div>
              <div className="bg-white rounded-full p-1">
                <Icon name="twitter" size={28} className="text-black" />
              </div>
              <div className="text-xs text-center mt-2">X</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}