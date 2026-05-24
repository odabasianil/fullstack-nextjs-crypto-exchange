'use client'

import { useState } from "react";
import { GridTabs } from "./tabs";
import { AiTab } from "./ai";
import { PopularTab } from "./popular";
import { ManualTab } from "./manual";

type GridProps = {
  coin1: string;
  coin2: string;
}

const tabs = [
  {
    text: 'AI',
    value: 'ai',
    icon: 'ai'
  },
  {
    text: 'Popular',
    value: 'popular',
    icon: 'popular'
  },
  {
    text: 'Manual',
    value: 'manual'
  }
]

export const Grid = (props: GridProps) => {
  const { coin1, coin2 } = props;
  const [activeTab, setActiveTab] = useState(tabs[0].value);


  return (
    <div className="px-4 pb-3">
      <GridTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === 'ai' && (<AiTab setActiveTab={setActiveTab} coin1={coin1} coin2={coin2} />)}
      {activeTab === 'popular' && (<PopularTab setActiveTab={setActiveTab} coin1={coin1} coin2={coin2} />)}
      {activeTab === 'manual' && (<ManualTab coin1={coin1} coin2={coin2} />)}
    </div>
  )
}