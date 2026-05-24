import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import Select from "@/components/ui/select";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const TradeFilter = (props: any) => {
  const [value, setValue] = useState('');
  const { options, layout, setLayout } = props;

  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-4 md:gap-0 justify-between items-center pb-6 md:pb-12 pt-6">
        <div className="flex items-center gap-2 order-2 md:order-1 w-full">
          <Select
            options={options}
            value={value}
            setValue={setValue}
            className="w-full md:w-[250px] h-10 bg-[rgb(242,243,245)] dark:bg-secondary rounded-lg"
            selectedOptionLabel="Symbol"
            selectedClass="text-black-100 dark:text-white-100 ml-[70%] md:ml-6 whitespace-nowrap"
            isSearchable
          />
          {[1,2].map((index) => (
            <div onClick={() => setLayout(index)} className={twMerge(
              "w-10 h-10 hidden md:flex items-center justify-center bg-transparent rounded-md cursor-pointer",
              layout === index && 'bg-[rgb(242,243,245)] dark:bg-secondary',
              index === 1 && 'ml-2'
              )}>
                <Icon
                  name={`grid-${index}`}
                  size={24}
                  className={twMerge(
                    layout !== index && 'text-[rgb(183,189,198)] dark:text-gray-200'
                  )}
                />
            </div>
            ))
          }
        </div>
        <div className="order-1 md:order-2 w-full md:w-auto">
          <Button
            appearance="primary"
            className="whitespace-nowrap flex items-center justify-center gap-2 h-10 w-full md:w-auto md:min-w-[140px] text-sm font-medium"
            >
              Trade Futures
              <Icon
                name="arrow-right"
                size={16}
                className="text-black-100"
              />
            </Button>
        </div>
      </div>
    </>
  )
}