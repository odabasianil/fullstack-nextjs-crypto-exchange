'use client'

import Select from "@/components/ui/select"
import { OpenOrders } from "@/views/tables/open-orders"
import { useState } from "react"

export const AccountOpenOrdersTable = () => {
  const [filter, setFilter] = useState('all')
  const [pair, setPair] = useState('all')
  const [side, setSide] = useState('all')

  return (
    <>
      <div className="px-4 md:px-0 my-6 flex flex-wrap items-center gap-4">
        <Select
            options={[
              { label: 'All', value: 'all' },
              { label: 'Limit Order', value: 'limit_order' },
              { label: 'Stop Limit', value: 'stop_limit' },
              { label: 'Limit-Maker', value: 'limit_maker' },
              { label: 'Stop Market', value: 'stop_market' },
              { label: 'Trailling Stop', value: 'trailling_stop' },

            ]}
            selectedOptionLabel="Filter"
            value={filter}
            setValue={setFilter}
            wrapperClassName="w-[184px] h-10 rounded-lg"
            className="w-[184px]"
            valueClass=" w-full"
            selectedClass="text-black-100 dark:text-white-100 text-sm"
            optionsClassName="w-[184px] top-10"
          />
        <Select
          options={[
            { label: 'All', value: 'all' },
            { label: 'BNB/BTC', value: 'bnb_btc' },
            { label: 'ETH/BTC', value: 'eth_btc' },
            { label: 'BTC/USDT', value: 'btc_usdt' },
            { label: 'ETH/USDT', value: 'eth_usdt' },
            { label: 'BNB/USDT', value: 'bnb_usdt' },
            { label: 'BTC/USDT', value: 'btc_usdt' },
            { label: 'ETH/USDT', value: 'eth_usdt' },
            { label: 'BNB/USDT', value: 'bnb_usdt' },

          ]}
          selectedOptionLabel="Pair"
          value={pair}
          setValue={setPair}
          wrapperClassName="w-[184px] h-10 rounded-lg"
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
          wrapperClassName="w-[184px] h-10 rounded-lg"
          className="w-[184px]"
          valueClass="flex justify-between w-full"
          selectedClass="text-black-100 dark:text-white-100 text-sm"
          optionsClassName="w-[184px] top-10"
        />
      </div>
      <OpenOrders isAccount />
    </>
  )
}