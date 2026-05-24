import { Icon } from "@/components/ui/icon"
import { NoResult } from "@/views/crypto/payment/no-result";
import Image from "next/image";
import Link from "next/link"
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AssetsTable } from "./assets-table";

const tabs = ['Assets', 'Positions'];

export const FuturesTables = () => {
  const [selectedSubTab, setSelectedSubTab] = useState(tabs[0]);

  return (
    <>
      <div className="md:border-4 border-white-100 dark:border-secondary rounded-2xl px-4 md:p-6 mb-16 md:mb-6"> 
        <div className="flex items-center gap-6 pb-4">
          {
            tabs?.map(tab => (
              <div
                className={twMerge(
                  "relative cursor-pointer text-gray-300 dark:text-gray font-semibold h-8",
                  selectedSubTab === tab && "text-black-100 dark:text-white-100"
                )}
                onClick={() => setSelectedSubTab(tab)}
              >
                {tab}
                {selectedSubTab === tab && (<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-[3px] bg-primary-100 " />)}
              </div>
            ))
          }
        </div>
        { selectedSubTab === 'Assets' && (<AssetsTable />) }

        {
          selectedSubTab === 'Positions' && (
            <div className="h-[400px] flex items-center justify-center">
              <NoResult
                width={72}
                height={72}
                imageClass="mb-0"
              />
            </div>
          )
        }

      </div>
    </>
  )
}