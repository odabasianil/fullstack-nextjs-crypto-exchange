import { Modal } from "@/components/ui/modal";
import { Step } from "@/components/ui/step";
import { withdrawService } from "@/core/services/user/withdraw.service";
import { useToast } from "@/hooks/use-toast";
import { customFormatDate } from "@/utils/format-date";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { WithdrawFiatDetail } from "./detail";
import { NoResult } from "../payment/no-result";

export const WithdrawFiatHistory = (props: any) => {
  const { data, setData } = props;
  const [detail, setDetail] = useState<any>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const toast = useToast();

  const deleteWithdraw = (e: any, withdrawFiatId: number) => {
    e.stopPropagation();
    e.preventDefault();

    withdrawService.deleteWithdrawFiat({ withdrawFiatId }).then((res) => {
      if (res.success) {
        toast?.open('Withdrawal deleted successfully', 'check-circle', '', 'text-success');
        withdrawService.withdrawFiatList().then((res) => {
          if (!res.error || !res.warning) {
            setData(res.data);
          }
        });
      } else {
        toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
      }
    })
  }

  const findStatusText = (status: number) => {
    switch (status) {
      case 1:
        return 'Pending';
      case 2:
        return 'In Process';
      case 3:
        return 'Cancelled';
      case 4:
        return 'Failed';
      case 5:
        return 'Completed';
      default:
        return '-';
    }
  }

  const handleClickDetail = (item: any) => {
    withdrawService.withdrawFiatDetail({ WithdrawFiatId: item?.withdrawFiatId }).then((res) => {
      if (res.data) {
        setDetail(res.data);
        setOpenDetail(true);
      }
    });
  }

  return (
    <>
      <div className="px-4 md:px-0 text-lg md:text-[24px] mb-6 font-semibold">
        Recent Fiats
      </div>
      <div className="pl-4 md:pl-0 mt-6">
        <div className="overflow-x-auto no-scrollbar ">
          <div className="flex items-center ">
            <div className="min-w-[150px] w-[150px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap border-y border-white-100 dark:border-secondary">Created Date</div>
            <div className="min-w-[170px] w-[220px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap text-center border-y border-white-100 dark:border-secondary">Bank Name</div>
            <div className="min-w-[170px] w-[220px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap text-center border-y border-white-100 dark:border-secondary">Bank Number</div>
            <div className="min-w-[120px] w-[120px] md:w-[170px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap text-center border-y border-white-100 dark:border-secondary">Symbol</div>
            <div className="min-w-[90px] w-[90px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap text-center border-y border-white-100 dark:border-secondary">Amount</div>
            <div className="min-w-[160px] w-[160px] md:w-[210px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap text-center border-y border-white-100 dark:border-secondary">Status</div>
            <div className="min-w-[90px] w-[90px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap text-right border-y border-white-100 dark:border-secondary">Action</div>
          </div>
          <div className="max-h-[600px] overflow-y-auto no-scrollbar-mobile">
            {
              data?.length < 1 &&
              <NoResult text="No recent fiat withdrawals" imageClass="mt-20" width={72} height={72} />
            }
            {
              data?.map((item: any) => {
                return (
                  <div onClick={() => handleClickDetail(item)} className="w-full cursor-pointer flex items-center ">
                    <div className="min-w-[150px] w-[150px] px-4 py-3 text-sm whitespace-nowrap border-y border-white-100 dark:border-secondary ">{customFormatDate(item?.created, 'DD/MM/YYYY HH:mm:ss')}</div>
                    <div className="min-w-[170px] w-[220px] px-4 py-3 text-sm whitespace-nowrap border-y border-white-100 dark:border-secondary text-center">{item?.userBank?.bankName || '-'}</div>
                    <div className="min-w-[170px] w-[220px] px-4 py-3 text-sm whitespace-nowrap border-y border-white-100 dark:border-secondary text-center">{item?.userBank?.accountNumber || '-'}</div>
                    <div className="min-w-[120px] w-[120px] md:w-[170px] px-4 py-3 text-sm whitespace-nowrap border-y border-white-100 dark:border-secondary text-center">{item?.symbol}</div>
                    <div className="font-bold min-w-[90px] w-[90px] px-4 py-3 text-sm whitespace-nowrap border-y border-white-100 dark:border-secondary text-center">{item?.amount || '-'}</div>
                    <div className={twMerge(
                      "min-w-[160px] w-[160px] md:w-[210px] px-4 py-3 text-sm whitespace-nowrap border-y border-white-100 dark:border-secondary text-center text-primary-100",
                      item?.status == 5 && 'text-success',
                      item?.status == 3 && 'text-error',
                      item?.status == 4 && 'text-error'
                    )}>{findStatusText(item?.status)}</div>
                    <div className="cursor-pointer min-w-[90px] w-[90px] text-primary-100 text-sm px-4 py-3 text-right flex justify-end border-y border-white-100 dark:border-secondary h-[46px]" onClick={(e) => deleteWithdraw(e, item?.withdrawFiatId)}>
                      {item?.status === 1 ? 'Cancel' : ''}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <WithdrawFiatDetail
        detail={detail}
        open={openDetail}
        setOpen={setOpenDetail}
        findStatusText={findStatusText}
      />
    </>
  )
}