import { Input } from "@/components/ui/input";
import { SelectAreaModal } from "@/components/ui/select-area-modal";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge"

export const WithdrawToUser = () => {
  const { t } = useTranslation();
  const userTabs = [t('withdraw.email'), t('withdraw.phone'), 'Faz 3 ID'];
  const [activeUserTab, setActiveUserTab] = useState(userTabs[0]);
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [areaData, setAreaData] = useState({ flag: "/images/countries/tr.svg", code: "90", minLength: 10, maxLength: 10 });
  const [phoneValue, setPhoneValue] = useState("");
  const [showAreaModal, setShowAreaModal] = useState(false);

  const handlePhoneChange = (e: any) => {
    setPhoneValue(e.target.value)
  };

  const handlePhoneClick = () => {
    setShowAreaModal(true);
  }

  const handleAreaAlick = ({ flag, code, minLength, maxLength }: { flag: string; code: string; minLength: number; maxLength: number; }) => {
    setAreaData({ flag, code, minLength, maxLength });
    setShowAreaModal(false);
  }

  return (
    <>
      <div>
        <div className="mb-2 flex items-center gap-2">
          {
            userTabs.map((tab) => (
              <div
                onClick={() => setActiveUserTab(tab)}
                className={twMerge(
                  'text-sm cursor-pointer font-semibold py-2 px-4 rounded-md text-gray-300 dark:text-gray',
                  activeUserTab === tab && 'text-black-100 dark:text-white-100 bg-white-100 dark:bg-secondary'
                )}
              >
                {tab}
              </div>
            ))
          }
        </div>
        {
          activeUserTab === t('withdraw.email') && (
            <Input
              placeholder={t('withdraw.recipients_email')}
              required
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              error=""
            />
          )
        }
        {
          activeUserTab === t('withdraw.phone') && (
            <>
              <Input
                id="phone"
                className="h-12 rounded-[10px] w-full mt-1"
                value={phoneValue}
                onChange={handlePhoneChange}
                onPhoneClick={handlePhoneClick}
                // phoneInput={
                //   {
                //     flag: areaData.flag,
                //     phone: areaData.code,
                //     minLength: areaData.minLength,
                //     maxLength: areaData.maxLength
                //   }
                // }
                isClearable={true}
                clearIconClass="text-gray dark:text-gray"
              />
              {/* <SelectAreaModal open={showAreaModal} setOpen={setShowAreaModal} onAreaClick={handleAreaAlick} /> */}
            </>
          )
        }
        {
          activeUserTab === 'Faz 3 ID' && (
            <>
              <Input
                placeholder={t('withdraw.recipients_id')}
                required
                value={id}
                onChange={(e: any) => setId(e.target.value)}
                error=""
              />
            </>
          )
        }
      </div>
    </>
  )
}