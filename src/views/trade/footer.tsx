'use client'

import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CookieModal } from "../cookie-modal";

export const TradeFooter = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState('No Preview');
  const [openCookie, setOpenCookie] = useState(false);

  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (settingsRef.current && !(settingsRef.current as any).contains(event.target)) {
        setOpenSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [settingsRef]);
  return (
    <>
      <div className="hidden md:flex items-center gap-1">
        <Icon
          name="connection"
          size={12}
          color="green"
        />
        <div className="text-green text-xs whitespace-nowrap">Stable connection</div>
      </div>
        <div className="z-20 bg-white-200 dark:bg-background cursor-pointer group relative md:ml-4" onClick={() => setOpenSettings(true)}>
          <Icon
            name="settings"
            size={16}
            className="text-gray-300 dark:text-gray group-hover:text-black-100 group-hover:dark:text-white-100"
          />
          {
            openSettings && (
              <div ref={settingsRef} className=" absolute bottom-full left-0 overflow-visible transform rounded-xl bg-white dark:bg-background shadow-lg py-2.5 w-[159px]">
                <div
                  onClick={() => setSelectedSetting('No Preview')}
                  className={twMerge(
                    "px-2.5 h-[38px] flex items-center justify-between hover:bg-white-100 hover:dark:bg-secondary text-sm text-gray-300 dark:text-gray",
                    selectedSetting === 'No Preview' && 'text-black-100 dark:text-white-100'
                  )}>
                    No Preview
                    {selectedSetting === 'No Preview' && <Icon name="check" size={16} />}
                  </div>
                <div
                  onClick={() => setSelectedSetting('Popular searches')}
                  className={twMerge(
                    "px-2.5 h-[38px] flex items-center justify-between hover:bg-white-100 hover:dark:bg-secondary text-sm text-gray-300 dark:text-gray",
                    selectedSetting === 'Popular searches' && 'text-black-100 dark:text-white-100'
                  )}>
                    Popular searches
                    {selectedSetting === 'Popular searches' && <Icon name="check" size={16} />}
                  </div>
                <div
                  onClick={() => setSelectedSetting('Favorites')}
                  className={twMerge(
                    "px-2.5 h-[38px] flex items-center justify-between hover:bg-white-100 hover:dark:bg-secondary text-sm text-gray-300 dark:text-gray",
                    selectedSetting === 'Favorites' && 'text-black-100 dark:text-white-100'
                  )}>
                    Favorites
                    {selectedSetting === 'Favorites' && <Icon name="check" size={16} />}
                  </div>
              </div>
            )
          }
        </div>
      <div className="flex flex-1 items-center h-4 overflow-hidden">
        <div className="hidden md:flex flex-1 overflow-hidden ">
          <div className="flex flex-nowrap w-full trade-footer-animate">
            {
              new Array(25).fill(0).map((_, i) => (
                <Link
                  href="#"
                  className="flex px-1"
                >
                  <div className="text-xs mr-1">DOGSUSDT</div>
                  <div className="text-green text-xs mr-1">+114.63%</div>
                  <div className="text-gray-300 dark:text-gray text-xs mr-3">0.0011723</div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
      <div className="flex items-center ml-4 pr-2">
        <div className="hidden md:block w-[1px] h-4 mr-2 bg-white-300 dark:bg-secondary" />
        <div className="text-xs h-4 relative cursor-pointer mx-2 flex items-center">
          Announcements
        </div>
        <div className="text-xs h-4 relative cursor-pointer mx-2 flex items-center" onClick={() => setOpenCookie(true)}>
          Cookie Preference
        </div>
        <div className="group text-xs h-4 relative cursor-pointer mx-2 hidden md:flex items-center">
          Download
          <div
            className={
              twMerge(
                "absolute invisible opacity-0 bottom-4 -left-10 py-2.5 w-[128px]",
                "bg-white dark:bg-black-100 shadow-lg rounded-2xl",
                "group-hover:visible group-hover:opacity-100",
              )
            }
          >
            <div className="cursor-pointer flex items-center px-2.5 hover:bg-white-100 hover:dark:bg-secondary h-10">
              <Icon name="windows-icon" size={20} className="text-gray-300 dark:text-gray" />
              <div className="text-xs mx-2">
                <div className="text-gray-300 dark:text-gray">Download for</div>            
                <div>Windows</div>
              </div>
            </div>

            <div className="cursor-pointer flex items-center px-2.5 hover:bg-white-100 hover:dark:bg-secondary h-10">
              <Icon name="apple-icon" size={20} className="text-gray-300 dark:text-gray" />
              <div className="text-xs mx-2">
                <div className="text-gray-300 dark:text-gray">Download for</div>            
                <div>MacOS</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs h-4 relative cursor-pointer mx-2 hidden md:flex items-center">
          Online Support
        </div>
      </div>
      <CookieModal
        open={openCookie}
        setOpen={setOpenCookie}
      />
    </>
  )
}