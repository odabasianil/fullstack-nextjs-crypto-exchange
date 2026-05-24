// import { withdrawService } from "@/core/services/user/withdraw.service";
import { useToast } from "@/hooks/use-toast";
import { customFormatDate } from "@/utils/format-date";
import { NoResult } from "@/views/crypto/payment/no-result";
import { useState } from "react"
import { twMerge } from "tailwind-merge";
import { WithdrawCryptoDetail } from "./detail";
import { useTranslation } from "react-i18next";


export const RecentWithdrawals = (props: any) => {
  const { data, coins, setRecentWithdrawals } = props;
  const { t } = useTranslation();
  const tabs = [t('withdraw.address')];
  const [detail, setDetail] = useState<any>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0])
  const toast = useToast();

  const deleteWithdraw = (withdrawCryptoId: number) => {
    // withdrawService.deleteWithdraw({ withdrawCryptoId }).then((res) => {
    //   if (res.success) {
    //     toast?.open('Withdrawal deleted successfully', 'circle-check', '', 'text-success');
    //     withdrawService.withdrawCryptoList().then((res) => {
    //       console.log(res);
    //       if (!res.error || !res.warning) {
    //         setRecentWithdrawals(res.data);
    //       }
    //     });
    //   } else {
    //     toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
    //   }
    // })
  }

  const findStatusText = (status: number) => {
    switch (status) {
      case 1:
        return t('withdraw.pending');
      case 2:
        return t('withdraw.inprocess');
      case 3:
        return t('withdraw.cancelled');
      case 4:
        return t('withdraw.failed');
      case 5:
        return t('withdraw.completed');
      default:
        return '-';
    }
  }

  const handleClickDetail = (item: any) => {
    // withdrawService.withdrawCryptoDetail({ withdrawId: item?.withdrawCryptoId }).then((res) => {
    //   if (res.data) {
    //     setDetail(res.data);
    //     setOpenDetail(true);
    //   }
    // });
  }

  return (
    <>
      <div className="text-lg md:text-[24px] mb-6 font-semibold">
        {t('withdraw.recent_withdrawals')}
      </div>
      <div className="flex items-start gap-6">
        {
          tabs.map((tab, index) => (
            <div
              onClick={() => setActiveTab(tab)}
              className={twMerge(
                'text-sm cursor-pointer font-semibold py-2 px-4 rounded-md text-gray-300 dark:text-gray',
                activeTab === tab && 'text-black-100 dark:text-white-100 bg-white-100 dark:bg-secondary'
              )}
            >
              {tab}
            </div>
          ))
        }
      </div>
      <div className="mt-6">
        <div className="overflow-x-auto no-scrollbar ">
          <div className="flex items-center">
            <div className="min-w-[150px] w-[150px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap border-y border-white-100 dark:border-secondary">{t('withdraw.created_date')}</div>
            <div className="min-w-[170px] w-[170px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap border-y border-white-100 dark:border-secondary text-center">{t('withdraw.address')}</div>
            <div className="min-w-[120px] w-[120px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap border-y border-white-100 dark:border-secondary text-center">{t('withdraw.symbol')}</div>
            <div className="min-w-[200px] w-[200px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap border-y border-white-100 dark:border-secondary text-center">{t('withdraw.network')}</div>
            <div className="min-w-[160px] w-[160px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap border-y border-white-100 dark:border-secondary text-center">{t('withdraw.status')}</div>
            <div className="min-w-[90px] w-[90px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap border-y border-white-100 dark:border-secondary text-center">{t('withdraw.amount')}</div>
            <div className="min-w-[90px] w-[90px] px-4 py-3 text-xs text-gray-300 dark:text-gray whitespace-nowrap border-y border-white-100 dark:border-secondary text-right">{t('withdraw.action')}</div>
          </div>
          <div className="max-h-[600px] overflow-y-auto no-scrollbar-mobile">
            {
              data?.length < 1 &&
              <NoResult text="No recent crypto withdrawals" imageClass="mt-20" width={72} height={72} />
            }
            {
              data?.map((item: any) => {
                const network = coins?.map((coin: any) => coin?.blockchainList?.find((blockchain: any) => blockchain?.blockchainId === item?.currencyBlockchainId) ?? false).filter((network: any) => network)
                return (
                  <div onClick={() => handleClickDetail(item)} className="cursor-pointer flex items-center">
                    <div className="min-w-[150px] w-[150px] px-4 py-3 text-sm whitespace-nowrap border-y border-white-100 dark:border-secondary">{customFormatDate(item?.created, 'DD/MM/YYYY HH:mm:ss')}</div>
                    <div className="min-w-[170px] w-[170px] px-4 py-3 text-sm whitespace-nowrap border-y border-white-100 dark:border-secondary text-center">{item?.address || '-'}</div>
                    <div className="min-w-[120px] w-[120px] px-4 py-3 text-sm whitespace-nowrap border-y border-white-100 dark:border-secondary text-center">{item?.symbol}</div>
                    <div className="min-w-[200px] w-[200px] px-4 py-3 text-sm whitespace-nowrap border-y border-white-100 dark:border-secondary text-center">{network?.[0]?.name}</div>
                    <div className={twMerge(
                      "min-w-[160px] w-[160px] px-4 py-3 text-sm whitespace-nowrap border-y border-white-100 dark:border-secondary text-center text-primary-100",
                      item?.status == 5 && 'text-success',
                      item?.status == 3 && 'text-error',
                      item?.status == 4 && 'text-error'
                    )}>{findStatusText(item?.status)}</div>
                    <div className="min-w-[90px] w-[90px] px-4 py-3 text-sm whitespace-nowrap border-y border-white-100 dark:border-secondary text-center">{item?.amount || '-'}</div>
                    {item?.status === 1 && <div className="cursor-pointer min-w-[90px] w-[90px] text-primary-100 text-sm px-4 py-3 text-right flex justify-end border-y border-white-100 dark:border-secondary" onClick={() => deleteWithdraw(item?.withdrawCryptoId)}>
                      {t('withdraw.cancel')}
                    </div>}
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

      <WithdrawCryptoDetail
        detail={detail}
        open={openDetail}
        setOpen={setOpenDetail}
        findStatusText={findStatusText}
        coins={coins}
      />

    </>
  )
}