"use client";
import { Icon } from "@/components/ui/icon";
import { KYCStatus } from "@/core/models/auth/models/kyc.model";
import { User } from "@/core/models/auth/models/user.model";
import { kycService } from "@/core/services/user/kyc.service";
import { RootState } from "@/core/store/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

export default function AccountIdentification() {
  const [data, setData] = useState([]);
  const user = useSelector((state: RootState) => state.user.user) as User;

  useEffect(() => {
    kycService.kycStatus().then((res: any) => {
      if (res?.success) {
        setData(res.data)
      }
    });
  }, [])
  
  const currentStep = useMemo(() => {
    const pendingData = data?.find((item: KYCStatus) => item.statusText === 'notstart');

    if (!pendingData) {
      return data?.find((item: KYCStatus) => (item.statusText.toLowerCase() === 'denied' || item.statusText.toLowerCase() === 'notstart'));
    } else {
      return pendingData;
    }

  }, [data])



  return (
    <div className="w-full mx-auto pt-6 md:pt-0 !max-w-full lg:px-8">
      <div className="font-semibold hidden md:block px-8 py-[28px] bg-white-200 dark:bg-background-200 text-[32px] leading-10 -mx-4">Identification</div>
      <div className="px-4 md:px-0 md:mx-4">
        <div className="md:mt-10 pb-10 border-b border-white-100 dark:border-gray-300 flex flex-col md:flex-row items-center w-full">
          <Image src={user?.profile?.profileImage || "/images/user.png"} width={64} height={64} alt="User" className="w-20 h-20 md:w-16 md:h-16 rounded-full mb-4 mb:mb-0 md:mr-4" />
          <div className="flex flex-col items-center md:items-start">
            <div className="text-lg font-semibold">{user?.email}</div>
            <div className="text-gray-300 dark:text-gray mb-2 text-sm md:hidden ">ID: {user?.userID}</div>
            <div className={twMerge(
              " text-sm py-0.5 mt-1 px-2 w-min rounded font-semibold whitespace-nowrap",
              !currentStep ? "bg-primary text-black-100" : "bg-secondary text-gray",
            )}>
              {!currentStep ? 'Verified' : 'Not Verified'}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <div className="block md:flex-[0_0_58.3%] md:max-w-[58.3%] w-full ">
          {currentStep && (
            <div className="bg-white-100 dark:bg-secondary rounded-md md:border-none my-6 md:my-8 p-6 flex flex-col justify-between min-h-[200px]">
              <div className="mb-4 text-xl">
                <div className="text-xl">
                  {(currentStep as KYCStatus)?.statusText?.toLowerCase() === 'pendingverification' ? 'Pending' : 'Complete'} {(currentStep as KYCStatus)?.moduleName}
                </div>
                {(currentStep as KYCStatus)?.comment && <div className="mt-4 text-sm text-gray dark:text-gray-100">
                  {(currentStep as KYCStatus)?.comment}
                </div>}
              </div>
              
              {/* <div className="text-sm text-gray dark:text-gray-100">Required:</div>
              <div className="ml-[3px] text-sm text-gray dark:text-gray-100">· Personal information</div>
              <div className="ml-[3px] text-sm text-gray dark:text-gray-100">· Government-issued ID</div>
              <div className="ml-[3px] text-sm text-gray dark:text-gray-100 mb-6">· Facial recognition</div> */}

              {(currentStep as KYCStatus)?.statusText?.toLowerCase() === 'pendingverification' &&
                <div className="flex items-center gap-2">
                  <Icon name="pending" className="text-gray-300 dark:text-gray" size={20} />
                  <div className="text-sm text-gray-300 dark:text-gray">Pending</div>
                </div>
                
              }
              {(currentStep as KYCStatus)?.statusText?.toLowerCase() !== 'pendingverification' &&
                <Link
                  href="/kyc-entry"
                  className="whitespace-nowrap w-[214px] bg-primary text-black-100 text-sm h-9 flex items-center justify-center px-4 rounded font-semibold"
                >
                  Continue Verification
                </Link>
              }
            </div>
          )}
            <div className="border-b border-white-100 dark:border-gray-300 md:border-none pb-6 md:pb-0">
              <div className="md:text-xl font-semibold pt-8 mb-4">Account Limits</div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-sm text-gray-300 dark:text-gray">
                  <Icon name="lock" size={16} />
                  Fiat Deposit & Withdrawal Limits
                </div>
                <div className="text-sm dark:text-white-500">--</div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-sm text-gray-300 dark:text-gray">
                  <Icon name="lock" size={16} />
                  Crypto Deposit Limit
                </div>
                <div className="text-sm dark:text-white-500">--</div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-sm text-gray-300 dark:text-gray">
                  <Icon name="lock" size={16} />
                  Crypto Withdrawal Limit
                </div>
                <div className="text-sm dark:text-white-500">--</div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-sm text-gray-300 dark:text-gray">
                  <Icon name="lock" size={16} />
                  P2P Transaction Limits
                </div>
                <div className="text-sm dark:text-white-500">--</div>
              </div>
            </div>
          </div>

          <div className="block md:flex-[0_0_33.3%] md:max-w-[33.3%]">
            <div className={twMerge("md:block hidden my-6 md:my-8")}>
              <div className="mb-8 w-full">
                <div className="mb-4 font-semibold text-xl dark:text-white-100 text-black-1000">
                  Verification Status
                </div>
                <div className="flex flex-col relative">
                  {data.map((step: KYCStatus, index) => (
                    <div
                      key={index}
                      className="flex flex-row [&:not(:last-child)]:pb-12 md:pr-4 gap-2.5 flex-1 relative"
                    >
                      <div
                        className={twMerge(
                          "flex items-center justify-center bg-white-400 dark:bg-gray-300 top-1 text-white-500 rounded-full dark:text-black-1000 text-[12px] font-medium h-4 w-4 relative  z-2 transition-colors duration-fast ease-linear",
                          step?.statusText?.toLowerCase() === 'approved' && "bg-green dark:bg-green",
                          step?.statusText?.toLowerCase() === 'denied' && "bg-error dark:bg-error",

                        )}
                      >
                        <div className="flex items-center justify-center">
                            <Icon
                              name={step?.statusText?.toLowerCase() === 'denied' ? "close" : "check1"}
                              size={12}
                              className={twMerge("text-white dark:text-black-1000")}
                            />
                        </div>
                      </div>

                      <div className="flex-1 w-auto md:w-[200px] transition-colors duration-100 ease-linear">
                        <div className="md:text-base text-xs">
                          <div
                            className="flex flex-col mt-0.5 font-semibold "
                          >
                            <div className={
                              twMerge(
                                "text-sm mb-2 text-gray dark:text-gray-200",
                                step?.statusText?.toLowerCase() === 'approved' && "text-green dark:text-green",
                                step?.statusText?.toLowerCase() === 'denied' && "text-error dark:text-error",
                              )}
                            > 
                              {step.statusText?.toLowerCase() === 'notstart' ? "Not Started" :
                                step.statusText?.toLowerCase() === 'pendingverification' ? "Pending" :
                                  step.statusText
                              }

                            </div>
                            <div>{step.moduleName}</div>
                          </div>
                        </div>
                      </div>

                      {index !== data?.length - 1 && <div
                        className={twMerge(
                          "absolute bottom-6 h-auto left-[7px] top-2 w-[2px] transform translate-y-5",
                          step?.statusText?.toLowerCase() === 'approved'
                           ? "bg-background-500 dark:bg-white-100" : "bg-white-400 dark:bg-gray-300"
                        )}
                      />}

                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:border-t pb-4 ">
              <div className="md:text-xl font-semibold pt-8 mb-4">FAQ</div>
              <Link href="/faq" className="underline text-sm dark:text-white-500">
                Identity Verification
              </Link>
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}
