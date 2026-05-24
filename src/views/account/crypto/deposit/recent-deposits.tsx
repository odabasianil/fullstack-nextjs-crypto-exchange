import { NoResult } from "@/views/crypto/payment/no-result";
import { useTranslation } from "react-i18next";

export const RecentDeposits = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="text-lg md:text-[24px] mb-6 font-semibold">
        {t('deposit.recent_deposits')}
      </div>
      <div className="mt-6">
        <NoResult
          text={t('deposit.no_recent_deposits')}
        />
      </div>
    </>
  )
}