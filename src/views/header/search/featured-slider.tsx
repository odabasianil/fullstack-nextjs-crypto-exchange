import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import { Icon } from "@/components/ui/icon";

export const FeaturedSlider = () => {

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm leading-[22px] dark:text-white-100 text-black-200">Hot Trading</p>
          <div className="flex items-center gap-2">
          <div className="cursor-pointer hover:bg-secondary rounded-md" id="swiper-color-back">
              <Icon
                name="chevron-left"
                size={20}
                className="!text-gray hover:!text-white-100"
              />
            </div>
            <div className="cursor-pointer hover:bg-secondary rounded-md" id="swiper-color-forward">
              <Icon
                name="chevron-left"
                size={20}
                className="!text-gray hover:!text-white-100 transform rotate-180"
              />
            </div>
          </div>
        </div>
        <Swiper
          slidesPerView={1}
          modules={[Navigation]}
          className="max-w-[336px]"
          navigation={{
            nextEl: '#swiper-color-forward',
            prevEl: '#swiper-color-back'
          }}
        >
          {
            [1, 2, 3, 4].map((item, index) => (
              <SwiperSlide key={"swiper-"+index} className="!grid !grid-cols-2 gap-2">
                {
                  [1,2,3,4,5,6].map((idx, index) => (
                    <div key={"item-"+index} className="flex items-center text-sm leading-[22px] font-medium py-1 px-2 border border-white-100 dark:border-secondary rounded-md text-black-200 dark:text-white-100">
                      <div className="text-xs mr-2">{idx}</div>
                      <div className="max-w-[70px] whitespace-nowrap">BTC/USDT</div>
                      <div className="text-error ml-1">-12,78%</div>
                    </div>
                ))}
              </SwiperSlide>
            ))
          }

        </Swiper>
      </div>
    </>
  )
}