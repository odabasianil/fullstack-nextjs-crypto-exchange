"use client";

import Image from "next/image";
import { AuthCard } from "../card";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/components/ui/icon";
import { QrLogin } from "./qr-login";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import demoUser from "@/data/auth/demo_user.json";
import { setCookie } from "@/utils/set-cookie";
import { useDispatch } from "react-redux";
import { userService } from "@/core/services/auth/user.service";
import { SetSession } from "@/core/store/reducers/auth.slice";
import { store } from "@/core/store/store";
import { useToast } from "@/core/hooks/use-toast";
import { useTranslation } from "react-i18next";

export const LoginView = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const router = useRouter();

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [formError, setFormError] = useState("");
  const [formPasswordError, setFormPasswordError] = useState("");
  const [formEmailError, setFormEmailError] = useState("");

  const handleEmailChange = (e: any) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPasswordValue(e.target.value);
  };

  const checkEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(input)) {
      return true;
    } else {
      setFormEmailError("Lütfen geçerli bir e-posta girin.");
      return false;
    }
  };
  const toast = useToast();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (checkEmail(emailValue)) {
      try {
        // const response = await userService.userlogin(emailValue,passwordValue);
        const response = {
          messageList: null,
          data: {
            userID: 1,
            sessionID: 2,
            sessionToken: "test",
            require2FA: {
              required2FA: true,
              actionID: 1,
              description: "",
              require2FAType: "",
            },
            roleList: null,
          },
          success: true,
          error: false,
          warning: false,
        };
        if (response.success) {
          dispatch(SetSession(response.data));
          if (response.data.require2FA.required2FA) {
            router.push("/verify");
          } else {
            //bu aşamada kullanıcı verified user oluyor ve token i kalici saklayabiliriz
            setCookie("user", response.data.sessionToken, 7);
            router.push("/me/dashboard");
          }
        } else {
          toast?.open(
            (response as any).messageList[0].message,
            "check-circle",
            "",
            "text-red"
          );
          setFormEmailError((response as any).messageList[0].message);
        }
      } catch (error) {
        setFormError("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <>
      <div className="m-0 flex flex-col flex-grow items-center">
        <div className="flex flex-col items-center justify-start w-full md:w-auto pt-2 px-6 pb-4 md:pt-20 md:px-6 md:pb-12">
          <AuthCard>
            <div className="flex justify-between items-center mb-8">
              <div
                className={twMerge(
                  "text-[28px] leading-9 font-semibold",
                  "md:text-[32px] md:leading-10"
                )}
              >
                {t("log_in.title")}
              </div>
              <QrLogin />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 text-sm leading-[22px]">
                <label
                  htmlFor="email"
                  className="text-gray md:text-black-100 md:dark:text-white-100 font-medium"
                >
                  E-posta
                </label>
                <Input
                  id="email"
                  type="text"
                  value={emailValue}
                  onChange={handleEmailChange}
                  placeholder={t("log_in.email")}
                  className="pt-0.5 px-2.5 h-12 placeholder:text-base rounded-[10px] placeholder:dark:text-gray"
                  error={formEmailError}
                  isClearable
                />
                <label
                  htmlFor="password"
                  className="mt-2 text-gray md:text-black-100 md:dark:text-white-100 font-medium"
                >
                  Parola
                </label>
                <Input
                  id="password"
                  type="password"
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  placeholder={t("log_in.password")}
                  className="pt-0.5 px-2.5 h-12 placeholder:text-base rounded-[10px] placeholder:dark:text-gray"
                  error={formPasswordError}
                  isClearable
                />
              </div>
              <Button
                error={formError}
                type="submit"
                appearance="primary"
                className="mt-6 h-12 w-full rounded-[10px]"
              >
                {t("log_in.submit")}
              </Button>
            </form>
            <div>
              <div className="my-4 md:mt-6 md:mb-2 flex items-center justify-between">
                <div className="h-[1px] flex-1 bg-white-100 dark:bg-black-400 md:dark:bg-secondary" />
                <div className="text-sm leading-[22px] px-4 text-gray md:text-gray-300 md:dark:text-gray-100">
                  {t("log_in.or")}
                </div>
                <div className="h-[1px] flex-1 bg-white-100 dark:bg-black-400 md:dark:bg-secondary" />
              </div>

              <div className="flex flex-col items-center gap-4">
                <Link
                  href="/forgot-password"
                  className="text-primary-200 dark:text-primary-100 hover:text-primary text-sm h-8 font-medium"
                >
                  {t("log_in.forgot_password")}
                </Link>
              </div>
            </div>
          </AuthCard>
          <div className="ml-1 mt-5 md:mt-[22px] flex justify-start md:justify-center mr-auto md:mx-auto">
            <Button
              type="button"
              appearance="primary"
              onClick={() => {
                window.location.href = "/register";
              }}
              className="mt-6 h-12 w-full rounded-[10px] text-sm"
            >
              {t("log_in.register")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
