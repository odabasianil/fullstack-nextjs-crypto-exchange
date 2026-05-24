'use client'

import { Button } from "@/components/ui/button";
import Select from "@/components/ui/select"
import { OpenOrders } from "@/views/tables/open-orders";
import { OrderHistory } from "@/views/tables/order-history";
import { useState } from "react"
import DatePicker from "react-datepicker";

export const FuturesTradeHistory = () => {
  const tabs = [{ name: 'USDⓈ-M', key: 'usds' }, { name: 'COIN-M', key: 'coin' }];
  const [symbol, setSymbol] = useState('all')
  const [side, setSide] = useState('all')
  const [selectedCoin, setSelectedCoin] = useState(tabs[0].key)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

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
        <div className="border h-10 px-6 flex items-center border-white-100 dark:border-gray-300 rounded-lg">
          <DatePicker
            selected={startDate}
            startDate={startDate}
            selectsRange
            endDate={endDate}
            onChange={onChange}
            dateFormat={"dd-MM-yyyy"}
            className="bg-transparent text-sm text-black dark:text-white cursor-pointer"
            calendarClassName="bg-white dark:!bg-black-100 py-4 px-8 !rounded-2xl !border-none !shadow-lg"
            monthsShown={2}
          />  
        </div>
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
        <Button className="h-9 text-sm font-semibold mt-0.5 px-3 w-min border-none">
          Search
        </Button>
        <div className="cursor-pointer font-semibold text-sm pt-2">Reset</div>
      </div>

      <OrderHistory />
    </>
  )
}