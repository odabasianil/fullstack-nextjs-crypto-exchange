"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SymbolOverview } from "react-ts-tradingview-widgets";
import { twMerge } from "tailwind-merge";

const TabContent: React.FC<{ tab: string }> = ({ tab }) => {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const handleThemeChange = (event: any) => {
      setTheme(event.detail);
    };

    window.addEventListener("themeChange", handleThemeChange);
    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  var symbols = [
    ["BINANCE:BTCUSDT|1D"],
    ["BINANCE:ETHUSDT|1D"],
    ["BINANCE:FETUSDT|1D"],
  ];
  switch (tab) {
    case "1D":
      return (
        <SymbolOverview
          symbols={symbols}
          dateFormat="dd-MM-yy"
          width={"100%"}
          height={"100%"}
          showVolume={true}
          colorTheme={theme == "dark" ? "dark" : "light"}
          chartType={"area"}
          autosize={true}
        />
      );
    case "7D":
      return (
        <SymbolOverview
          symbols={symbols}
          dateFormat="dd-MM-yy"
          width={"100%"}
          height={"100%"}
          showVolume={true}
          colorTheme={theme == "dark" ? "dark" : "light"}
        />
      );
    case "1M":
      return (
        <SymbolOverview
          symbols={symbols}
          dateFormat="dd-MM-yy"
          width={"100%"}
          height={"100%"}
          showVolume={true}
          colorTheme={theme == "dark" ? "dark" : "light"}
        />
      );
    case "3M":
      return (
        <SymbolOverview
          symbols={symbols}
          dateFormat="dd-MM-yy"
          width={"100%"}
          height={"100%"}
          showVolume={true}
          colorTheme={theme == "dark" ? "dark" : "light"}
        />
      );
    case "1Y":
      return (
        <SymbolOverview
          symbols={symbols}
          dateFormat="dd-MM-yy"
          width={"100%"}
          height={"100%"}
          showVolume={true}
          colorTheme={theme == "dark" ? "dark" : "light"}
        />
      );
    default:
      return null;
  }
};

export const MarketsChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState("1D");
  const [price, setPrice] = useState(false);

  const tabs = ["1D", "7D", "1M", "3M", "1Y"];

  return (
    <div className="flex-1">
      <div className=" flex items-center justify-between text-xl mt-1 md:text-2xl md:mb-2 text-black-200 dark:text-white-100 font-semibold">
        <div>USDT/VND</div>
        <div>₫ 24,988.35</div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="h-[32px] flex items-center">
          <Image
            src="/images/coin-1.png"
            alt="coin 1"
            width={32}
            height={32}
            className=""
          />
          <Image
            src="/images/coin-2.png"
            alt="coin 2"
            width={32}
            height={32}
            className="relative right-[8px]"
          />
        </div>
        <div
          className={twMerge(
            "md:text-2xl text-xl font-semibold",
            price ? "text-error" : "text-green"
          )}
        >
          +0.02%
        </div>
      </div>
      <div className="flex justify-end md:gap-4 gap-2">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={twMerge(
              "md:text-sm text-xs md:py-[7px] py-1 text-black-300 px-2 rounded-lg cursor-pointer font-medium",
              activeTab === tab
                ? "bg-white-300 dark:text-gray dark:bg-background-300"
                : ""
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <TabContent tab={activeTab} />
      </div>
    </div>
  );
};
