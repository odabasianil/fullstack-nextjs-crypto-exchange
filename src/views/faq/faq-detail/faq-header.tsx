"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export const FaqHeader = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  return (
    <>
      <div className="lg:py-6 lg:flex-row md:px-10 md:py-6 md:flex-col px-4 py-6 justify-between flex flex-col">
        <Link
          href="/faq"
          className="lg:mb-0 md:mb-5 text-sm font-semibold mb-5"
        >
          <div className="md:text-[40px] md:leading-[48px] text-black-100 dark:text-gray-800 text-2xl">
            FAQ
          </div>
        </Link>
        <div className="lg:w-[588px] md:w-full md:max-w-[588px] w-full">
          <div className="">
            <div className="md:pr-2 md:py-2 pr-1 py-1 mt-1 flex items-center bg-white-200 dark:bg-background-900 rounded-lg border-white-100">
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
                className="pl-[50px] w-full placeholder:font-medium placeholder:text-gray-100 bg-transparent border-none  rounded-none  md:text-xl text-sm  placeholder:dark:text-gray-600 h-fit"
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
      </div>
    </>
  );
};
