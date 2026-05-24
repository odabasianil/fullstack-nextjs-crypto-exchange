'use client'

import Image from "next/image"
import { AuthCard } from "../card"
import { twMerge } from "tailwind-merge"
import { Icon } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { setCookie } from "@/utils/set-cookie";
import { userService } from "@/core/services/auth/user.service"
import { useDispatch } from "react-redux"
import { SetSession } from "@/core/store/reducers/auth.slice"
import { useTranslation } from "react-i18next"

export const RegisterView = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);
  const [formEmailError, setFormEmailError] = useState('');
  const [formPasswordError, setFormPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const handleEmailChange = (e: any) => {
    setEmailValue(e.target.value)
    checkEmail(e.target.value);
  }
  const handlePasswordChange = (e: any) => {
    setPasswordValue(e.target.value)
  }

  const checkEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(input)) {
      setFormEmailError('');
      return true;
    } else {
      setFormEmailError('Lütfen geçerli bir e-posta girin.');
      return false;
    }
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!agreementChecked) {
      setFormError('Bir hesap oluşturmak için Üyelik Sözleşmesini ve KVKK politikamızı kabul etmeniz gerekir.')
      return;
    }

    if (!checkEmail(emailValue)) return;
    
    if (passwordValue.length < 8) {
      setFormPasswordError('Şifreniz en az 8 karakter olmalıdır.');
      return;
    }

    setFormError('');
    setFormPasswordError('');
    setFormEmailError('');

    // register service
    try {
      // const response = await userService.userRegister(emailValue,passwordValue, agreementChecked, agreementChecked, marketingChecked);
      const response = {
        messageList: null,
        data: {
          userID: 1,
          sessionID: 2,
          sessionToken: 'test',
          require2FA: {
            required2FA: true,
            actionID: 1,
            description: '',
            require2FAType: '',
          },
          roleList: null,
        },
        success: true,
        error: false,
        warning: false,
      }
      if (response.success) {
        dispatch(SetSession(response.data));
        if(response.data.require2FA.required2FA)
        {
          router.push('/verify');
        } else {
          //bu aşamada kullanıcı verified user oluyor ve token i kalici saklayabiliriz
          setCookie('user', response.data.sessionToken, 7);
          router.push('/me/dashboard');
        }
      } else {
        setFormEmailError((response as any).messageList[0].message);
      }
    } catch (error) {
      setFormEmailError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }

  }

  return (
    <>
      <div className="m-0 flex flex-col flex-grow items-center">
        <div className="flex flex-col items-center justify-start w-full md:w-auto pt-2 px-6 pb-4 md:pt-20 md:px-6 md:pb-12">
          <AuthCard>
            <div className="flex justify-start items-center mb-8">
              <div className={
                twMerge(
                  "text-[28px] leading-9 font-semibold",
                  "md:text-[32px] md:leading-10"
                  )}
                >
                {t('register_page.title')}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 text-sm leading-[22px]">
              <label htmlFor="email" className="text-gray md:text-black-100 md:dark:text-white-100 font-medium">{t('register_page.email')}</label>
              <Input
                  id="email"
                  type="text"
                  value={emailValue}
                  onChange={handleEmailChange}
                  placeholder={t('register_page.email_placeholder')}
                  className="pt-0.5 px-2.5 h-12 placeholder:text-base rounded-[10px] placeholder:dark:text-gray"
                  error={formEmailError}
                  isClearable
                />
                <label htmlFor="password" className="mt-2 text-gray md:text-black-100 md:dark:text-white-100 font-medium">{t('register_page.password')}</label>
                <Input
                  id="password"
                  type="password"
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  placeholder={t('register_page.password')}
                  className="pt-0.5 px-2.5 h-12 placeholder:text-base rounded-[10px] placeholder:dark:text-gray"
                  error={formPasswordError}
                  isClearable
                />
              </div>
              <div className="mt-4 flex items-start gap-1 text-sm leading-[22px]">
                <div className={
                  twMerge(
                    "min-w-4 h-4 flex items-center justify-center m-[3px]",
                    "cursor-pointer rounded-[2.5px]",
                    agreementChecked && 'bg-white-100 border-transparent',
                    formError ? 'border border-error' : 'border border-gray'
                  )}
                  onClick={() => {
                    setAgreementChecked(!agreementChecked);
                    setFormError('');
                  }}
                >
                  {
                    agreementChecked && (
                      <Icon
                        name="check"
                        size={12}
                        className="text-black"
                      />
                    )
                  }
                </div>
                <label htmlFor="aggrement" onClick={() => setAgreementChecked(!agreementChecked)} className="cursor-pointer text-black-100 dark:text-white-100 font-medium">
                  <div className="prose-a:underline" dangerouslySetInnerHTML={{ __html: t('register_page.agreements.first') }} />
                </label>
              </div>
              <div className="mt-4 flex items-start gap-1 text-sm leading-[22px]">
                <div className={
                  twMerge(
                    "min-w-4 h-4 flex items-center justify-center m-[3px]",
                    "cursor-pointer rounded-[2.5px]",
                    marketingChecked && 'bg-white-100 border-transparent',
                    'border border-gray'
                  )}
                  onClick={() => {
                    setMarketingChecked(!marketingChecked);
                    setFormError('');
                  }}
                >
                  {
                    marketingChecked && (
                      <Icon
                        name="check"
                        size={12}
                        className="text-black"
                      />
                    )
                  }
                </div>
                <label htmlFor="marketing" onClick={() => setMarketingChecked(!marketingChecked)} className="cursor-pointer text-black-100 dark:text-white-100 font-medium">
                  <div className="prose-a:underline" dangerouslySetInnerHTML={{ __html: t('register_page.agreements.second') }} />
                </label>
              </div>
              <Button
                type="submit"
                appearance="primary"
                className="mt-6 h-12 w-full rounded-[10px]"
              >
                {t('register_page.submit')}
              </Button>
            </form>
            <div>
              <div className="my-4 md:mt-6 md:mb-2 flex items-center justify-between">
                <div className="h-[1px] flex-1 bg-white-100 dark:bg-black-400 md:dark:bg-secondary" />
                <div className="text-sm leading-[22px] px-4 text-gray md:text-gray-300 md:dark:text-gray-100">veya</div>
                <div className="h-[1px] flex-1 bg-white-100 dark:bg-black-400 md:dark:bg-secondary" />
              </div>
              <div className="flex flex-col items-center gap-4">
                <Button
                  appearance="ghost"
                  className="w-full h-12 rounded-[10px] relative"
                >
                  <Image
                    src='/images/google-icon.png'
                    width={16}
                    height={16}
                    alt="google"
                    className="absolute left-4"
                  />
                  Google ile Devam Edin
                </Button>
                <Button
                  appearance="ghost"
                  className="w-full h-12 rounded-[10px] relative"
                >
                  <Icon name="apple-icon" size={16} className="absolute left-4" />
                  Apple ile Devam Edin
                </Button>
              </div>
            </div>
          </AuthCard>
          <div className="ml-1 mt-5 md:mt-[22px] flex justify-start md:justify-center mr-auto md:mx-auto">
            <div className="flex gap-1 text-sm ">
              <Link
                href="/login"
                className="text-primary-200 dark:text-primary-100 hover:text-primary h-8 font-medium"
              >
                {t('register_page.login')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}