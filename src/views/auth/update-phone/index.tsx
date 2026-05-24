'use client'

import { Button } from "@/components/ui/button"
import { twMerge } from "tailwind-merge"
import { AuthCard } from "../card"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/core/store/store"
import { userService } from "@/core/services/auth/user.service"
import { UpdateSession } from "@/core/store/reducers/auth.slice"
import { SelectAreaModal } from "@/components/ui/select-area-modal"

export const UpdatePhoneView = () => {
  const [phoneValue, setPhoneValue] = useState('');
  const [formError, setFormError] = useState('');
  const router = useRouter();
  
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [areaData, setAreaData] = useState({ flag: "https://bin.bnbstatic.com/image/countrylogo/TR.png", code: "+90" });

  const handleAreaAlick = ({ flag, code }: { flag: string; code: string }) => {
    setAreaData({ flag: flag, code: code });
    setShowAreaModal(false);
  }

  const session = useSelector((state: RootState) => state.auth.session);

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session])

  const handlePhoneChange = (e: any) => {
    setPhoneValue(e.target.value)
  };

  const handlePhoneClick = () => {
    setShowAreaModal(true);
  }

  const dispatch = useDispatch();
  const handleSubmit = async (e: any) => {
    if(session?.require2FA.actionID === undefined) return;
    e.preventDefault()

    if(areaData.code === '') {
      setFormError('Lütfen bir alan kodu seçin.')
      return;
    }

    if (phoneValue.length < 10) {
      setFormError('Lütfen geçerli bir telefon numarası girin.')
      return;
    }

    try {
      if(!session) return;
      const response = await userService.updatePhone(areaData.code, phoneValue);
      if (response.success) {
        const newSession =  {
          ...session,
          require2FA: response.data.require2FA
        };
        dispatch(UpdateSession(newSession));
        if(response.data.require2FA.required2FA)
        {
          router.push('/verify');
        } else {
          router.push('/me/dashboard');
        }
        } else {
        setFormError(response.messageList[0].message);
      }
    } catch (error) {
      setFormError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  }

  return (
    <>
      <div className="m-0 flex flex-col flex-grow items-center">
        <div className="flex flex-col items-center justify-start w-full md:w-auto pt-2 px-6 pb-4 md:pt-20 md:px-6 md:pb-12">
          <AuthCard>
            <div className="flex flex-col gap-2 mb-8">
              <div className={
                twMerge(
                  "text-[28px] leading-9 font-semibold",
                  "md:text-[32px] md:leading-10"
                  )}
                >
                  Telefon Numaranızı Ekleyin
                </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 text-sm leading-[22px]">
                <label htmlFor="password" className="text-gray md:text-black-100 md:dark:text-white-100 font-medium">Telefon Numaranız</label>
                <div className="relative">
                <Input
                  id="phone"
                  className="h-12 rounded-[10px] w-full mt-1"
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  onPhoneClick={handlePhoneClick}
                  phoneInput={
                    {
                      flag: areaData.flag,
                      phone: areaData.code
                    }
                  }
                  error={formError}
                  isClearable={true}
                  clearIconClass="text-gray dark:text-gray"
                />
                </div>
              </div>
              <Button
                type="submit"
                appearance="primary"
                className="mt-6 h-12 w-full rounded-[10px]"
              >
                İleri
              </Button>
            </form>
          </AuthCard>
          <SelectAreaModal open={showAreaModal} setOpen={setShowAreaModal} onAreaClick={handleAreaAlick}/>
        </div>
      </div>
    </>
  )
}