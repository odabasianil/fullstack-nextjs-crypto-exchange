import Select from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const VolumeChart = (props: any) => {
  const { 
    title,
    col_1,
    val_1,
    col_2,
    val_2,
    col_3,
    val_3,
    col_4,
    val_4
  } = props;

  const options = [
    { label: 'Contract' },
    { label: 'National' }
  ];

  const options2 = [
    { label: 'All' },
    { label: '24-08-15' },
    { label: '24-08-16' },
    { label: '24-08-17' },
    { label: '24-08-18' },
    { label: '24-08-19' },
    { label: '24-08-20' },
    { label: '24-08-21' }
  ];
  

  const [value, setValue] = useState(options[0]);
  const [value2, setValue2] = useState(options2[0]);

  return (
    <>
      <div className="">
        <div className="w-full p-4 md:p-6 border border-[rgb(234,236,239)] dark:border-gray-300 rounded-2xl">
          <div className="mb-6">{title}</div>
          <div className="flex items-center gap-2 mb-[22px]">
            <Select
              options={options}
              value={value}
              setValue={setValue}
              className="w-[160px] md:w-[110px] h-9 bg-[rgb(242,243,245)] dark:bg-secondary rounded-lg"
              selectedClass="text-black-100 dark:text-white-100"
            />
            <Select
              options={options2}
              value={value2}
              setValue={setValue2}
              className="w-[160px] h-9 bg-[rgb(242,243,245)] dark:bg-secondary rounded-lg"
              selectedClass=" text-black-100 dark:text-white-100"
              selectedOptionLabel="Expiry"
            />
          </div>
          <div>
            <Image
              src='/images/markets/dark/oi-volume-chart.png'
              width={1075}
              height={220}
              alt="oi-volume-chart"
              className="hidden md:dark:block"
            />
            <Image
              src='/images/markets/oi-volume-chart.png'
              width={1075}
              height={220}
              alt="oi-volume-chart"
              className="hidden md:block md:dark:hidden"
            />
            <Image
              src='/images/markets/oi-volume-chart-mobile.png'
              width={315}
              height={220}
              alt="oi-volume-chart"
              className="dark:hidden md:hidden"
            />
            <Image
              src='/images/markets/dark/oi-volume-chart-mobile.png'
              width={315}
              height={220}
              alt="oi-volume-chart"
              className="hidden dark:block md:dark:hidden"
            />
          </div>
          <div className={twMerge(
            "mt-6 border-t border-[rgb(234,236,239)] dark:border-gray-300 flex flex-wrap items-center justify-between",
            !col_1 && 'border-none'
            )}>
            {col_1 && <div className="flex-[0_0_50%] md:flex-1 mt-6">
              <div className="mb-2 text-sm text-gray-300 dark:text-gray">{col_1}</div>
              <div>{val_1}</div>
            </div>}
            {col_2 && <div className="flex-[0_0_50%] md:flex-1 mt-6">
              <div className="mb-2 text-sm text-gray-300 dark:text-gray">{col_2}</div>
              <div>{val_2}</div>
            </div>}
            {col_3 && <div className="flex-[0_0_50%] md:flex-1 mt-6">
              <div className="mb-2 text-sm text-gray-300 dark:text-gray">{col_3}</div>
              <div>{val_3}</div>
            </div>}
            {col_4 && <div className="flex-[0_0_50%] md:flex-1 mt-6">
              <div className="mb-2 text-sm text-gray-300 dark:text-gray">{col_4}</div>
              <div>{val_4}</div>
            </div>}
          </div>
        </div>
      </div>
    </>
  )
  
}