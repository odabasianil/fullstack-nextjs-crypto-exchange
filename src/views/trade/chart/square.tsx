import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface SquareProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Square = (props: SquareProps) => {
  const { isOpen, setIsOpen } = props;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('community');
  const [selectValue, setSelectValue] = useState('Latest');

  const handleTab = (name: string) => {
    setSelectedTab(name);
  }

  if (!isOpen) {
    return;
  }

  return (
    <div className={twMerge(
      "hidden md:flex flex-col fixed left-0 bottom-0 z-50 bg-white dark:bg-background-500 w-[388px] overflow-hidden h-[400px] rounded-2xl shadow-md ",
      isFullScreen && 'h-[calc(100vh-84px)]',
    )}>
      <div className="flex items-center justify-between cursor-move p-4 border-b border-b-black-300 dark:border-b-secondary">
        <Link href="/square" className="flex items-center gap-2 cursor-pointer">
          <span>FAZ 3 Square</span>
          <Icon
            name="square"
            size={16}
          />
        </Link>
        <div className="flex items-center gap-2 p-1">
          <div className="cursor-pointer" onClick={() => setIsFullScreen(!isFullScreen)}>
            <Icon
              name={isFullScreen ? "mini-screen" : "full-screen"}
              size={16}
            />
          </div>
          <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
            <Icon
              name="close"
              size={16}
            />
          </div>
        </div>
      </div>

      <div className={twMerge('h-[calc(100%-52px)] overflow-y-auto relative w-full')}>
        <div className="p-4 border-y border-black-300 dark:border-secondary w-full">
          <div className="flex items-center justify-between text-xs mb-4 w-full">
              <span>How do you feel about BTC today？</span>
              <span className="text-gray-100 dark:text-[#4F5867]">3,651 joined</span>
          </div>
          <div className="flex items-center rounded overflow-hidden w-full gap-2">
            <button className={twMerge(
              "bg-error error-skew-button -skew-x-[15deg] border-none w-[34%] min-w-[45px] min-h-8 py-1.5 px-3 text-ellipsis whitespace-nowrap text-xs flex items-center gap-1"
            )}>
              <Icon name="downgrade" size={16} />
              <span className="skew-x-[15deg]">34%</span>
            </button>
            <button className={twMerge(
              "relative success-skew-button -skew-x-[15deg] bg-success-100 border-none w-[66%] min-w-[45px] min-h-8 py-1.5 px-3 text-ellipsis whitespace-nowrap text-xs flex justify-end items-center gap-1"
            )}>
              <Icon name="upgrade" size={16} />
              <span className="skew-x-[15deg]">bullish 66%</span>
            </button>
          </div>
        </div>


        <div className="pr-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm font-medium px-4 py-3">
            <div className={twMerge(
              "cursor-pointer text-black-300 dark:text-gray",
              selectedTab === 'community' && 'text-dark-100 dark:text-white-100'
            )} onClick={() => handleTab('community')}>Community</div>
            <div className={twMerge(
              "cursor-pointer text-black-300 dark:text-gray",
              selectedTab === 'market' && 'text-dark-100 dark:text-white-100'
            )} onClick={() => handleTab('market')}>Market</div>
          </div>
          <Select
            options={[
              'Trending',
              'Latest'
            ]}
            value={selectValue}
            setValue={setSelectValue}
            wrapperClassName="!border-none !bg-transparent justify-end"
            valueClass="!pr-0 text-black-100 dark:text-white-100 text-xs"
          />

        </div>

        <div className="pb-5">
          <div className="overflow-y-auto">
            {
              new Array(5).fill(0).map((_, index) => (
                <div className="p-4 border-b border-black-300 dark:border-secondary">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src='/avatar.png'
                        width={32}
                        height={32}
                        className="rounded-full"
                        alt="avatar"
                      />
                      <div>
                        <div className="font-medium">User Name</div>
                        <div className="mt-1 text-xs text-black-300 dark:text-gray">1m</div>
                      </div>
                    </div>
                    <div className="rounded-full hover:bg-primary">
                      <Icon
                        name="more"
                        size={16}
                        className="cursor-pointer text-black-300 dark:text-gray "
                      />
                    </div>
                  </div>
                  <div className="text-sm leading-6">
                    <p className="line-clamp-5">Bitcoin fell first and then rose on Monday, completing the short-term adjustment and rising again. It has not yet broken through the 61,500 pressure.</p>
                    <Image
                      src='/images/home/dark/download-desktop-dark.png'
                      width={344}
                      height={212}
                      className="rounded-2xl mt-2 max-h-[212px]"
                      alt="square"
                    />
                  </div>
                  <div className="grid grid-cols-4 grid-flow-row justify-between items-center">
                    <div className="group flex justify-center items-center cursor-pointer gap-0.5">
                      <Icon
                        name="like"
                        size={28}
                        className="text-black-300 dark:text-gray group-hover:bg-primary p-1 group-hover:text-primary-100 rounded-full"
                      />
                      <span className="text-xs text-black-300 dark:text-gray group-hover:text-primary-100">0</span>
                    </div>
                    <div className="group flex justify-center items-center cursor-pointer gap-0.5">
                      <Icon
                        name="comment"
                        size={28}
                        className="text-black-300 dark:text-gray group-hover:bg-primary p-1 group-hover:text-primary-100 rounded-full"
                      />
                      <span className="text-xs text-black-300 dark:text-gray group-hover:text-primary-100">0</span>
                    </div>
                    <div className="group flex justify-center items-center cursor-pointer gap-0.5">
                      <Icon
                        name="share"
                        size={28}
                        className="text-black-300 dark:text-gray group-hover:bg-primary p-1 group-hover:text-primary-100 rounded-full"
                      />
                      <span className="text-xs text-black-300 dark:text-gray group-hover:text-primary-100">0</span>
                    </div>
                    <div className="group flex justify-center items-center cursor-pointer gap-0.5">
                      <Icon
                        name="forward"
                        size={28}
                        className="text-black-300 dark:text-gray group-hover:bg-primary p-1 group-hover:text-primary-100 rounded-full"
                      />
                      <span className="text-xs text-black-300 dark:text-gray group-hover:text-primary-100">0</span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {selectedTab === 'community' && <div className="px-4 py-3 border-t border-black-300 dark:border-secondary sticky bottom-0 bg-white dark:bg-background-500">
          <div className="flex items-center">
            <Input
              placeholder="Share your thoughts"
              className="w-full dark:bg-secondary border-none h-10 text-sm rounded-tl-[10px] rounded-bl-[10px]"
              wrapperClassName="w-full"
            />
            <Button
              className="h-10 w-[72px] rounded-l-none relative right-1 font-medium rounded-tr-[10px] rounded-br-[10px]"
            >
              Post
            </Button>
          </div>
        </div>}
      </div>

    </div>
  )
}