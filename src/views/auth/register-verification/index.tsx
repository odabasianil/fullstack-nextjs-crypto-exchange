'use client'

import Image from "next/image"
import { AuthCard } from "../card"
import { twMerge } from "tailwind-merge"
import { Icon } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CodeModal } from "./code-modal"

export const RegisterVerificaationView = () => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [formError, setFormError] = useState('');
  const [user, setUser] = useState({type: '', value: ''});
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const isNumber = value.match(/^\d+$/);
    if (value.length < 6 || !isNumber) {
      setFormError('Lütfen 6 haneli doğrulama kodunu girin.')
      return;
    }

    if (value !== '123456') {
      setFormError('Verify failed, please reload and try again(200000004-e43709f5)');
      return;
    }

    router.push('/me/dashboard');
  }

  const resendCode = () => {
    setTimeLeft(5)
  }

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return (prev - 1);
        } else {
          return 0;
        }
        })
    }
    , 1000)


    return () => clearInterval(interval);
  }
  , [])

  return (
    <>
      <div className="m-0 flex flex-col flex-grow items-center">
        <div className="flex flex-col items-center justify-start w-full md:w-auto pt-2 px-6 pb-4 md:pt-20 md:px-6 md:pb-12">
          <AuthCard>
            <div className="flex flex-col gap-2 md:gap-4 justify-start items-start mb-8">
              <div className={
                twMerge(
                  "text-[28px] leading-9 font-semibold",
                  "md:text-[32px] md:leading-10"
                  )}
                >
                  {user.type === 'email' ? 'E-postanızı doğrulayın' : 'Numaranızı doğrulayın'}
                </div>
                <div className="font-normal text-sm leading-6 md:text-base text-gray-300 dark:text-gray dark:md:text-gray-100">
                  {
                    user.type === 'phone' ? 
                    `Lütfen ${user.value} numarasına gönderilen 6 haneli doğrulama kodunu girin. Kod 30 dakika geçerlidir.` :
                    `${user.value} adresine 6 haneli bir kod gönderildi. Lütfen 30 dakika içerisinde kodu girin.`
                  }
                </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 text-sm leading-[22px]">
                <label htmlFor="code" className="text-gray md:text-black-100 md:dark:text-white-100 font-medium">Doğrulama Kodu</label>
                <div className="relative">
                  <div className="text-sm absolute right-4 top-[14px] capitalize  z-20">
                    {timeLeft ? <div className="text-gray-300 dark:text-gray dark:md:text-gray-100 flex gap-2 items-center ">
                      Kod Gönderildi 
                      <Icon
                        name="info"
                        size={20}
                      />
                    </div> : 
                    <div
                      className={twMerge(
                        "text-primary-200 dark:text-primary-100 hover:text-primary",
                        "text-sm font-medium cursor-pointer"
                      )}
                      onClick={resendCode}
                      >
                        Kodu Tekrar Gönder
                      </div>
                    }
                  </div>
                  <Input
                    id="code"
                    type="text"
                    value={value}
                    onChange={handleChange}
                    className="pt-0.5 px-2.5 h-12 rounded-[10px] relative"
                    maxLength={6}
                    error={formError}
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
            <div
              className={twMerge(
                "ml-1 mt-5 md:mt-6 flex justify-start md:justify-center mr-auto md:mx-auto cursor-pointer w-min",
                "text-primary-200 dark:text-primary-100 hover:text-primary h-8 text-sm font-medium whitespace-nowrap"
              )}
              onClick={() => setOpen(true)}
            >
              Kod size ulaşmadı mı?
            </div>
          </AuthCard>
        </div>
      </div>
      <CodeModal
        open={open}
        setOpen={setOpen}
        user={user}
      />
    </>
  )
}