"use client";
import { Icon } from "@/components/ui/icon";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { CurrencyModal } from "@/components/ui/currency-modal";
import { Button } from "@/components/ui/button";
import { userBankService } from "@/core/services/user/bank.service";
import { BankModal } from "@/views/account/bank-modal";
import { Input } from "@/components/ui/input";
import { withdrawService } from "@/core/services/user/withdraw.service";
import { WithdrawWith } from "../payment/withdraw-with";
import { Verify2FAModal } from "@/views/account/security/verify2fa-modal";
import { Verify2FA } from "@/utils/verify-2fa";
import { useToast } from "@/hooks/use-toast";
import { Modal } from "@/components/ui/modal";
import { SuccessModal } from "@/views/success-modal";
import { WithdrawFiatHistory } from "./history";
import SideBarContent from "../deposit/sidebar-content";

const WithdrawFiat = () => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [openBank, setOpenBank] = useState(false);
  const [editBankId, setEditBankId] = useState(null);
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [openVerify2FAModal, setOpenVerify2FAModal] = useState(false);
  const [verify2FAModalData, setVerify2FAModalData] = useState<any>();
  const [successModal, setSuccessModal] = useState(false);
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const maxAmount = useMemo(() => {
    return selectedCurrency?.free
  }, [selectedCurrency])

  const handleOpenModal = () => {
    setOpen(true);
  };

  const initData = () => {
    withdrawService.withdrawFiatInit().then((res) => {
      if (res.data) {
        setCurrencies(res.data);
        if (!selectedCurrency) {
          setSelectedCurrency(res.data[0])
        } else {
          setSelectedCurrency(res.data.find((currency: any) => currency.symbol === selectedCurrency.symbol))
        }
        const firstBankList = res.data[0]?.userBankList;

        if (firstBankList) {
          if (!selectedBank) {
            setSelectedBank(res.data[0]?.userBankList[0])
          } else {
            setSelectedBank(firstBankList?.[firstBankList?.length - 1]);
          }
        } else {
          setSelectedBank(null);
        }
      }
    });

    withdrawService.withdrawFiatList().then((res) => {
      if (res.data) {
        setHistoryList(res.data);
      }
    });
  }

  const handle2FAVerification = (e: any, require2FAData: any) => {
    Verify2FA("2FA Verification", "Verify", require2FAData, setOpenVerify2FAModal, setVerify2FAModalData).subscribe({
      next: (verifyResponse: any) => {
        if (verifyResponse.success) {
          handleSubmit(e, verifyResponse?.data?.require2FA?.actionID)
          setOpenVerify2FAModal(false);
        }
      },
      error: (err) => {
        console.error('2FA verification error:', err);
        toast?.open('2FA verification failed', 'circle-close', '', 'text-error');
      }
    });
  };

  const handleSubmit = (e: React.FormEvent, actionId?: number) => {
    e.preventDefault();
    setError(null);

    if (inputValue === "") {
      setError("Please enter amount");
      return;
    }

    if (parseFloat(inputValue) > parseFloat(maxAmount) || parseFloat(inputValue) < parseFloat(selectedCurrency?.minWithdrawAmount)) {
      setError("Insufficient balance");
      return;
    }
    setIsLoading(true);
    if (selectedCurrency && selectedBank) {
      withdrawService.createWithdrawFiat({
        symbol: selectedCurrency?.symbol,
        amount: inputValue,
        userBankId: selectedBank?.userBankId,
        actionId
      }).then((res) => {
        if (res.success) {
          const require2FAData = res.data.require2FA;
          if (require2FAData?.required2FA && !actionId) {
            handle2FAVerification(e, require2FAData);
          } else {
            setOpenVerify2FAModal(false);
            initData();
            setSuccessModal(true);
            setInputValue("");
          }
        } else {
          toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
          setError(res?.messageList?.[0]?.message);
        }
      }).finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
    }
  };

  useEffect(() => {
    if (selectedCurrency) {
      const firstBankList = selectedCurrency?.userBankList;

      if (firstBankList) {
        if (!selectedBank) {
          setSelectedBank(selectedCurrency?.userBankList[0])
        } else {
          setSelectedBank(firstBankList?.[firstBankList?.length - 1]);
        }
      } else {
        setSelectedBank(null);
      }
    }
  }, [selectedCurrency]);

  useEffect(() => {
    initData();
  }, [])

  return (
    <>
      <div className="flex md:flex-row justify-between flex-col px-4 lg:min-w-[calc(100vh-64px)] relative md:px-6 xl2:px-0 md:pt-6 pt-4">
        <form className="md:w-auto w-full" onSubmit={handleSubmit}>
          <div className="lg:w-[588px] md:w-[384px] w-full md:mb-40 mb-10 ">
            <div className="text-sm mb-1 dark:text-white-100 text-black-1000">
              Currency
            </div>
            <div className="flex justify-between items-center">
              <div className="lg:h-[56px] h-[48px] cursor-pointer w-full" onClick={handleOpenModal}>
                <div className="md:dark:bg-background dark:bg-black-600 md:bg-transparent bg-white-300 flex items-center justify-between cursor-pointer px-3 h-full md:border md:dark:border-gray-300 rounded-md  md:border-gray-800 border-white-100 md:dark:hover:border-primary md:hover:border-primary-200">
                  <div className="flex items-center">
                    <Image
                      src={`/images/coins/${selectedCurrency?.symbol?.toLowerCase()}.png`}
                      alt=""
                      width={24}
                      height={24}
                    />
                    <div className="dark:text-gray-800 text-black-200 md:text-base text-base ml-1 font-semibold">
                      <span>{selectedCurrency?.symbol || currencies?.[0]?.symbol}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 dark:text-white-400">
                    <div className="font-bold">{maxAmount} {selectedCurrency?.symbol}</div>
                    <Icon
                      name="chevron-down"
                      size={20}
                      className="!text-gray hover:!text-white-100 mt-[3px]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <WithdrawWith
              selectedCurrency={selectedCurrency}
              selectedBank={selectedBank}
              setSelectedBank={setSelectedBank}
              setOpenBank={setOpenBank}
              initData={initData}
              setBankId={setEditBankId}
            />
            <div className="">
              <div className="relative w-full">
                <Input
                  value={inputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                  placeholder="Enter amount"
                  type="number"
                  error={error}
                  className="w-full mt-4 rounded-md h-12"
                  wrapperClassName="w-full"
                />
                <div
                  onClick={() => setInputValue(maxAmount)}
                  className="absolute right-4 top-8 text-sm font-bold text-primary-100 cursor-pointer"
                >
                  MAX
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-300 dark:text-gray">Available</div>
                  <div className="text-sm font-bold">{selectedCurrency?.free} {selectedCurrency?.symbol}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-300 dark:text-gray">Max Withdraw</div>
                  <div className="text-sm font-bold">{selectedCurrency?.maxWithdrawAmount} {selectedCurrency?.symbol}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-300 dark:text-gray">Min Withdraw</div>
                  <div className="text-sm font-bold">{selectedCurrency?.minWithdrawAmount} {selectedCurrency?.symbol}</div>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button isLoading={isLoading} className="text-sm h-10 px-10 font-semibold">
                  Send
                </Button>
              </div>
            </div>
          </div>
          <CurrencyModal
            open={open}
            setOpen={setOpen}
            data={currencies}
            selectedItem={selectedCurrency}
            setSelectedItem={setSelectedCurrency}
            type="currency"
            className="md:w-[384px]"
            inputClassName="h-[48px] bg-gray-1000 dark:bg-black-900 border-none"
            clearIconClass="text-white-700 dark:text-gray-600"
            closeIconClass="text-white-700 dark:text-gray-600"
          />
        </form>
        <SideBarContent />

      </div>
      <WithdrawFiatHistory
        data={historyList}
        setData={setHistoryList}
      />
      <BankModal
        open={openBank}
        setOpen={setOpenBank}
        symbol={selectedCurrency?.symbol}
        onSubmit={initData}
        bankId={editBankId}
        onClose={() => setEditBankId(null)}
      />
      <Verify2FAModal
        open={openVerify2FAModal}
        setOpen={(open) => {
          setOpenVerify2FAModal(open);
        }}
        data={verify2FAModalData}
      ></Verify2FAModal>

      <SuccessModal
        text="Withdrawal request has been created successfully"
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      />
    </>
  );
};

export default WithdrawFiat;
