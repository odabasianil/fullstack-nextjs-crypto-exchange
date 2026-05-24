'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
import Select from "@/components/ui/select"

export const Top10List = ({ options, item }: { options?: any; item: any }) => {
  const [value, setValue] = useState('')


  return (
    <div className='flex flex-col gap-2 border p-4 border-white-100 dark:border-secondary min-h-[552px] rounded-2xl'>
      <div className='p-2 flex items-center justify-between'>
        <div className='md:text-xl font-semibold'>{item?.title}</div>
        {options && <div>
          <Select
            options={options}
            value={value}
            setValue={setValue}
          />
        </div>}
      </div>
      <div className='flex-grow relative'>
        <div className='flex flex-col gap-2'>
          <div className='text-gray text-xs h-8 px-2 flex items-center'>
            <div className='min-w-[18px] flex-[18_1_0%]'/>
            <div className="min-w-[114px] flex-[114_1_0%]">Name</div>
            <div className="min-w-[82px] flex-[82_1_0%]">Price</div>
            <div className="min-w-[76px] flex-[76_1_0%] flex justify-end">24h Change</div>
          </div>
          {
            item.list.map((listItem: any, index: number) => (
              <Link href={listItem.link} className='text-sm p-2 flex items-center hover:white-200 rounded-[4px] dark:hover:bg-black-500'>
                <div className='text-gray text-xs min-w-[18px] flex-[18_1_0%]'>{index + 1}</div>
                <div className="min-w-[114px] flex-[114_1_0%] flex items-center gap-2">
                  <Image src={listItem.image} alt={listItem.name} width={24} height={24}/>
                  <div className='font-medium'>{listItem.symbol}</div>
                </div>
                <div className="min-w-[82px] flex-[82_1_0%]">{listItem.price}</div>
                <div className={twMerge("min-w-[76px] flex-[76_1_0%] flex justify-end", listItem.exchange.includes('-') ? 'text-error' : 'text-success')}>{listItem.exchange}</div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}