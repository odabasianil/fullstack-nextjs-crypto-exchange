"use client";
import { Icon } from "@/components/ui/icon";
import InfoTooltip from "@/components/ui/info-tooltip";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface MarketData {
  title: string;
  value: string;
  description: string;
  info?: string;
}

interface ConversionData {
  title: string;
  rate: string;
  isPositive: boolean;
  info?: string;
}

interface MarketsSummaryProps {
  marketData: MarketData[];
  conversionData: ConversionData[];
  infoHtml: string;
  conversionInfoHtml: string;
}

export const MarketsSummary: React.FC<MarketsSummaryProps> = ({
  marketData,
  conversionData,
  infoHtml,
  conversionInfoHtml,
}) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [tooltipTarget, setTooltipTarget] = useState<HTMLElement | null>(null);

  const handleMouseEnter = (iconName: string, target: HTMLElement) => {
    setShowTooltip(iconName);
    setTooltipTarget(target);
  };

  const handleMouseLeave = () => {
    setShowTooltip(null);
    setTooltipTarget(null);
  };

  return (
    <div className="flex-1">
      <div className="md:p-6 p-4 md:overflow-y-auto overscroll-y-none md:h-[532px] border rounded-2xl dark:border-background-300 border-white-100 flex flex-col">
        <div className="dark:text-white-100 text-black-200 text-2xl mb-4 font-semibold">
          Markets
        </div>
        <div className="flex flex-wrap gap-y-4">
          {marketData.map((data, index) => (
            <div
              key={index}
              className="flex flex-col basis-[50%] grow-0 shrink-0"
            >
              <div className="relative md:text-base text-sm mb-2 text-gray-300 dark:text-gray-100 flex items-center">
                <div className="flex items-center">
                  {data.title}
                  {data.info && (
                    <div
                      onMouseEnter={(e) =>
                        handleMouseEnter(data.title, e.currentTarget)
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      <Icon
                        name="payment-warning"
                        size={16}
                        className="ml-1 text-gray cursor-pointer hover:text-primary"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div
                className={twMerge(
                  "md:text-2xl text-base text-black-200 dark:text-white-100 font-semibold"
                )}
              >
                {data.value}
              </div>
              {data.info && (
                <InfoTooltip
                  text={data.info}
                  targetRef={{ current: tooltipTarget }}
                  visible={showTooltip === data.title}
                  className="bg-gray-600"
                  arrowClass="bg-gray-600"
                />
              )}
            </div>
          ))}
        </div>
        <div
          className="flex flex-col text-gray-300 dark:text-gray-100 mt-4 md:text-base text-sm"
          dangerouslySetInnerHTML={{ __html: infoHtml }}
        ></div>
        <div className="text-black-200 dark:text-white-100 text-2xl mt-4 mb-4 font-semibold">
          Conversion Tables
        </div>
        <div className="flex flex-wrap gap-y-4">
          {conversionData.map((data, index) => (
            <div
              key={index}
              className="flex flex-col basis-[50%] grow-0 shrink-0"
            >
              <div className="md:text-base text-sm mb-2 text-gray-300 dark:text-gray-100 flex items-center">
                <div className="flex items-center">{data.title}</div>
              </div>
              <div
                className={twMerge(
                  "md:text-2xl text-base text-black-200 font-semibold",
                  data.isPositive ? "text-green" : "text-error"
                )}
              >
                {data.rate}
              </div>
            </div>
          ))}
        </div>
        <div
          className="text-sm text-gray-300 dark:text-gray-100 mt-4 md:text-base"
          dangerouslySetInnerHTML={{ __html: conversionInfoHtml }}
        ></div>
      </div>
    </div>
  );
};
