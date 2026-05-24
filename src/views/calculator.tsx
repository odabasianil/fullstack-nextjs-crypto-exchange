import { Icon } from "@/components/ui/icon";
import { RightModal } from "@/components/ui/right-modal";
import Link from "next/link";
import { useState } from "react";
import { MarginCalculator } from "./margin-calculator";
import { Modal } from "@/components/ui/modal";
import { VideoModal } from "@/components/ui/video-modal";

export const Calculator = () => {
  const [openCalculator, setOpenCalculator] = useState(false);
  const [openMarginCalculator, setOpenMarginCalculator] = useState(false);
  const [openSpotTutorial, setOpenSpotTutorial] = useState(false);

  const linkItems = [
    {
      isLink: true,
      title: 'Margin Data',
      description: 'Margin data you need to know',
      link: '/en/margin-fee'
    },
    {
      isLink: true,
      title: 'Insurance Fund',
      description: 'Introduction of Insurance fund',
      link: '/en/support/faq/360033162192'
    },
    {
      isLink: true,
      title: 'Margin Guide',
      description: 'FAZ 3 Margin overview',
      link: '/en/margin-trading'
    },
    {
      isLink: false,
      title: 'Calculator',
      onClick: () => {
        setOpenMarginCalculator(true);
      }
    },
    {
      isLink: true,
      title: 'Portfolio Margin Data',
      description: 'Portfolio Margin Data you need to know',
      link: '/en/futures/trading-rules/perpetual/portfolio-margin/collateral-ratio'
    },
    {
      isLink: true,
      title: 'FAQ',
      description: 'Most popular questions',
      link: '/support/faq'
    }
  ]

  return (
    <>
      <div className="flex justify-start items-center" onClick={() => setOpenCalculator(true)}>
        <span className="cursor-pointer underline decoration-dashed text-xs w-[80px] text-black-300 dark:text-gray text-left">Calculator</span>
      </div>
      <RightModal
        open={openCalculator}
        setOpen={setOpenCalculator}
        title="Data & Info"
        showCloseButton
        className="w-[315px] md:w-[400px] right-0"
      >
        <div className="mx-4 pt-4 pb-2 border-b border-b-white-300 dark:border-secondary ">
          <div onClick={() => setOpenSpotTutorial(true)} className="-mx-4 px-4 py-2.5 cursor-pointer hover:bg-white-200 dark:hover:bg-secondary">
            <div className="text-sm leading-[22px] flex items-center gap-1">
              <div>Spot Tutorial</div>
              <Icon
                name="play"
                size={16}
              />
            </div>
            <div className="text-xs text-gray-300 dark:text-gray">Learn Spot trading in 3 mins</div>
          </div>
          <div onClick={() => setOpenSpotTutorial(true)} className="-mx-4 px-4 py-2.5 cursor-pointer hover:bg-white-200 dark:hover:bg-secondary">
            <div className="text-sm leading-[22px] flex items-center gap-1">
              <div>Margin Tutorial</div>
              <Icon
                name="play"
                size={16}
              />
            </div>
            <div className="text-xs text-gray-300 dark:text-gray">Learn Margin trading in 3 mins</div>
          </div>
        </div>
        <div className="py-2">
          {linkItems.map((item: any) => 
          item?.isLink ? (
            <Link
              href={item.link}
              target="_blank"
              className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-white-200 dark:hover:bg-secondary"
            >
              <div className="text-sm leading-[22px]">
                <div>{item.title}</div>
                <div className="text-xs text-gray-300 dark:text-gray">{item.description}</div>
              </div>
              <Icon
                name="chevron-left"
                size={16}
                className="rotate-180"
              />
            </Link>
            ) : 
            <div onClick={item.onClick} className="text-sm leading-[22px] flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-white-200 dark:hover:bg-secondary">
              <div>{item.title}</div>
              <Icon
                name="chevron-left"
                size={16}
                className="rotate-180"
              />
            </div>
          )}
        </div>
      </RightModal>
      <MarginCalculator
        open={openMarginCalculator}
        setOpen={setOpenMarginCalculator}
      />
      <VideoModal
        open={openSpotTutorial}
        setOpen={setOpenSpotTutorial}
        title="Welcome to FAZ 3 Spot"
        poster="/images/spot-tutorial.webp"
        video="/video.mp4"
      />
    </>
  )
}