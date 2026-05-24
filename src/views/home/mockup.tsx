'use client';

import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const Mockup = () => {
  const tabs = [
    {
      text: 'Masaüstü',
      value: 'desktop',
      image: '/images/home/download-desktop-light.png',
      darkImage: '/images/home/dark/download-desktop-dark.png',
      width: 560,
      height: 538,
      isHiddenMobile: true
    },
    {
      text: 'Lite',
      value: 'lite',
      image: '/images/home/download-lite-light.svg',
      darkImage: '/images/home/dark/download-lite-dark.svg',
      width: 260,
      height: 538,
      isHiddenMobile: false
    },
    {
      text: 'Pro',
      value: 'pro',
      image: '/images/home/download-pro-light.svg',
      darkImage: '/images/home/dark/download-pro-dark.svg',
      width: 260,
      height: 538,
      isHiddenMobile: false
    }

  ];
  const [activeTab, setActiveTab] = useState<any>(tabs[0]);

  const handleChange = (tab: string) => {
    const selectedTab = tabs.find((t) => t.value === tab);
    setActiveTab(selectedTab);
  }


  return (
    <>
      <div className="flex flex-col items-center gap-6 md:gap-1">
        <h2 className="md:hidden text-2xl font-semibold text-center">Her yerden işlem yapın. Dilediğiniz yerden, dilediğiniz zaman.</h2>
        <Image
          src={activeTab.image}
          alt="mockup"
          width={activeTab.width}
          height={activeTab.height}
          className="dark:hidden !h-[538px] order-2 md:order-1"
        />
        <Image
          src={activeTab.darkImage}
          alt="mockup"
          width={activeTab.width}
          height={activeTab.height}
          className="hidden dark:block !h-[538px] order-2 md:order-1"
        />
        <div className="flex items-center justify-center gap-6 order-3 md:hidden">
          <Image
            src='/images/app-store.png'
            alt="app-store"
            width={135}
            height={40}
          />
          <Image
            src='/images/google-play.png'
            alt="google-play"
            width={135}
            height={40}
          />
        </div>
        <div className="flex items-center md:gap-6 border-b border-secondary order-1 md:order-2 mt-4 md:mt-0"> 
        {
          tabs.map((tab) => (
            <div 
              key={tab.value}
              className={(twMerge(
                "pt-5 cursor-pointer text-gray min-w-12 text-center",
                tab.isHiddenMobile && "hidden md:block",
                activeTab.value === tab.value && "text-black-100 dark:text-white-100"
              ))}
              onClick={() => handleChange(tab.value)}
            >
              <p className="pb-4">{tab.text}</p>
              <div className={twMerge(
                "w-auto h-0.5 bg-primary-100 mx-auto opacity-0",
                activeTab.value === tab.value && "opacity-100"
                )} />
            </div>
          ))
        }
        </div>
      </div>      
    </>
  )
}