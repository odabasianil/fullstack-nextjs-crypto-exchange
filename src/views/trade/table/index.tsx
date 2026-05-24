'use client'

import { useState } from "react";
import { TradeTableTabs } from "./tabs";
import { OpenOrders } from "@/views/tables/open-orders";
import { OrderHistory } from "@/views/tables/order-history";
import { Fund } from "@/views/tables/fund";
import { GridOrders } from "@/views/tables/grid-orders";

const tabs = [
  {
    text: 'Open Orders',
    value: 'open_orders',
  },
  {
    text: 'Order History',
    value: 'order_history',
  },
  {
    text: 'Trade History',
    value: 'trade_history',
  },
  {
    text: 'Funds',
    value: 'funds',
  },
  {
    text: 'Grid Orders',
    value: 'grid_orders',
  }
]

export const TradeTable = (props: any) => {
  const { coin1, coin2 } = props;
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [sortedBy, setSortedBy] = useState('order');
  const [hideOtherPairs, setHideOtherPairs] = useState(false);

  return (
    <>
      <TradeTableTabs
        tabs={tabs}
        hideOtherPairs={hideOtherPairs}
        setHideOtherPairs={setHideOtherPairs}
        sortedBy={sortedBy}
        setSortedBy={setSortedBy}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      { activeTab === 'open_orders' && <OpenOrders />}
      { activeTab === 'order_history' && <OrderHistory />}
      { activeTab === 'trade_history' && <OrderHistory />}
      { activeTab === 'funds' && <Fund />}
      { activeTab === 'grid_orders' && <GridOrders />}
    </>
  );
}