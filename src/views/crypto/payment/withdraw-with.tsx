import { Icon } from "@/components/ui/icon";
import { userBankService } from "@/core/services/user/bank.service";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const WithdrawWith = (props: any) => {
  const {
    selectedCurrency,
    selectedBank,
    setSelectedBank,
    setOpenBank,
    initData,
    setBankId
  } = props;

  const bankList = selectedCurrency?.userBankList;
  const [openDropdown, setOpenDropdown] = useState(false);
  const toast = useToast();

  const handleChangeBank = (bank: any) => {
    setSelectedBank(bank);
    setOpenDropdown(false);
  }

  const handleOpen = () => {
    setOpenDropdown(!openDropdown);
  }

  const deleteBank = (e: any, bank: any) => {
    e.preventDefault();
    e.stopPropagation();
    userBankService.deleteBankAccount(bank.userBankId).then((res) => {
      if (res.success) {
        initData();
        toast?.open('Bank account deleted successfully', 'check-circle', '', 'text-success');
      } else {
        toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
      }
    });
  }

  useEffect(() => {
    if (bankList && bankList.length < 1) {
      setOpenDropdown(false);
    }
  }, [bankList]);

  return (
    <div className="mt-8 mb-8 cursor-pointer relative">
      <div className="dark:text-white-100 text-black-1000 text-sm mb-1">
        Withdraw With
      </div>
      <div
        className="lg:min-h-[56px] min-h-[48px] cursor-pointer w-full"
        onClick={() => {
          bankList?.length > 0 ?
            handleOpen() : setOpenBank(true)
        }}
      >
        <div className="py-3 md:dark:bg-background dark:bg-black-600 md:bg-transparent bg-white-300 flex items-center justify-between cursor-pointer px-3 h-full md:border md:dark:border-gray-300 rounded-md  md:border-gray-800 border-white-100 md:dark:hover:border-primary md:hover:border-primary-200">
          <div className="flex items-start">
            {
              bankList?.length > 0 ?
                <Image src="/images/pay-1.png" alt="" width={24} height={24} /> :
                <Icon name="circle-plus" size={24} />
            }
            <div className="flex flex-col dark:text-gray-800 text-black-200 md:text-base text-base ml-2 font-semibold">
              {bankList?.length < 1 && "Add Bank"}
              {selectedBank?.bankName && <span>Bank Transfer ({selectedBank?.bankName})</span>}
              {selectedBank?.accountNumber && <span className="text-sm font-normal text-gray-300 dark:text-gray">Account Number: {selectedBank?.accountNumber}</span>}
            </div>
          </div>
          {bankList?.length > 0 && <div>
            <Icon
              name="chevron-down"
              size={20}
              className="!text-gray hover:!text-white-100 mt-[3px]"
            />
          </div>}
        </div>
      </div>
      {
        openDropdown &&
        <div
          className={twMerge(
            "absolute top-[90px] max-h-[300px] overflow-auto z-40 w-full  rounded-b-xl bg-white dark:bg-black-100 shadow-md",
            bankList?.length < 1 && "top-[72px]"
          )}
        >
          {
            bankList?.map((bank: any, index: number) => (
              <div
                onClick={() => handleChangeBank(bank)}
                className={twMerge(
                  "pt-5 pb-5 pr-4 pl-4 hover:bg-white-100 hover:dark:bg-black-200 flex items-center justify-between",
                  selectedBank?.accountNumber === bank.accountNumber ? "bg-white-100 dark:bg-secondary" : ""
                )}
              >
                <div className="flex gap-2 items-start">
                  <Image src="/images/pay-1.png" alt="" width={24} height={24} />
                  <div className="flex flex-col">
                    <div className="dark:text-white-100 text-black-1000 text-base font-semibold">
                      {bank?.bankName}
                    </div>
                    {bank?.accountNumber && <div className="mt-1 text-sm">Account Number: {bank?.accountNumber}</div>}
                    {bank?.swiftCode && <div className="mt-1 text-sm">Swift Code: {bank?.swiftCode}</div>}
                    {bank?.accountHolderName && <div className="mt-1 text-sm">Account Name: {bank?.accountHolderName}</div>}
                    {bank?.iban && <div className="mt-1 text-sm">IBAN: {bank?.iban}</div>}
                    {bank?.description && <div className="mt-1 text-sm" dangerouslySetInnerHTML={{ __html: bank?.description.replace("\n", "<br>") }}></div>}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="cursor-pointer text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100"
                    onClick={() => {
                      setBankId(bank.userBankId)
                      setOpenBank(true)
                    }}
                  >
                    <Icon name="edit" size={20} />
                  </div>
                  <div
                    className="cursor-pointer text-gray-300 dark:text-gray hover:text-black-100 dark:hover:text-white-100"
                    onClick={(e) => deleteBank(e, bank)}
                  >
                    <Icon name="trash" size={20} />
                  </div>
                </div>
              </div>
            ))
          }
          <div
            onClick={() => setOpenBank(true)}
            className={twMerge(
              "pt-5 pb-5 pr-4 pl-4 hover:bg-white-100 hover:dark:bg-black-200",
              "rounded-b-xl"
            )}
          >
            <div className="flex gap-2 items-start">
              <Icon name="circle-plus" size={24} />
              <div className="flex flex-col">
                <div className="dark:text-white-100 text-black-1000 text-base font-semibold">
                  Add Bank
                </div>
              </div>
            </div>
          </div>
        </div>
      }

    </div >
  );
};
