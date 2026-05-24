'use client'

import Select from "@/components/ui/select"
import { OpenOrders } from "@/views/tables/open-orders";
import { useState } from "react"

export const FuturesOpenOrder = () => {
  const tabs = [{ name: 'USDⓈ-M', key: 'usds' }, { name: 'COIN-M', key: 'coin' }];
  const typeTabs = [{ name: 'Basic', key: 'basic' }, { name: 'Conditional', key: 'conditional' }];
  const [orderType, setOrderType] = useState('all')
  const [symbol, setSymbol] = useState('all')
  const [side, setSide] = useState('all')
  const [selectedCoin, setSelectedCoin] = useState(tabs[0].key)
  const [selectedType, setSelectedType] = useState(typeTabs[0].key)

  return (
    <>
      <div className="px-4 md:px-0 my-6 flex flex-wrap items-start gap-4">
        <div className="border border-white-100 dark:border-gray-300 h-10 p-1 rounded-lg flex items-center ">
          {
            tabs.map((tab, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-md text-sm font-semibold h-8 w-[88px] flex items-center justify-center ${selectedCoin === tab.key ? ' bg-white-100 dark:bg-secondary text-black-100 dark:text-white-100' : 'text-gray-300 dark:text-gray-500'}`}
                onClick={() => setSelectedCoin(tab.key)}
              >
                {tab.name}
              </div>
            ))
          }
        </div>
        {
          selectedCoin === 'usds' && (
            <div className="border border-white-100 dark:border-gray-300 h-10 p-1 rounded-lg flex items-center ">
              {
                typeTabs.map((tab, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-md text-sm font-semibold h-8 w-[88px] flex items-center justify-center ${selectedType === tab.key ? ' bg-white-100 dark:bg-secondary text-black-100 dark:text-white-100' : 'text-gray-300 dark:text-gray-500'}`}
                    onClick={() => setSelectedType(tab.key)}
                  >
                    {tab.name}
                  </div>
                ))
              }
            </div>
          )
        }
        <Select
            options={[
              { label: 'All', value: 'all' },
              { label: 'Limit Order', value: 'limit_order' },
              { label: 'Stop Limit', value: 'stop_limit' },
              { label: 'Limit-Maker', value: 'limit_maker' },
              { label: 'Stop Market', value: 'stop_market' },
              { label: 'Trailling Stop', value: 'trailling_stop' },

            ]}
            selectedOptionLabel="Order Type"
            value={orderType}
            setValue={setOrderType}
            wrapperClassName="w-[184px] h-10 rounded-lg dark:border-gray-300"
            className="w-[184px]"
            valueClass=" w-full"
            selectedClass="text-black-100 dark:text-white-100 text-sm"
            optionsClassName="w-[184px] top-10"
          />
        <Select
          options={[
            { label: 'All', value: 'all' },
            { label: 'BNB', value: 'bnb' },
            { label: 'ETH', value: 'eth' },
            { label: 'BTC', value: 'btc' },
            { label: 'ETH', value: 'eth' },
            { label: 'BNB', value: 'bnb' },
            { label: 'BTC', value: 'btc' },
            { label: 'ETH', value: 'eth' },
            { label: 'BNB', value: 'bnb' },

          ]}
          selectedOptionLabel="Symbol"
          value={symbol}
          setValue={setSymbol}
          wrapperClassName="w-[184px] h-10 rounded-lg dark:border-gray-300"
          className="w-[184px]"
          valueClass="flex justify-between w-full"
          selectedClass="text-black-100 dark:text-white-100 text-sm"
          optionsClassName="w-[184px] top-10"
          isSearchable
        />
        <Select
          options={[
            { label: 'All', value: 'all' },
            { label: 'Buy', value: 'buy' },
            { label: 'Sell', value: 'sell' },
          ]}
          selectedOptionLabel="Side"
          value={side}
          setValue={setSide}
          wrapperClassName="w-[134px] h-10 rounded-lg dark:border-gray-300"
          className="w-[134px]"
          valueClass="flex justify-between w-full"
          selectedClass="text-black-100 dark:text-white-100 text-sm"
          optionsClassName="w-[134px] top-10"
        />
        <div className="cursor-pointer font-semibold text-sm pt-2">Reset</div>
      </div>

      <OpenOrders />
    </>
  )
}