'use client'

import { Button } from "@/components/ui/button"
import { twMerge } from "tailwind-merge"
import { AuthCard } from "../card"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Icon } from "@/components/ui/icon"

export const RegisterDoneView = () => {
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const handleCheck = () => {
    setChecked(!checked)
  }

  const handleChange = (e: any) => {
    setValue(e.target.value)

  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push('/kyc-entry')
  }

  return (
    <>
      <div className="m-0 flex flex-col flex-grow items-center">
        <div className="flex flex-col items-center justify-start w-full md:w-auto pt-2 px-6 pb-4 md:pt-20 md:px-6 md:pb-12">
          <AuthCard>
            <div className="flex flex-col gap-4 mb-8">
              <div className={
                twMerge(
                  "text-[28px] leading-9 font-semibold",
                  "md:text-[32px] md:leading-10"
                  )}
                >
                  Hesap kurulumunuzu yapın
                </div>
                <div className="text-sm md:text-base text-gray-300 dark:text-gray dark:md:text-gray-100">
                  Hesabınız başarıyla oluşturuldu. Şimdi kurulumunu yapın.
                </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 text-sm leading-[22px]">
                <label htmlFor="password" className="text-gray md:text-black-100 md:dark:text-white-100 font-medium">Referans Kimliği (isteğe bağlı)</label>
                <div className="relative">
                  <div className="text-sm absolute right-3 top-1/2 -translate-y-1/2 capitalize  z-20">
                    <div
                      className={twMerge(
                        "text-primary-200 dark:text-primary-100 hover:text-primary",
                        "text-base font-medium cursor-pointer"
                      )}
                      >
                      Gönder
                    </div>
                  </div>
                  <Input
                    id="password"
                    className="pt-0.5 px-2.5 h-12 rounded-[10px]"
                    value={value}
                    onChange={handleChange}
                    isClearable
                  />
                </div>
              </div>
              <div className="mt-7 flex justify-between w-full items-center gap-[10px]">
                <p className="text-sm leading-[22px]">FAZ 3'ten ödüller ve özel teklifler hakkında pazarlama iletileri almayı kabul ediyorum.</p>
                <div 
                  className={
                    twMerge(
                      "cursor-pointer relative min-w-[42px] h-[22px] flex justify-start rounded-md",
                      checked ? "bg-primary" : "bg-gray-200"
                    )}
                  onClick={handleCheck}
                >
                  <div className={twMerge(
                    "min-w-[18px] h-[18px] bg-white rounded-md absolute m-0.5",
                    checked ? "right-0" : "left-0"
                    )}
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
        </div>
      </div>
    </>
  )
}