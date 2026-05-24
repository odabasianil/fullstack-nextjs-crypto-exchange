import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import Select from "@/components/ui/select";
import { Activity, ActivityItem } from "@/core/models/auth/models/activity.model";
import { activityService } from "@/core/services/user/activity.service";
import { NoResult } from "@/views/crypto/payment/no-result";
import { table } from "console";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

type AccountActivityProps = {
  devices: Activity;
  setData: any;
  tableLayout?: string;
};

const options = [
  { label: "1 Days", value: "1" },
  { label: "7 Days", value: "7"},
  { label: "1 Month", value: "30" },
  { label: "3 Months", value: "90" },
];

const options2 = [
  { label: "All" },
  { label: "Completed" },
  { label: "Failed" },
];


export const AccountActivityMobile = ({
  devices,
  setData,
  tableLayout,
}: AccountActivityProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<any>(options[0]);


  const filteredDateData = useMemo(() => {
    const now = new Date();
    const periodDays = +date?.value;
  
    const filteredData = devices?.data?.filter((item) => {
      const itemDate = new Date(item.timestamp);
      const diffTime = Math.abs(+now - +itemDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
      return diffDays <= periodDays;
    });

    return tableLayout === "security" ? filteredData : devices?.data;
  }, [devices, date])

  const isMobile = (userAgent: string) => {
    const mobileKeywords = [
      "Android", "iPhone", "iPad", "iPod", "Opera Mini", 
      "IEMobile", "Mobile", "Windows Phone"
    ];
  
    return mobileKeywords.some(keyword => userAgent.includes(keyword));
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <>
      {tableLayout === "security" && (
        <div
          className="mt-6 mx-4 flex justify-end"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Icon name="filter-2" size="24" />
        </div>
      )}

      <div className="px-4">
        {devices?.data?.length === 0 ? (
          <div className="py-10 md:py-20">
            <NoResult
              imageClass="mb-0"
              width={96}
              height={96}
              text="No records found."
            />
          </div>
        ) : (
          filteredDateData?.map((device: ActivityItem, index) => (
            <div
              key={index}
              className="flex-1 border-b border-gray-800 dark:border-gray-700"
            >
              <div className="">
                <div className="pl-2 my-2 text-base dark:text-gray-900 text-white-1000 flex items-start justify-between">
                  <div className={twMerge("flex items-center gap-1", device?.statusText === "Success" ? "text-success" : "text-error")}>
                    <Icon
                      name={device?.statusText === "Success" ? "success" : "circle-close"}
                      size={20}
                      className={twMerge(device?.statusText === "Success" ? "text-success" : "text-error")}
                    />
                    {device?.statusText}
                  </div>
                  <div className=" flex-1 text-right">
                    {device?.authName}
                  </div>
                </div>
                <div className="pl-2.5 my-2 text-sm dark:text-gray-900 text-white-1000 flex items-start justify-between">
                    <div className="text-sm">Date</div>
                    <div className="text-sm flex-1 text-right">{formatTimestamp(device.timestamp)}</div>
                </div>
                <div className="pl-2.5 my-2 text-sm dark:text-gray-900 text-white-1000 flex items-start justify-between">
                  <div className="text-sm">Source</div>
                  <div className="text-sm flex-1 text-right">
                    {isMobile(device.userAgent) ? "Mobile" : "Desktop"}
                  </div>
                </div>
                <div className="pl-2.5 my-2 text-sm dark:text-gray-900 text-white-1000 flex items-start justify-between">
                  <div className="text-sm">IP Address</div>
                  <div className="text-sm flex-1 text-right">
                    {device.ip}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        open={open}
        setOpen={setOpen}
        showCloseButton
        className="md:w-[425px] md:max-w-[80vw] w-full md:h-[580px] h-full max-w-[none] dark:bg-black-1100"
      >
        <div className="flex flex-col h-full">
          <div className="md:flex my-6 flex-1">
            <div className="md:w-[160px] mr-4 w-full relative">
              <Select
                options={options}
                defaultValue="24h"
                value={date}
                setValue={setDate}
                className="flex w-full !h-[40px] text-xs mr-2"
                valueClass="px-1"
                wrapperClassName=" hover:!border-primary-100 focus:!border-primary-100"
              />
            </div>
            <div className="md:w-[160px] mr-4 w-full relative">
              <Select
                options={options2}
                defaultValue="24h"
                className="flex w-full !h-[40px] text-xs mr-2"
                valueClass="px-1"
                wrapperClassName=" hover:!border-primary-100 focus:!border-primary-100"
              />
            </div>
          </div>
          <div className="my-6 flex justify-between gap-2">
            <Button className="h-[40px] rounded-sm dark:bg-gray-700 bg-gray-800 w-full" appearance="secondary" onClick={()=>{}}>Reset</Button>
            <Button className="h-[40px] rounded-sm dark:bg-gray-700 bg-gray-800 w-full" appearance="secondary" onClick={()=>{}}>Search</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
