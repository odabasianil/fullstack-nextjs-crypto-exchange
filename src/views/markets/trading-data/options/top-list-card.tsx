import Select from "@/components/ui/select"
import { useState } from "react";

export const TopListCard = (props: any) => {
  const { title, description, col_1, col_2, data } = props
  const options = [
    { label: 'Contract' },
    { label: 'National' }
  ];
  const [value, setValue] = useState(options[0]);

  const getCurrentFormattedDate = () => {
    const date = new Date();
    
    const day = String(date.getDate()).padStart(2, '0'); // 14
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 11
    const hours = String(date.getHours()).padStart(2, '0'); // 14
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 29
  
    return `${day}-${month} ${hours}:${minutes}`;
  }

  return (
    <div className="w-full h-full py-4 px-6 border border-[rgb(234,236,239)] dark:border-gray-300 rounded-lg">
      <div className="mb-6 flex flex-col gap-2">
        <div>{title}</div>
        <div className="text-sm text-gray-300 dark:text-gray">{getCurrentFormattedDate()}</div>
      </div>
      <div className="mb-5">
        <Select
            options={options}
            value={value}
            setValue={setValue}
            className="md:w-[110px] h-9 bg-[rgb(242,243,245)] dark:bg-secondary rounded-lg"
            selectedClass="text-black-100 dark:text-white-100"
          />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between mb-0.5 text-xs text-gray-300 dark:text-gray">
          <div className="whitespace-nowrap flex-[0_0_60%]">{col_1}</div>
          <div className="whitespace-nowrap flex-[0_0_40%] text-right">{col_2}</div>
        </div>
        {
          data.map((item: any, index: number) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center flex-[0_0_60%]">
                <div className="mr-[10px] text-gray-300 dark:text-gray">{index + 1}</div>
                <div className="whitespace-nowrap">{item.symbol}</div>
              </div>
              <div className="flex-[0_0_40%] text-right">{item.value}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}