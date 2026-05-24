'use client'

import Select from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge"

export const FuturesChart = ({item, layout}: {item: any; layout: number}) => {
  const [value, setValue] = useState('');
  return (
    <>
      <div className='h-[342px] flex flex-col'>
        <div
          className={
            twMerge(
              "flex items-center justify-between pb-4 md:pb-6",
              layout === 2 && 'flex-col gap-6 justify-start items-start'
            )}
          >
            <div className="font-medium">{item.title}</div>
            <Select
              options={item.options}
              className="m-2 ml-0 md:m-0 w-[120px] h-10 bg-[rgb(242,243,245)] dark:bg-secondary rounded-lg"
              value={value}
              setValue={setValue}
              selectedOptionLabel="Period"
              selectedClass="text-black-100 dark:text-white-100 whitespace-nowrap"
            />
        </div>
        <Image
          src={`${item.darkImg}-${layout}.png`}
          alt={item.title}
          width={layout === 2 ? 576 : 1200}
          height={layout === 2 ? 230 : 277}
          className={twMerge(
            "hidden dark:block",
            "w-[343px] h-[222px]",
            layout === 2 ? 'md:w-[576px] md:h-[277px]' : 'md:w-[1200px] md:h-[277px]'
          )}
        />
        <Image
          src={`${item.lightImg}-${layout}.png`}
          alt={item.title}
          width={layout === 2 ? 576 : 1200}
          height={layout === 2 ? 230 : 277}
          className={twMerge(
            "block dark:hidden",
            "w-[343px] h-[222px]",
            layout === 2 ? 'md:w-[576px] md:h-[277px]' : 'md:w-[1200px] md:h-[277px]'
          )}
        />
      </div>
    </>
  )
}