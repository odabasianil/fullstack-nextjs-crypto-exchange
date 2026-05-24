'use client'

import { subUserService } from "@/core/services/user/subuser.service";
import { useToast } from "@/hooks/use-toast";
import { NoResult } from "@/views/crypto/payment/no-result";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";


export const AssetManagementView = () => {
  const [subUsers, setSubUsers] = useState<any[]>([]);
  const toast = useToast();

  useEffect(() => {
    subUserService.getAllSubUser().then((res: any) => {
      if (res?.success) {
        setSubUsers(res.data);
      } else {
        console.log(res)
        toast?.open(res?.MessageList?.[0]?.Message, 'circle-close', '', 'text-error');
      }
    }).catch((err) => {
      console.log(err)
      toast?.open(err?.response?.data?.MessageList?.[0]?.Message, 'circle-close', '', 'text-error');
    })
  }, [])

  return (
    <>
      <div className="px-4 md:px-8 py-6 bg-api-linear">
        <div className="text-sm text-gray-300 dark:text-gray">Sub Account</div>
        <div className="text-xl md:text-[32px] md:leading-10 font-bold">Account Management</div>
      </div>
      <div className="overflow-x-auto no-scrollbar mt-8 ">
        <div className="flex table-auto items-center border-y border-white-100 dark:border-secondary">
          <div className="min-w-[200px] w-1/5 px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap">Email</div>
          <div className="min-w-[90px] w-1/5 px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap text-center">Status</div>
          <div className="min-w-[160px] w-1/5 px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap text-center">Total Balance</div>
          <div className="min-w-[160px] w-1/5 px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap text-center">Transfer</div>
          <div className="min-w-[120px] w-1/5 px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap text-center">Action</div>
        </div>
        <div className="pb-10 w-full">
          {subUsers?.map((subUser) => (
            <div className="flex table-auto items-center border-y border-white-100 dark:border-secondary w-full">
              <div className="min-w-[200px] w-1/5 px-4 py-3 text-sm whitespace-nowrap">{subUser?.email}</div>
              <div className={twMerge(
                "min-w-[90px] w-1/5 px-4 py-3 text-xs whitespace-nowrap text-center",
                subUser?.status == 10 ? 'text-success' : 'text-error'
              )}>
                {subUser?.statusText}
              </div>
              <div className="min-w-[160px] w-1/5 px-4 py-3 text-sm whitespace-nowrap text-center">0</div>
              <div className="min-w-[160px] w-1/5 px-4 py-3 text-sm whitespace-nowrap text-center flex justify-center items-center gap-2">
                <Link
                  className="text-primary-100"
                  href={`/me/sub-account/asset-management/transfer/?direction=in&userId=${subUser?.userID}&email=${subUser?.email}&asset=BTC`}
                >
                  Transfer In
                </Link>
                <Link
                  className="text-primary-100"
                  href={`/me/sub-account/asset-management/transfer/?direction=out&userId=${subUser?.userID}&email=${subUser?.email}&asset=BTC`}
                >
                  Transfer Out
                </Link>
              </div>
              <div className="min-w-[120px] w-1/5 px-4 py-3 text-sm whitespace-nowrap text-center">Action</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}