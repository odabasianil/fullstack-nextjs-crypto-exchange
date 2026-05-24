import Select from "@/components/ui/select"
import { useState } from "react"
import { NoResult } from "../crypto/payment/no-result";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { twMerge } from "tailwind-merge";

export const GridOrders = (props: any) => {
  const [type, setType] = useState('all');
  const [pair, setPair] = useState('all');
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState('running');
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="pt-1 pl-4 md:px-4 h-full">
      <div className="flex items-center my-2">
        <div onClick={() => setSelectedTab('running')} className={twMerge(
          "text-sm text-gray-300 dark:text-gray rounded-sm mr-6 py-0.5 px-2 cursor-pointer",
          selectedTab === 'running' ? "bg-white-300 dark:bg-secondary text-black-300 dark:text-white-100" : ""
          )}>
            Running
        </div>
        <div onClick={() => setSelectedTab('history')} className={twMerge(
          "text-sm text-gray-300 dark:text-gray rounded-sm mr-6 py-0.5 px-2 cursor-pointer",
          selectedTab === 'history' ? "bg-white-300 dark:bg-secondary text-black-300 dark:text-white-100" : ""
          )}>
            History
        </div>
      </div>
      <div className="lg:min-w-[1284px] overflow-x-auto no-scrollbar">
        <div className="flex items-center h-10">
          <div className="mr-1 text-xs text-gray-300 dark:text-gray">
            Date
          </div>
          <div className="ml-2 mb-0.5">
            <DatePicker
              selected={startDate}
              startDate={startDate}
              selectsRange
              endDate={endDate}
              onChange={onChange}
              dateFormat={"dd-MM-yyyy"}
              className="bg-transparent text-xs text-black dark:text-white cursor-pointer"
              calendarClassName="bg-white dark:!bg-black-100 py-4 px-8 !rounded-2xl !border-none !shadow-lg"
              monthsShown={2}
            />  
          </div>
          <div className="mx-4">
            <Select
              options={[
                { label: 'BNB/USDT', value: 'bnb/usdt' },
                { label: 'BTC/USDT', value: 'btc/usdt' },
                { label: 'ETH/USDT', value: 'eth/usdt' },
                { label: 'BTC/BUSD', value: 'btc/busd' },
                { label: 'ETH/BUSD', value: 'eth/busd' },
                { label: 'BNB/BUSD', value: 'bnb/busd' },
                { label: 'ETH/BTC', value: 'eth/btc' },
              ]}
              value={pair}
              setValue={setPair}
              selectedOptionLabel="Pair"
              wrapperClassName="!border-none"
              labelClass="!text-xs mr-4"
              valueClass="!text-xs"
              optionsClassName="w-[200px]"
              listClassName="!text-xs"
              isSearchable
            />
          </div>
          <div className="mx-4">
            <Select
              options={[
                { label: 'All', value: 'all' },
                { label: 'Cancelled', value: 'cancelled' },
                { label: 'Expired', value: 'expired' },
              ]}
              value={type}
              setValue={setType}
              selectedOptionLabel="Grid Status"
              wrapperClassName="!border-none"
              labelClass="!text-xs mr-4"
              valueClass="!text-xs whitespace-nowrap"
              optionsClassName="w-[200px]"
              listClassName="!text-xs"
              isSearchable
            />
          </div>
          <div className="ml-3 flex items-center">
            <button className="text-xs rounded-md bg-white-300 hover:bg-white-200 dark:bg-secondary hover:dark:bg-gray-300 h-6 px-2 flex items-center">Search</button>
            <button className="text-xs rounded-md ml-2 bg-white-300 hover:bg-white-200 dark:bg-secondary hover:dark:bg-gray-300 h-6 px-2 flex items-center">Reset</button>
          </div>
        </div>
        <div className="h-10 flex items-center justify-start border-b border-b-white-300 dark:border-secondary">
          <div className="flex items-center justify-start flex-grow w-[112px] min-w-[112px]">
            <div className="text-black-300 dark:text-gray text-xs">End Time</div>
          </div>
          <div className="flex items-center justify-start flex-grow w-[75px] min-w-[75px]">
            <div className="text-black-300 dark:text-gray text-xs">Pair</div>
          </div>
          <div className="flex items-center justify-start flex-grow w-[110px] min-w-[110px]">
            <div className="text-black-300 dark:text-gray text-xs">Total Investment</div>
          </div>
          <div className="flex items-center justify-start flex-grow w-[110px] min-w-[110px]">
            <div className="text-black-300 dark:text-gray text-xs">Total Profit</div>
          </div>
          <div className="flex items-center justify-start flex-grow w-[90px] min-w-[90px]">
            <div className="text-black-300 dark:text-gray text-xs">Duration</div>
          </div>
          <div className="flex items-center justify-start flex-grow w-[70px] min-w-[70px]">
            <div className="text-black-300 dark:text-gray text-xs">Grid Status</div>
          </div>
          <div className="flex items-center justify-start flex-grow w-[86px] min-w-[86px]">
            <div className="text-black-300 dark:text-gray text-xs">Action</div>
          </div>
        </div>
        
        {true && <div className="flex items-center justify-center mt-[108px]">
          <NoResult
            text="You have no open orders"
            width={64}
            height={64}
            imageClass="mb-2"
            textClass="mt-0 text-xs"
          />
        </div>}
      </div>
    </div>
  )
}