import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
// import { withdrawService } from "@/core/services/user/withdraw.service";
import { useToast } from "@/hooks/use-toast";
// import { Verify2FA } from "@/utils/verify-2fa";
import { useState } from "react";
// import { Verify2FAModal } from "../../security/verify2fa-modal";
// import { SuccessModal } from "@/views/success-modal";
import { useTranslation } from "react-i18next";

export const WithdrawAmount = (props: any) => {
  const {
    selectedCoin,
    selectedNetwork,
    address,
    setCoins,
    selectedAddress,
    tag
  } = props;
  const [amount, setAmount] = useState("");
  const toast = useToast();
  const [error, setError] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [openVerify2FAModal, setOpenVerify2FAModal] = useState(false);
  const [verify2FAModalData, setVerify2FAModalData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleMax = () => {
    setAmount(selectedCoin?.free);
  }

  const handle2FAVerification = (require2FAData: any) => {
    // Verify2FA(t('verify.2fa_verification'), t('verify.verify'), require2FAData, setOpenVerify2FAModal, setVerify2FAModalData).subscribe({
    //   next: (verifyResponse: any) => {
    //     if (verifyResponse.success) {
    //       createWithdraw(verifyResponse?.data?.require2FA?.actionID)
    //       setOpenVerify2FAModal(false);
    //     }
    //   },
    //   error: (err) => {
    //     console.error('2FA verification error:', err);
    //     toast?.open(t('verify.failed'), 'circle-close', '', 'text-error');
    //   }
    // });
  };

  const createWithdraw = (actionId?: number) => {
    if (+amount < +selectedCoin?.minWithdrawAmount) {
      setError('Amount is less than minimum withdrawal amount');
      return;
    }

    setIsLoading(true);
    // withdrawService.createWithdrawCrypto({
    //   symbol: selectedCoin?.symbol,
    //   amount: +amount,
    //   address,
    //   blockchainId: selectedAddress?.blockchainId || selectedNetwork?.blockchainId,
    //   tag: selectedAddress?.tag || tag,
    //   actionId: actionId
    // }).then((res) => {
    //   if (res.success) {
    //     const require2FAData = res.data.require2FA;
    //     if (require2FAData?.required2FA && !actionId) {
    //       handle2FAVerification(require2FAData);
    //     } else {
    //       setOpenVerify2FAModal(false);
    //       setSuccessModal(true);

    //       withdrawService.withdrawCryptoInit().then((res) => {
    //         if (!res.error || !res.warning) {
    //           setCoins(res.data);
    //         }
    //       })
    //     }

    //   } else {
    //     toast?.open(res?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
    //   }
    // }).catch((err) => {
    //   console.log(err);
    //   toast?.open(err?.messageList?.[0]?.message, 'circle-close', '', 'text-error');
    // }).finally(() => {
    //   setTimeout(() => {
    //     setIsLoading(false);
    //   }, 1000);
    // })
  }

  return (
    <>
      <div className="relative">
        <Input
          value={amount}
          onChange={(e: any) => setAmount(e.target.value)}
          placeholder="Enter amount"
          errorClassName="font-thin "
          error={error}
        />
        <div className="absolute right-4 top-3 flex items-center gap-2">
          <div className="">{selectedCoin?.symbol}</div>
          <div onClick={handleMax} className="text-primary-100 cursor-pointer uppercase">{t('withdraw.max')}</div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="text-gray-300 dark:text-gray font-thin text-sm">{t('withdraw.available_withdraw')}</div>
          <div className="text-sm">{selectedCoin?.free} {selectedCoin?.symbol}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-gray-300 dark:text-gray font-thin text-sm">{t('withdraw.max_withdraw')}</div>
          <div className="text-sm">{selectedCoin?.maxWithdrawAmount} {selectedCoin?.symbol}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-gray-300 dark:text-gray font-thin text-sm">{t('withdraw.min_withdraw')}</div>
          <div className="text-sm">{selectedCoin?.minWithdrawAmount} {selectedCoin?.symbol}</div>
        </div>
      </div>
      <div className="h-[2px] w-full my-4 bg-white-100 dark:bg-secondary" />
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-300 dark:text-gray">{t('withdraw.total_amount')}</div>
          <div className="text-base my-1">{amount || 0} {selectedCoin?.symbol}</div>
        </div>
        <Button isLoading={isLoading} onClick={() => createWithdraw()} className="h-9 text-sm font-normal">{t('withdraw.withdraw')}</Button>
      </div>

      {/* <SuccessModal
        text={t('withdraw.success_withdraw')}
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      />
      <Verify2FAModal
        open={openVerify2FAModal}
        setOpen={(open) => setOpenVerify2FAModal(open)}
        data={verify2FAModalData}
      ></Verify2FAModal> */}
    </>
  )
}