'use client'

import { Button } from "@/components/ui/button"
import { twMerge } from "tailwind-merge"
import { AuthCard } from "../../card"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Icon } from "@/components/ui/icon"

export const ForgotPasswordDoneView = () => {
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
    router.push('/login')
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
                  Parolanız değiştirildi
                </div>
                <div className="text-sm md:text-base text-gray-300 dark:text-gray dark:md:text-gray-100">
                  Hesabınız başarıyla düzenlendi, şimdi giriş yapabilirsiniz.
                </div>
            </div>
            <form onSubmit={handleSubmit}>
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