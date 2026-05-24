import { Button } from "@/components/ui/button";
import { HelpText } from "@/components/ui/help-text";
import { Icon } from "@/components/ui/icon";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FutureOrderTabs } from "./tabs";
import { FutureLimit } from "./limit";
import { FutureMarket } from "./market";
import { FutureStopLimit } from "./stop-limit";
import { FutureTrailingStop } from "./trailling-stop";
import { FutureStopMarket } from "./stop-market";
import { OrderFormHeader } from "./header";

export const FutureOrderForm = (props: {coin1: string, coin2: string}) => {
  const { coin1, coin2 } = props;
  const [selectedTab, setSelectedTab] = useState("Limit");
  const [openSettings, setOpenSettings] = useState(false);
  const [checkedMarginMode, setCheckedMarginMode] = useState(true);

  return (
    <>
      <div className="hidden md:block">
        <OrderFormHeader
          checkedMarginMode={checkedMarginMode}
          setCheckedMarginMode={setCheckedMarginMode}
          openSettings={openSettings}
          setOpenSettings={setOpenSettings}
        />
      </div>
      <FutureOrderTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab.toLowerCase() === 'limit' && <FutureLimit coin1={coin1} coin2={coin2} />}
      {selectedTab.toLowerCase() === 'market' && <FutureMarket coin1={coin1} coin2={coin2} />}
      {selectedTab.toLowerCase() === 'stop limit' && <FutureStopLimit coin1={coin1} coin2={coin2} />}
      {selectedTab.toLowerCase() === 'trailling stop' && <FutureTrailingStop coin1={coin1} coin2={coin2} />}
      {selectedTab.toLowerCase() === 'stop market' && <FutureStopMarket coin1={coin1} coin2={coin2} />}
    </>
  )
}