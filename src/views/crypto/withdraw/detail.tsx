import { Modal } from "@/components/ui/modal"
import { Step } from "@/components/ui/step"
import { customFormatDate } from "@/utils/format-date";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export const WithdrawFiatDetail = (props: any) => {
  const { detail, open, setOpen, findStatusText } = props;

  return (

    <Modal
      open={open}
      setOpen={setOpen}
      title="Withdrawal Details"
      showCloseButton
      className="md:min-w-[500px]"
      titleClass="text-xl"
    >
      <div className="pt-4 pb-6 border-b border-white-100 dark:border-gray-300">
        <Step
          className="[&:not(:last-child)]:pb-6"
          index={1}
          isActive={[1, 2, 5].includes(detail?.status)}
          title="Withdrawal Order Submitted"
          titleClass="text-base !mb-0"

        >
          <div className="font-normal text-gray-300 dark:text-gray text-sm">
            {customFormatDate(detail?.created, 'DD/MM/YYYY HH:mm:ss')}
          </div>
        </Step>
        <Step
          className="[&:not(:last-child)]:pb-6"
          index={2}
          isActive={[2, 5].includes(detail?.status)}
          title="System Processing"
          titleClass="text-base !mb-0"

        >
          {detail?.status === 2 && <div className="font-normal text-gray-300 dark:text-gray text-sm">
            {customFormatDate(detail?.updated, 'DD/MM/YYYY HH:mm:ss')}
          </div>}
        </Step>
        <Step
          className="[&:not(:last-child)]:pb-6"
          index={3}
          isActive={detail?.status === 5}
          title="Completed"
          titleClass="text-base !mb-0"

          isLast={detail?.status !== 3}
        >
          <div className="font-normal text-gray-300 dark:text-gray text-sm">
            {customFormatDate(detail?.updated, 'DD/MM/YYYY HH:mm:ss')}
          </div>
          <div className="font-normal text-gray-300 dark:text-gray text-sm">
            Please not that you will receive a email once it is completed.
          </div>
        </Step>
        {
          detail?.status === 3 &&
          <Step
            index={4}
            isActive={detail?.status === 3}
            title="Cancelled"
            titleClass="text-base !mb-0 text-error dark:text-error"
            isLast
            isFailed
          >
            <div className="font-normal text-gray-300 dark:text-gray text-sm">
              {customFormatDate(detail?.updated, 'DD/MM/YYYY HH:mm:ss')}
            </div>
          </Step>
        }
      </div>
      <div className="pt-4 flex flex-col gap-4">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-300 dark:text-gray">Status</div>
          <div className={twMerge(
            "whitespace-nowrap text-primary-100",
            detail?.status == 5 && 'text-success',
            detail?.status == 3 && 'text-error',
            detail?.status == 4 && 'text-error'
          )}>{findStatusText(detail?.status)}</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-300 dark:text-gray">Date</div>
          <div className="">{customFormatDate(detail?.created, 'DD/MM/YYYY HH:mm:ss')}</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-300 dark:text-gray">Coin</div>
          <div className="flex gap-2">
            <Image
              src={`/images/coins/${detail?.symbol?.toLowerCase()}.png`}
              width={20}
              height={20}
              alt={detail?.symbol}
            />
            {detail?.symbol}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-300 dark:text-gray">Withdraw Amount</div>
          <div className="">{detail?.amount}</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-300 dark:text-gray">Bank Name</div>
          <div className="">{detail?.userBank?.bankName}</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-300 dark:text-gray">Account Number</div>
          <div className="">{detail?.userBank?.accountNumber}</div>
        </div>
      </div>
    </Modal>
  )
}