'use client'

import { useSearchParams } from "next/navigation";
import { Spot } from "./spot";
import { CrossIsolated } from "./cross-isolated";
import { Grid } from "./grid";
import { OrderFormTabs } from "./tabs";


export interface OrderFormProps {
  coin1: string;
  coin2: string;
}

export const tabs = [
  {
    text: 'Spot',
    value: 'spot'
  },
  {
    text: 'Cross 5x',
    value: 'cross'
  },
  {
    text: 'Isolated',
    value: 'isolated'
  },
  {
    text: 'Grid',
    value: 'grid'
  }
]

export const OrderForm = (props: OrderFormProps) => {
  const { coin1, coin2 } = props;
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('type') ?? 'spot';



  return (
    <>
      <OrderFormTabs coin1={coin1} coin2={coin2} activeTab={activeTab} />
      <div className="relative h-[calc(100%-48px)] bg-white dark:bg-black-500">
        <div className="guide-third-step absolute left-[212px]"></div>
        {activeTab === 'spot' && <Spot coin1={coin1} coin2={coin2} />}
        {activeTab === 'cross' && <CrossIsolated coin1={coin1} coin2={coin2} />}
        {activeTab === 'isolated' && <CrossIsolated coin1={coin1} coin2={coin2} />}
        {activeTab === 'grid' && <Grid coin1={coin1} coin2={coin2} />}
      </div>
    </>
  )
}