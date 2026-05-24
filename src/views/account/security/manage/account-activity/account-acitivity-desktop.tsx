import { Pagination } from "@/components/ui/pagination";
import Select from "@/components/ui/select";
import { Activity, ActivityItem } from "@/core/models/auth/models/activity.model";
import { activityService } from "@/core/services/user/activity.service";
import { NoResult } from "@/views/crypto/payment/no-result";
import { useEffect, useMemo, useState } from "react";
import { set } from "react-datepicker/dist/date_utils";

type AccountActivityProps = {
  devices: Activity;
  setData: any;
  tableLayout?: string;
};

const options = [
  { label: "1 Days", value: "1" },
  { label: "7 Days", value: "7" },
  { label: "1 Month", value: "30" },
  { label: "3 Months", value: "90" },
];

const options2 = [
  { label: "All", value: "All" },
  { label: "Success", value: "Success" },
  { label: "Failed", value: "Failed" },
];

export const AccountActivityDesktop = ({
  devices,
  setData,
  tableLayout,
}: AccountActivityProps) => {
  const [page, setPage] = useState(devices?.page ?? 1);
  const perPage = devices?.pageSize;
  const [pageCount, setPageCount] = useState(Math.ceil(devices.totalCount / perPage));
  const [date, setDate] = useState<any>(options[0]);
  const [status, setStatus] = useState<any>(options2[0]);


  const filteredDateData = useMemo(() => {
    const now = new Date(); // Şu anki zaman
    const periodDays = +date?.value; // Seçilen option'un gün karşılığı

    const filteredData = devices?.data?.filter((item) => {
      const itemDate = new Date(item.timestamp); // Verideki timestamp'i Date objesine çevir
      const diffTime = Math.abs(+now - +itemDate); // Şu an ile timestamp arasındaki fark (ms)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Farkı güne çevir

      return diffDays <= periodDays; // Gün farkı, seçilen periyottan küçük veya eşitse filtrele
    });

    return tableLayout === "security" ? filteredData : devices?.data;
  }, [devices, date])

  const filteredStatusData = useMemo(() => {
    return filteredDateData?.filter((item) => {
      return status?.label === "All" ? item : item.statusText === status?.label;
    });
  }, [filteredDateData, status])

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

  const handlePageChange = (page: number) => {
    if (tableLayout === "security") {
      activityService.accountActivities({ page, pageSize: perPage })
        .then((res) => {
          if (res.data) {
            setData(res.data);
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      activityService.loginActivites({ page, pageSize: perPage })
        .then((res) => {
          if (res.data) {
            setData(res.data);
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  useEffect(() => {
    if (tableLayout === "security") {
      if (filteredStatusData?.length < 9) {
        setPageCount(page);
      } else {
        setPageCount(Math.ceil(devices.totalCount / perPage));
      }
    } else {
      setPageCount(Math.ceil(devices.totalCount / perPage));
    }
  }, [devices, date, status, page])

  return (
    <>
      <div className="lg:mx-6 mb-16 w-full">
        {tableLayout === "security" && (
          <div className="md:flex my-6 ">
            <div className="md:w-[160px] mr-4 w-full relative">
              <Select
                options={options}
                value={date}
                setValue={setDate}
                defaultValue="7"
                className="hidden md:flex w-full !h-[40px] text-xs mr-2"
                valueClass="px-1"
                wrapperClassName=" hover:!border-primary-100 focus:!border-primary-100"
              />
            </div>
            <div className="md:w-[160px] mr-4 w-full relative">
              <Select
                options={options2}
                value={status}
                setValue={setStatus}
                defaultValue="All"
                className="hidden md:flex w-full !h-[40px] text-xs mr-2"
                valueClass="px-1"
                wrapperClassName=" hover:!border-primary-100 focus:!border-primary-100"
              />
            </div>
          </div>
        )}
        <div className="relative">
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
            <>
              <table className="table-auto w-full">
                <colgroup>
                  <col className="w-[240px]"></col>
                </colgroup>
                <thead>
                  <tr>
                    <th className="dark:bg-black-900 bg-gray-1000 align-top text-xs leading-[20px] py-3 px-4 text-gray-900 text-left font-normal">
                      Date
                    </th>
                    <th className="dark:bg-black-900 bg-gray-1000 align-top text-xs leading-[20px] py-3 px-4 text-gray-900 text-left font-normal">
                      Source
                    </th>
                    <th className="dark:bg-black-900 bg-gray-1000 align-top text-xs leading-[20px] py-3 px-4 text-gray-900 text-left font-normal">
                      Activity
                    </th>
                    <th className="dark:bg-black-900 bg-gray-1000 align-top text-xs leading-[20px] py-3 px-4 text-gray-900 text-left font-normal">
                      Status
                    </th>
                    <th className="dark:bg-black-900 bg-gray-1000 align-top text-xs leading-[20px] py-3 px-4 text-gray-900 text-left font-normal">
                      IP Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStatusData?.map((device: ActivityItem, index: number) => (
                    <tr key={index}>
                      <td className="transition-shadow duration-300 bg-white-800 dark:bg-background-800 border-b dark:border-gray-700 border-gray-800 text-sm py-3 px-4 text-black-200 dark:text-white-100">
                        {formatTimestamp(device.timestamp)}
                      </td>
                      <td className="transition-shadow duration-300 bg-white-800 dark:bg-background-800 border-b dark:border-gray-700 border-gray-800 text-sm py-3 px-4 text-black-200 dark:text-white-100">
                        {isMobile(device.userAgent) ? "Mobile" : "Desktop"}
                      </td>
                      <td className="transition-shadow duration-300 bg-white-800 dark:bg-background-800 border-b dark:border-gray-700 border-gray-800 text-sm py-3 px-4 text-black-200 dark:text-white-100">
                        {device?.authName}
                      </td>
                      <td className="transition-shadow duration-300 bg-white-800 dark:bg-background-800 border-b dark:border-gray-700 border-gray-800 text-sm py-3 px-4 text-black-200 dark:text-white-100">
                        {device?.statusText}
                      </td>
                      <td className="transition-shadow duration-300 bg-white-800 dark:bg-background-800 border-b dark:border-gray-700 border-gray-800 text-sm py-3 px-4 text-black-200 dark:text-white-100">
                        {device.ip}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="lg:mt-6 flex md:flex-end mt-4 items-center flex-wrap">
                <Pagination
                  page={page}
                  setPage={setPage}
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
