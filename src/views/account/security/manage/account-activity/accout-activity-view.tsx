"use client";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { AccountActivityDesktop } from "./account-acitivity-desktop";
import { AccountActivityMobile } from "./account-activity-mobile";
import { Icon } from "@/components/ui/icon";
import { activityService } from "@/core/services/user/activity.service";

export const AccountActivityView = () => {
  const [data, setData] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState<"login" | "security">("login");

  useEffect(() => {
    if (selectedTab === "login") {
      activityService.loginActivites({ page: 1, pageSize: 10 })
        .then((res) => {
          if (res.data) {
            setData(res.data);
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      activityService.accountActivities({ page: 1, pageSize: 10 })
        .then((res) => {
          if (res.data) {
            setData(res.data);
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [selectedTab]);

  const tableLayout = selectedTab === "login" ? "login" : "security";

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
      <div className="xl2:px-0 sm:px-4 flex flex-col grow max-w-[1200px] w-full">
        <div className="flex items-center justify-between">
          <div className="sm:px-0 md:text-[32px] md:leading-[40px] font-semibold text-2xl px-4 text-black-100 dark:text-white-100 sm:mb-6">
            Account Activity Records
          </div>
        </div>
        <div className="flex flex-col flex-1 max-w-[1200px] mx-auto w-full">
          <div className="sm:px-6 sm:mb-10 mb-8 w-full"></div>
          <div className="md:flex-row sm:flex-row flex-col flex justify-between relative w-full">
            <div className="md:pl-6">
              <div className="relative">
                <div className="w-full flex overflow-scroll whitespace-nowrap relative mb-6 sm:px-0 px-4">
                  <div className="min-w-[auto] flex">
                    <div
                      onClick={() => setSelectedTab("login")}
                      className={twMerge(
                        "md:px-6 md:text-base md:mr-6 mx-0 mr-4 min-w-0 px-4 py-2 font-medium text-sm leading-5 select-none text-gray-500 dark:text-white-100 rounded cursor-pointer",
                        selectedTab === "login"
                          ? "bg-gray-1000 dark:bg-background-300 dark:text-white-100 text-black-200"
                          : ""
                      )}
                    >
                      Login Activity
                    </div>
                    <div
                      onClick={() => setSelectedTab("security")}
                      className={twMerge(
                        "md:px-6 md:text-base md:mr-6 mx-0 mr-4 min-w-0 px-4 py-2 font-medium text-sm leading-5 select-none text-gray-500 dark:text-white-100 rounded cursor-pointer",
                        selectedTab === "security"
                          ? "bg-gray-1000 dark:bg-background-300 dark:text-white-100 text-black-200"
                          : ""
                      )}
                    >
                      Account Activity
                    </div>
                  </div>
                  <div className="min-w-[auto]"></div>
                </div>
              </div>
            </div>
            <div className="h-8">
              <div className="mx-4 flex items-center sm:justify-end justify-start">
                <div className="text-sm text-gray-500 mr-1">
                  Suspicious account activity?
                </div>
                <Link
                  href={"/security/disable-account"}
                  className="underline text-sm text-primary-200 dark:text-primary-100"
                >
                  Disable Account
                </Link>
              </div>
            </div>
          </div>
          <div className="sm:block hidden">
            <AccountActivityDesktop
              devices={data}
              setData={setData}
              tableLayout={tableLayout}
            />
          </div>
          <div className="block sm:hidden">
            <AccountActivityMobile
              devices={data}
              setData={setData}
              tableLayout={tableLayout}
            />
          </div>
        </div>
      </div>
    </>
  );
};
