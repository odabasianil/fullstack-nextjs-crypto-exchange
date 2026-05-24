'use client';

import { Button } from "@/components/ui/button";
import Select from "@/components/ui/select";
import { User } from "@/core/models/auth/models/user.model";
import { subUserService } from "@/core/services/user/subuser.service";
import { subUserOrderService } from "@/core/services/user/subuserorder.service";
import { RootState } from "@/core/store/store";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { OpenOrders } from "./open-orders";
import { OrderHistory } from "./order-history";
import { pairService } from "@/core/services/user/pair.service";
import { useToast } from "@/hooks/use-toast";
import DatePicker from "react-datepicker";

export default function Page() {
  const user = useSelector((state: RootState) => state.user.user) as User;
  const [activeTab, setActiveTab] = useState('open');
  const [data, setData] = useState<any[]>([]);
  const [subUser, setSubUser] = useState<any>(null);
  const [isClickSearch, setIsClickSearch] = useState<any>(null);
  const [subUserList, setSubUserList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pairs, setPairs] = useState<any[]>([]);
  const currentDate = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(currentDate.getDate() - 7);

  const [startDate, setStartDate] = useState(oneWeekAgo);
  const [endDate, setEndDate] = useState(currentDate);
  const [side, setSide] = useState({
    label: 'All',
    value: 'all'
  })
  const [pair, setPair] = useState({
    label: 'BTCUSDT',
    value: 'BTCUSDT'
  })
  const toast = useToast();

  const getList = () => {
    if (!subUser || !subUser.value) return;
    const symbol = pair.value || 'BTCUSDT';

    setIsLoading(true);
    if (activeTab === 'history') {
      const firstDate = new Date(startDate).toISOString();
      const lastDate = new Date(endDate).toISOString();
      console.log(firstDate, lastDate)

      const params: any = {
        symbol,
        startDate: firstDate,
        endDate: lastDate,
        page: 1,
        pageSize: 10
      }

      if (side.value !== 'all') {
        params['side'] = +side.value;
      }

      subUserOrderService.getOrderHistory(params, subUser.value).then((res) => {
        if (res.success) {
          setData(res.data.orders)
        } else {
          setData([])
        }
      }).finally(() => setIsLoading(false))
    } else if (activeTab === 'trade') {
      // subUserOrderService.getOrderHistory({}, subUser.value).then((res) => {
      //   if (res.success) {
      //     setData(res.data)
      //   } else {
      //     setData([])
      //   }
      // }).finally(() => setIsLoading(false))
    } else {
      subUserOrderService.getOpenOrderList(symbol, subUser.value).then((res) => {
        if (res.success) {
          setData(res.data)
        } else {
          setData([])
        }
      }).finally(() => setIsLoading(false))
    }
  }

  const handleSearch = (isReset = false) => {
    if (isReset) {
      setSubUser({
        label: subUserList[0].email,
        value: subUserList[0].userID
      });
      return;
    }
    setIsClickSearch(true);
  }

  const onChangeDate = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const cancelOrder = (e: any, orderId: number, symbol: string) => {
    e.preventDefault();
    if (!subUser || !subUser.value) return;

    subUserOrderService.cancelOpenOrder(symbol, subUser.value, orderId).then((res) => {
      if (res.success) {
        toast?.open('Order has been cancelled', 'check-circle', '', 'text-green')
        getList();
      } else {
        toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
      }
    }).catch((err) => {
      toast?.open(err?.response?.data?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
    });
  }

  useEffect(() => {
    getList();
  }, [activeTab])

  useEffect(() => {
    if (isClickSearch) {
      getList();
    }
    setIsClickSearch(false);
  }, [isClickSearch])

  useEffect(() => {
    subUserService.getAllSubUser().then((res: any) => {
      if (res.success) {
        setSubUserList(res.data);
        const first = res.data[0];
        setSubUser({
          label: first.email,
          value: first.userID
        });
        getList();
      }
    });

    pairService.getSpotList().then((res) => {
      if (res.success) {
        setPairs(res.data);
        setPair({
          label: res.data[0]?.symbol,
          value: res.data[0]?.symbol
        });
      }
    });
  }, [user])

  console.log(startDate, endDate)
  return (
    <div className="w-full mx-auto !max-w-full lg:px-8">
      <div className="px-4 lg:px-8 py-6 bg-api-linear">
        <div className="text-sm text-gray-300 dark:text-gray">Sub Account</div>
        <div className="text-xl lg:text-[32px] lg:leading-10 font-bold">Order Management</div>
      </div>
      <div className="my-4">
        <div className="flex gap-4 overflow-auto whitespace-nowrap pl-4 lg:pl-0 no-scrollbar">
          <div
            onClick={() => setActiveTab('open')}
            className={twMerge(
              "cursor-pointer px-4 py-2.5 font-semibold text-sm text-gray-300 dark:text-gray rounded-md",
              activeTab === 'open' && 'text-black-100 dark:text-white-100 bg-white-100 dark:bg-secondary'
            )}>
            Open Orders
          </div>
          <div
            onClick={() => setActiveTab('history')}
            className={twMerge(
              "cursor-pointer px-4 py-2.5 font-semibold text-sm text-gray-300 dark:text-gray rounded-md",
              activeTab === 'history' && 'text-black-100 dark:text-white-100 bg-white-100 dark:bg-secondary'
            )}>
            Order History
          </div>
          {/* <div
            onClick={() => setActiveTab('trade')}
            className={twMerge(
              "cursor-pointer px-4 py-2.5 font-semibold text-sm text-gray-300 dark:text-gray rounded-md",
              activeTab === 'trade' && 'text-black-100 dark:text-white-100 bg-white-100 dark:bg-secondary'
            )}>
            Trade History
          </div> */}
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 px-4 lg:px-0">
        {subUserList.length > 0 && <Select
          options={subUserList.map((item) => ({ label: item.email, value: item.userID }))}
          selectedOptionLabel="Sub Accounts"
          value={subUser}
          setValue={setSubUser}
          defaultValue={subUser?.value}
          wrapperClassName="w-full lg:w-[400px] h-10 dark:bg-secondary dark:border-gray-300"
          className="w-full lg:w-[400px]"
          selectedClass="text-black-100 dark:text-white-100 text-sm font-semibold"
          valueClass="flex justify-between w-full"
        />}
        {pairs?.length > 0 && <Select
          options={pairs?.map((pair) => ({ label: pair?.symbol, value: pair?.symbol }))}
          selectedOptionLabel="Pair"
          value={pair}
          setValue={setPair}
          defaultValue={pair?.value}
          wrapperClassName="w-[184px] h-10 rounded-lg"
          className="w-[184px]"
          valueClass="flex justify-between w-full"
          selectedClass="text-black-100 dark:text-white-100 text-sm"
          optionsClassName="w-[184px] top-10"
        />}
        {
          activeTab === 'history' && (
            <>
              <Select
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'Buy', value: '1' },
                  { label: 'Sell', value: '2' },
                ]}
                selectedOptionLabel="Side"
                value={side}
                setValue={setSide}
                defaultValue={side?.value}
                wrapperClassName="w-[184px] h-10 rounded-lg"
                className="w-[184px]"
                valueClass="flex justify-between w-full"
                selectedClass="text-black-100 dark:text-white-100 text-sm"
                optionsClassName="w-[184px] top-10"
              />
              <div className="mt-2 border h-10 px-6 flex items-center pb-1 border-white-100 dark:border-secondary rounded-lg">
                <DatePicker
                  selected={startDate}
                  startDate={startDate}
                  selectsRange
                  endDate={endDate}
                  onChange={onChangeDate}
                  dateFormat={"dd-MM-yyyy"}
                  className="bg-transparent text-xs text-black dark:text-white cursor-pointer"
                  calendarClassName="bg-white dark:!bg-black-100 pb-4 px-8 !rounded-2xl !border-none !shadow-lg"
                  monthsShown={2}
                />
              </div>
            </>
          )
        }
        <div className="flex gap-2 mt-1.5">
          <Button onClick={() => handleSearch()} className="h-10 font-semibold text-sm" >Search</Button>
          <Button onClick={() => {
            handleSearch(true);
          }} disabled={activeTab === 'open'} appearance="secondary" className="h-10 font-semibold text-sm">Reset</Button>
        </div>
      </div>

      {isLoading && <div className="w-full h-[50vh] flex justify-center items-center">
        <div
          className={twMerge(
            'w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin',
          )}
        />
      </div>}
      {!isLoading && <div className="my-4">
        {
          activeTab === 'open' && (
            <OpenOrders orders={data} cancelOrder={cancelOrder} />
          )
        }
        {
          activeTab === 'history' && (
            <OrderHistory orders={data} setData={setData} />
          )
        }
        {
          activeTab === 'trade' && (
            <OpenOrders orders={data} cancelOrder={cancelOrder} />
          )
        }
      </div>}
    </div>
  )
} 