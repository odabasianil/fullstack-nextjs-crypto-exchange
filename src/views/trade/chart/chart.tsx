import { getCookie } from "cookies-next";
import React, { useEffect, useRef, memo, useState } from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

export const TradeChart = (props: any) => {
  const { isFullScreen, isFuturePage = false } = props;
  const container = useRef<any>();

  const [theme, setTheme] = useState<string>(getCookie("theme") || "dark");

  useEffect(() => {
    const handleThemeChange = (event: any) => {
      setTheme(event.detail);
    };

    window.addEventListener('themeChange', handleThemeChange);

    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);
  return (
    <div className="max-h-[478px] h-[478px]">
    <AdvancedRealTimeChart
      symbol="BINANCE:BTCUSDT"
      hide_legend={true}
      allow_symbol_change={false}
      theme={theme == "dark" ? "dark" : "light"}
      autosize
    ></AdvancedRealTimeChart>
    </div>
  );
};

export default memo(TradeChart);
