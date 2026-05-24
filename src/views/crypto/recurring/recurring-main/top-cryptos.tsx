"use client";
import { useState } from "react";
import InfoTooltip from "../../../../components/ui/info-tooltip";
import { Icon } from "@/components/ui/icon";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface CryptoData {
  name: string;
  image: string;
  price: number;
  historicalROI: number;
}

const TopCryptos = ({ data }: { data: CryptoData[] }) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [tooltipTarget, setTooltipTarget] = useState<HTMLElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleMouseEnter = (iconName: string, target: HTMLElement) => {
    setShowTooltip(iconName);
    setTooltipTarget(target);
  };

  const handleMouseLeave = () => {
    setShowTooltip(null);
    setTooltipTarget(null);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <>
      <div className="lg:ml-[126px] md:ml-[62px] mt-6 md:block hidden">
        <div className="flex items-center">
          <div className="text-xl flex dark:text-gray-800 text-black-100 font-medium">
            Top Cryptos
          </div>
          <div
            className="relative"
            onMouseEnter={(e) => handleMouseEnter("", e.currentTarget)}
            onMouseLeave={handleMouseLeave}
          >
            <Icon
              name="payment-warning"
              size={20}
              className="ml-1 text-gray cursor-pointer hover:text-primary"
            />
          </div>
        </div>
        <div className="flex md:flex-col-reverse flex-col ">
          <div className="lg:w-[282px] md:w-[214px] md:mt-[26px] ">
            {data.map((crypto) => (
              <div
                key={crypto.name}
                className="m-0 mb-3 h-16 w-full py-2.5 px-3 cursor-pointer rounded-md lg:w-[282px] flex justify-start flex-col"
              >
                <div className="flex justify-between items-center">
                  <div className="flex text-black-200 dark:text-white-100 text-sm font-semibold items-center">
                    <Image
                      src={crypto.image}
                      alt={crypto.name}
                      width={20}
                      height={20}
                      className="mr-1"
                    />
                    {crypto.name}
                  </div>
                  <div className="text-black-200 dark:text-white-100">
                    {crypto.price.toFixed(2)}
                  </div>
                </div>
                <div className="text-gray mt-2 text-xs flex items-center justify-between">
                  <div className="">HistoricalROI</div>
                  <div
                    className={twMerge(
                      crypto.historicalROI >= 0
                        ? "text-green-100"
                        : "text-red-500"
                    )}
                  >
                    {crypto.historicalROI.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:mt-6 flex justify-end md:px-3 ">
            <div className="text-xs text-black-700 dark:text-white-700 flex items-center">
              Setting time
            </div>
            {["3Y", "1Y", "6M", "3M"].map((filter) => (
              <div
                key={filter}
                className={`ml-2.5 text-xs dark:text-gray-200 ${
                  activeFilter === filter
                    ? "text-primary-200 dark:text-primary-200"
                    : "text-white-500"
                } cursor-pointer`}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </div>
            ))}
          </div>
        </div>
      </div>
      {tooltipTarget && (
        <InfoTooltip
          text="Risk warning: Historical ROI does not guarantee future ROI."
          targetRef={{ current: tooltipTarget }}
          visible={showTooltip !== null}
          className="bg-gray-600"
          arrowClass="bg-gray-600"
        />
      )}
    </>
  );
};

export default TopCryptos;
