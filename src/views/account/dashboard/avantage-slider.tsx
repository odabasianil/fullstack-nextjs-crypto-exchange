'use client'

import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/scss';

export const AvantageSlider = () => {

  return (
    <>
      <div className="w-max md:border border-white-100 dark:border-secondary rounded-2xl p-6">
        <Swiper
          slidesPerView={1}
          className="w-[50%]"
        >
          <SwiperSlide>
            <div className="flex items-center justify-between">
              <div>Earn up to 0.018 BTC</div>
              <div>
                <Image src="/images/transfer.svg" width={64} height={64} alt="image" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-between">
              <div>
                <div>Trade crypto with advanced tools</div>
                <div className="flex items-center text-sm">
                  BTC/USDT
                  <div className="text-green">$57i908 +4.74%</div>
                </div>
              </div>
              <div>
                <Image src="/images/transfer.svg" width={64} height={64} alt="image" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  )
}