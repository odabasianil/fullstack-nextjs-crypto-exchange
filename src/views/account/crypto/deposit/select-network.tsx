'use client'

import { Icon } from "@/components/ui/icon"
import { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

export const SelectNetwork = (props: any) => {
  const { networks, selectedNetwork, setSelectedNetwork } = props;
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);

  const handleSelect = (network: any) => {
    setSelectedNetwork(network);
    setOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (popupRef.current && !(popupRef.current as any).contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);
  return (
    <>
      <div onClick={() => setOpen(!open)} className="cursor-pointer mt-1 relative flex justify-between items-center px-2.5 py-2.5 dark:bg-black-600 md:dark:bg-transparent bg-white-300 md:bg-transparent dark:border-secondary border-white-100 border h-[50px] w-full mb-2.5 rounded-lg hover:border-primary dark:hover:border-primary ">
        {
          !selectedNetwork ? (
            <div className="text-gray dark:text-gray-200 font-semibold">Select network</div>
          ) : (
            <div className="flex items-center gap-2 pl-2">
              <div className="text-gray-300 dark:text-gray text-sm mb-0.5">{selectedNetwork?.name}</div>
            </div>
          )
        }
        <Icon
          name="chevron-left"
          className={twMerge("text-gray dark:text-gray-200", open ? '-rotate-90' : 'rotate-90')}
        />
        {open && (
          <div ref={popupRef} className="z-50 absolute top-14 left-0 py-2 bg-white dark:bg-black-100 border border-white-200 dark:border-black-200 rounded-xl w-full max-h-[466px] overflow-y-auto">
            {
              networks.map((network: any) => (
                <div onClick={() => handleSelect(network)} className="cursor-pointer px-4 py-3 hover:bg-white-100 hover:dark:bg-secondary flex justify-between">
                  <div className="ml-2">
                    <div className="text-black-100 dark:text-white-100">{network.name}</div>
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </div>
    </>
  )
}