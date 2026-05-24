'use client'

import { Button } from "@/components/ui/button"
import { twMerge } from "tailwind-merge"
import { AuthCard } from "../card"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Icon } from "@/components/ui/icon"

export const RegisterPasswordView = () => {
  const [value, setValue] = useState('');
  const [formError, setFormError] = useState('');
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const [rules, setRules] = useState([
    {rule: '8 ila 128 karakter', check: false},
    {rule: 'En az 1 rakam', check: false},
    {rule: 'En az 1 büyük harf', check: false},
  ]);

  const handleChange = (e: any) => {
    setValue(e.target.value)

  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (value.length < 1) {
      setFormError('Lütfen şifrenizi girin')
      return;
    }

    if (value.length < 8 || value.length > 128 || !value.match(/[0-9]/) || !value.match(/[A-Z]/)) {
      setFormError('Şifre gereksinimleri karşılanmadı.')
      return;
    }

    router.push('/register-done')


  }


  const ShowButton = () => {
    return (
      <div className="absolute right-2 top-[14px] cursor-pointer" onClick={() => setIsShow(!isShow)}>
        <Icon
          name={isShow ? 'eye-on' : 'eye-off'}
          size={20}
          className="text-gray-300 dark:text-gray-500"
        />
      </div>
    )
  }

  useEffect(() => {
    if (value.length > 8 && value.length < 128) {
      setRules((rules) => rules.map((item, index) => 
        index === 0 ? { rule: item.rule, check: true } : item
      ));
    } else {
      setRules((rules) => rules.map((item, index) => 
        index === 0 ? { rule: item.rule, check: false } : item
      ));
    }

    if (/[A-Z]/.test(value)) {
      setRules((rules) => rules.map((item, index) => 
        index === 2 ? { rule: item.rule, check: true } : item
      ));
    } else {
      setRules((rules) => rules.map((item, index) => 
        index === 2 ? { rule: item.rule, check: false } : item
      ));
    }

    if (/[0-9]/.test(value)) {
      setRules((rules) => rules.map((item, index) => 
        index === 1 ? { rule: item.rule, check: true } : item
      ));
    } else {
      setRules((rules) => rules.map((item, index) => 
        index === 1 ? { rule: item.rule, check: false } : item
      ));
    }
  }, [value])

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
                  Bir şifre oluşturun
                </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 text-sm leading-[22px]">
                <label htmlFor="password" className="text-gray md:text-black-100 md:dark:text-white-100 font-medium">Şifre</label>
                <div className="relative">
                  <Input
                    id="password"
                    type={isShow ? 'text' : 'password'}
                    className="pt-0.5 px-2.5 h-12 rounded-[10px]"
                    value={value}
                    onChange={handleChange}
                    error={formError}
                    isClearable
                    isPassword
                  />
                  <ShowButton />
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {rules.map((item) => <div className="flex items-center gap-2 text-black-300 text-xs md:text-sm font-normal dark:text-gray">
                  <Icon
                    name="check"
                    size={16}
                    className={twMerge(
                      "text-black-300 dark:text-gray",
                      item.check && '!text-success'
                    )}
                  />
                  {item.rule}
                </div>
                )}
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