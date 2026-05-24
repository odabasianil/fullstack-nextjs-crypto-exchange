"use client";
import { useEffect, useState } from "react";
import { DeviceManagementDesktop } from "./device-management-desktop";
import { DeviceManagementMobile } from "./device-management-mobile";
import { Modal } from "@/components/ui/modal";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { userService } from "@/core/services/user/user.service";
import { setCookie } from "@/utils/set-cookie";

export const DeviceManagementView = () => {
  const [devices, setDevices] = useState<any>([]);

  const [open, setOpen] = useState(false);

  const logout = async () => {
    try {
      await userService.logout();
      setCookie('user', '', -1);
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogoutClick = (device: any) => {
    logout();
    console.log(`Logging out from device: ${device.id}`);
    setOpen(true);
  };

  useEffect(() => {
    userService.getSessionList().then((res) => {
      console.log(res.data)
      setDevices(res.data)
    });
  }, [])

  return (
    <>
      <div className="md:px-0 px-4 sm:h-[72px] sm:min-h-[72px] w-full max-w-[1280px] h-[56px] flex mx-auto">
        <Link
          className="text-black-300 hover:text-white-100 flex items-center"
          href="/me/security"
        >
          <Icon name="chevron-left" className="mr-1" size={20} />
          Security
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="sm:px-0 md:text-[32px] md:leading-[40px] font-semibold text-2xl px-4 text-black-100 dark:text-white-100 sm:mb-6">
          My Devices
        </div>
      </div>
      <div className="md:table hidden">
        <DeviceManagementDesktop
          devices={devices}
          onLogoutClick={handleLogoutClick}
        />
      </div>
      <div className="md:hidden block">
        <DeviceManagementMobile
          devices={devices}
          onLogoutClick={handleLogoutClick}
        />
      </div>

      <Modal
        className="md:w-[360px] md:max-w-[80vw] w-full"
        open={open}
        setOpen={setOpen}
      >
        <div className="flex flex-col items-center">
          <Icon name="payment-warning" className="text-primary-100" size={64} />
          <div className="text-black-100 dark:text-white-100 text-sm text-center">
            Are you sure you want to log out of this device?
          </div>
          <div className="flex items-center w-full gap-2">
            <Button
              appearance="secondary"
              className="dark:bg-background-400 bg-white-100 dark:!text-white-100 !text-black-100  opacity-80 w-full h-10 flex items-center justify-center rounded-xl font-normak mt-6"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
            <Button
              appearance="primary"
              className="w-full h-10 flex items-center justify-center rounded-xl font-normal mt-6"
              onClick={() => setOpen(false)}
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
