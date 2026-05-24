import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

type Device = {
  location: string;
  ipAddress: string;
  isCurrent: boolean;
  userAgent: string;
  lastActivity: string;
  device: string;
};

type DeviceManagementMobileProps = {
  devices: Device[];
  onLogoutClick?: (device: Device) => void;
};

export const DeviceManagementMobile = ({
  devices,
  onLogoutClick,
}: DeviceManagementMobileProps) => {
  return (
    <div className="px-4 grow flex flex-col pt-4">
      <div className="overflow-y-auto !h-[calc(100vh-240px)]">
        {devices.map((device, index) => (
          <div key={index} className="flex flex-start mb-8">
            <div className="flex h-8 items-center">
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
            </div>
            <div className="ml-3">
              <div className="text-base flex font-medium items-center mb-2 text-gray-300 dark:text-white-500 max-w-[200px]">
                {device.device}
              </div>
              <div className="text-xs text-gray-300 dark:text-white-500 mb-2">
                Last Login: {device.lastActivity}
              </div>
              <div className="text-xs text-gray-300 dark:text-white-500 mb-2">
                Location: {device.location}
              </div>
              <div className="text-xs text-gray-300 dark:text-white-500 mb-2">
                IP Address: {device.ipAddress}
              </div>
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
            <div className="flex justify-end flex-1">
              {device.isCurrent && (
                <Button className="h-8 py-0 whitespace-nowrap" appearance="secondary" onClick={() => onLogoutClick && onLogoutClick(device)}>Log out</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
