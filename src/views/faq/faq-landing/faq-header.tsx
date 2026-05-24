"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const FaqLandingHeader = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <div className="flex flex-col">
      <div className="md:px-6 py-6 px-4  max-w-[1248px] relative m-auto w-full">
        <div className="flex flex-col items-start">
          <div className="flex wrap justify-between">
            <div className="md:text-[40px] md:leading-[48px] md:font-medium text-2xl font-medium dark:text-gray-800 text-black-100 pr-[80px]">
              FAQ
            </div>
          </div>
        </div>
      </div>
      <div className="lg:py-[40px] md:px-6 px-4 md:py-[32px] relative w-full max-w-[1248px] py-6 m-auto">
        <div className="flex flex-col">
          <div className="lg:text-[28px] lg:leading-[36px] lg:pb-8 lg:font-semibold md:font-semibold md:pb-6 text-xl pb-4 font-medium dark:text-gray-800 text-black-100">
            How can we help you?
          </div>
        </div>
        <div className="md:block hidden">
          <div className="">
            <div className="pr-2 py-2 mt-1 flex items-center max-w-[588px] bg-white-300 dark:bg-black-900 rounded-lg border-white-100">
              <Input
                type="text"
                placeholder="Search help articles"
                value={value}
                onChange={handleChange}
                label={
                  <Icon
                    name="search-2"
                    size={28}
                    color="transparent"
                    className="text-gray-100 dark:text-gray-600 font-semibold"
                  />
                }
                wrapperClassName="w-full"
                className="pl-[50px] w-full placeholder:font-medium placeholder:text-gray-100 bg-transparent border-none  rounded-none  text-xl  placeholder:dark:text-gray-600 h-fit"
                isClearable
                clearIconSize={16}
              />
              <div className="mx-1">
                <Button
                  type="submit"
                  appearance="primary"
                  className=" mr-[-4px] px-4 py-[10px] font-normal leading-0 text-base min-w-[108px] h-[36px] rounded-[4px] text-background"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden block">
          <form action="">
            <div className="h-9 rounded-full grid items-center transition-all duration-150 ease-out  will-change-[width,background-color] dark:bg-background-200 bg-white-200 grid-cols-[24px_1fr_16px] p-[6px_12px] w-full">
              <Icon
                name="search-2"
                size={24}
                color="transparent"
                className="text-white-500 dark:text-gray-600 font-semibold"
              />
              <input
                type="text"
                placeholder="Search help articles"
                className="bg-transparent px-2 placeholder:dark:text-white-100 placeholder:text-white-500 text-sm outline-none caret-primary-100"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
