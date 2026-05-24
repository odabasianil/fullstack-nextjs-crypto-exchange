import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { customFormatDate } from "@/utils/format-date";

type Device = {
  location: string;
  ipAddress: string;
  isCurrent: boolean;
  userAgent: string;
  lastActivity: string;
  device: string;
};

type DeviceManagementDesktopProps = {
  devices: Device[];
  onLogoutClick?: (device: Device) => void;
};

export const DeviceManagementDesktop = ({
  devices,
  onLogoutClick,
}: DeviceManagementDesktopProps) => {

  const isMobile = (userAgent: string) => {
    const mobileKeywords = [
      "Android", "iPhone", "iPad", "iPod", "Opera Mini",
      "IEMobile", "Mobile", "Windows Phone"
    ];

    return mobileKeywords.some(keyword => userAgent.includes(keyword));
  }


  return (
    <table className="table-auto w-full">
      <colgroup></colgroup>
      <thead>
        <tr className="bg-white-200 dark:bg-background-200">
          <th className="!font-normal first:ps-4 text-gray text-xs py-3 px-4 text-start lg:w-[400px] w-[237px]">
            Device
          </th>
          <th className="!font-normal text-gray text-xs py-3 px-4 text-start lg:w-[240px] w-[144px]">
            Last Login
          </th>
          <th className="!font-normal text-gray text-xs py-3 px-4 text-start lg:w-[240px] w-[132px]">
            Location
          </th>
          <th className="!font-normal text-gray text-xs py-3 px-4 text-start lg:w-[156px] w-[111px]">
            IP Address
          </th>
          <th className="!font-normal text-gray text-xs py-3 px-4 text-center lg:w-[164px] w-[96px]">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {devices?.map((device, index) => (
          <tr key={index} className="border-b border-white-100 dark:border-secondary hover:bg-white-200 dark:hover:bg-black-100">
            <td
              className={twMerge(
                "ps-4 text-sm py-[18px] px-4 lg:w-[240px] w-[144px] text-black-200 dark:text-white-100 relative"
              )}
            >
              <div className="flex items-center">
                <Image
                  src={
                    device.isCurrent
                      ? "/images/active-device.png"
                      : "/images/device.png"
                  }
                  alt="device"
                  width={24}
                  height={24}
                />
                <div className="ml-4">
                  <div className="flex items-center">{device.device}</div>
                  {device.isCurrent && (
                    <div className="flex items-center text-xs mt-1">
                      <Icon
                        name="check-circle"
                        className="text-green-200"
                        size="16"
                      />
                      <div>Current Device</div>
                    </div>
                  )}
                </div>
              </div>
            </td>
            <td
              className={twMerge(
                "ps-4 text-sm py-[18px] px-4 lg:w-[240px] w-[132px] text-black-200 dark:text-white-100 relative"
              )}
            >
              <div>{customFormatDate(device.lastActivity, 'DD/MM/YYYY')}</div>
            </td>
            <td
              className={twMerge(
                "ps-4 text-sm py-[18px] px-4 lg:w-[240px] w-[132px] text-black-200 dark:text-white-100 relative"
              )}
            >
              <div>{device.location}</div>
            </td>
            <td
              className={twMerge(
                "ps-4 text-sm py-[18px] px-4 lg:w-[400px] w-[237px] text-black-200 dark:text-white-100 relative"
              )}
            >
              <div>{device.ipAddress}</div>
            </td>
            <td
              className={twMerge(
                "ps-4 text-sm py-[18px] px-4 lg:w-[164px] w-[96px] text-black-200 dark:text-white-100 relative text-center cursor-pointer"
              )}
              onClick={() => onLogoutClick && onLogoutClick(device)}
            >
              {device.isCurrent && (
                <div className="text-primary-100 underline">Log out</div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
