import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import Image from "next/image";
import { Icon } from "@/components/ui/icon";

export const CopyTradingSlider = () => {

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm leading-[22px] text-black-200 dark:text-white-100">Copy Trading</p>
          <div className="flex items-center gap-2">
          <div className="cursor-pointer hover:bg-secondary rounded-md" id="swiper-color-back-3">
              <Icon
                name="chevron-left"
                size={20}
                className="!text-gray hover:!text-white-100"
              />
            </div>
            <div className="cursor-pointer hover:bg-secondary rounded-md" id="swiper-color-forward-3">
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
            nextEl: '#swiper-color-forward-3',
            prevEl: '#swiper-color-back-3'
          }}
        >
          {
            [1, 2, 3, 4].map((item) => (
              <SwiperSlide key={item} className="!grid !grid-cols-2 gap-2">
                {
                  [1,2,3,4].map((idx) => (
                    <div key={idx} className="text-sm font-medium py-2 px-3 border border-white-100 dark:border-secondary rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Image
                            src='/images/avatar.png'
                            width={32}
                            height={32}
                            className="rounded-md"
                            alt="avatar"
                          />
                          <div>
                            <div className="truncate max-w-[90px] leading-[22px] text-gray dark:text-white-100">User {idx}</div>
                            <div className="flex gap-1 items-center leading-[18px]">
                              <div>
                                <Icon name="users" size={12} color="text-gray" />
                              </div>
                              <div className="font-normal text-xs text-gray">112</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 leading-[22px]">
                          <div className="font-normal text-gray text-xs">ROI</div>
                          <div className="text-success">+890.31%</div>
                        </div>
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