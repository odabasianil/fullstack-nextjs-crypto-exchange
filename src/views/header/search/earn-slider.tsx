import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import data from '@/data/search/earn.json'
import Image from "next/image";
import { Icon } from "@/components/ui/icon";

export const EarnSlider = () => {

  return (
    <>
     <>
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm leading-[22px] text-black-200 dark:text-white-100 ">Earn</p>
          <div className="flex items-center gap-2">
          <div className="cursor-pointer hover:bg-secondary rounded-md" id="swiper-color-back-4">
              <Icon
                name="chevron-left"
                size={20}
                className="!text-gray hover:!text-white-100"
              />
            </div>
            <div className="cursor-pointer hover:bg-secondary rounded-md" id="swiper-color-forward-4">
              <Icon
                name="chevron-left"
                size={20}
                className="!text-gray hover:!text-white-100 transform rotate-180"
              />
            </div>
          </div>
        </div>
        <Swiper
          slidesPerView={2}
          modules={[Navigation]}
          spaceBetween={8}
          className="w-full max-w-[336px]"
          navigation={{
            nextEl: '#swiper-color-forward-4',
            prevEl: '#swiper-color-back-4'
          }}
        >
           {
            data.map((item, index) => (
              <SwiperSlide key={index}>
                    <div className="flex flex-col text-sm leading-[22px] font-medium py-2 px-3 border border-white-100 dark:border-secondary rounded-md">
                      <Image
                        src={item?.image}
                        width={32}
                        height={32}
                        className="rounded-md mb-1"
                        alt="icon"
                      />
                      <div className="text-base max-w-[80px] whitespace-nowrap mb-2 dark:text-white-100 text-black-200">{item?.symbol}</div>
                      <div className="text-gray text-xs">Tah. APR</div>
                      <div className="text-success ml-1">{item?.apr}</div>
                    </div>
              </SwiperSlide>
            ))
          }

        </Swiper>
      </div>
    </>
    </>
  )
}