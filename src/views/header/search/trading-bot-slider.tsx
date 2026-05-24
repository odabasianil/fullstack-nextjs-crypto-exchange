import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import { Icon } from "@/components/ui/icon";


export const TradingBotSlider = () => {

  return (
    <>
     <>
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm dark:text-white-100 text-black-200">Trading Bots</p>
          <div className="flex items-center gap-2">
            <div className="cursor-pointer hover:bg-secondary rounded-md" id="swiper-color-back-2">
              <Icon
                name="chevron-left"
                size={20}
                className="!text-gray hover:!text-white-100"
              />
            </div>
            <div className="cursor-pointer hover:bg-secondary rounded-md" id="swiper-color-forward-2">
              <Icon
                name="chevron-left"
                size={20}
                className="!text-gray hover:!text-white-100 transform rotate-180"
              />
            </div>
          </div>
        </div>
        <Swiper
          slidesPerView={3}
          modules={[Navigation]}
          spaceBetween={8}
          className="w-full max-w-[336px]"
          navigation={{
            nextEl: '#swiper-color-forward-2',
            prevEl: '#swiper-color-back-2'
          }}
        >
           {
            [1, 2, 3, 4,5,6,7].map((item) => (
              <SwiperSlide key={item}>
                    <div className="flex flex-col text-sm font-medium py-2 px-3 border border-white-100 dark:border-secondary rounded-md text-black-200 dark:text-white-100">
                      <div className="max-w-[80px] whitespace-nowrap">BTC/USDT</div>
                      <div className="mt-2 text-gray">ROI</div>
                      <div className="text-success ml-1">+1,78%</div>
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