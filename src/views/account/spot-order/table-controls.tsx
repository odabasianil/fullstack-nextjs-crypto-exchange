import { Button } from "@/components/ui/button"
import Select from "@/components/ui/select"
import DatePicker from "react-datepicker"

const selectProps = {
  wrapperClassName: "w-[148px] h-10 rounded-lg",
  className: "w-[148px]",
  valueClass: " w-full",
  selectedClass: "text-black-100 dark:text-white-100 text-sm",
  optionsClassName: "w-[148px] top-10",
  isSearchable: true
}


export const TableControls = (props: any) => {
  const {
    base,
    setBase,
    quote,
    setQueto,
    side,
    setSide,
    sortBy,
    setSortBy,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = props;

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <>
      <div className="px-4 md:px-0 my-6 flex flex-wrap items-center gap-4">
        <div className="mt-2 border h-10 px-6 flex items-center border-white-100 dark:border-secondary rounded-lg">
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
        <div className="flex items-center gap-0.5">
          <Select
              options={[
                { label: 'All', value: 'all' },
                { label: '1000SATS', value: '1000sats' },
                { label: 'AAVE', value: 'aave' },
                { label: 'ACA', value: 'aca' },
                { label: 'ACE', value: 'ace' },
                { label: 'ACH', value: 'ach' },
                { label: 'ACM', value: 'acm' },
                { label: 'ADA', value: 'ada' },

              ]}
              selectedOptionLabel="Base"
              value={base}
              setValue={setBase}
              {...selectProps}
            />
            -
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
            selectedOptionLabel="Quote"
            value={quote}
            setValue={setQueto}
            {...selectProps}
          />
        </div>
        <Select
          options={[
            { label: 'All', value: 'all' },
            { label: 'Buy', value: 'buy' },
            { label: 'Sell', value: 'sell' },
          ]}
          selectedOptionLabel="Side"
          value={side}
          setValue={setSide}
          {...selectProps}
        />
        <Select
          options={[
            { label: 'Order Time', value: 'order_time' },
            { label: 'Update Time', value: 'update_time' },
          ]}
          selectedOptionLabel="Sort By"
          value={sortBy}
          setValue={setSortBy}
          optionsClassName="w-[184px] top-10"
          wrapperClassName="w-[184px] h-10 rounded-lg"
          className="w-[184px]"
          valueClass=" w-full justify-between pr-0 whitespace-nowrap"
          selectedClass="text-black-100 dark:text-white-100 text-sm"

        />
        <Button className="h-9 text-sm mt-2 w-min border-none">
          Search
        </Button>
        <Button appearance="ghost" className="h-9 text-sm mt-2 w-min border-none">
          Reset
        </Button>
      </div>
    </>
  )
}