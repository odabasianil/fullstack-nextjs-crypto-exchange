"use client";

import Image from "next/image";
import { AuthCard } from "../card";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CodeModal } from "./code-modal";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "@/core/services/auth/user.service";
import { setCookie } from "@/utils/set-cookie";
import { AppDispatch, RootState } from "@/core/store/store";
import { UpdateSession } from "@/core/store/reducers/auth.slice";
import { UpdateUser } from "@/core/store/reducers/user.slice";
import { BaseResult } from "@/core/models/auth/responsemodel/baseresult.model";
import { User } from "@/core/models/auth/models/user.model";
import { useTranslation } from "react-i18next";

export const VerifyView = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [formError, setFormError] = useState("");
  const [user, setUser] = useState({ type: "", value: "" });
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const { t } = useTranslation();

  const session = useSelector((state: RootState) => state.auth.session);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    //eğer kullanıcı 2fa gerektiren bir kullanıcı değilse dashboarda yönlendir
    if (session?.require2FA?.required2FA === false) {
      router.push("/me/dashboard");
      return;
    }
  }, [dispatch]);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    if (!session) return;
    e.preventDefault();
    const isNumber = value.match(/^\d+$/);
    if (value.length < 6 || !isNumber) {
      setFormError("Lütfen 6 haneli doğrulama kodunu girin.");
      return;
    }

    router.push("/me/dashboard");

    return;
    // const response = await userService.verify2fa(session.require2FA.actionID, session.require2FA.require2FAType, value);
    // if (response.success) {
    //   const newSession =  {
    //     ...session,
    //     require2FA: response.data.require2FA
    //   };

    //   dispatch(UpdateSession(newSession));
    //   setValue('');
    //   if(!response.data.require2FA.required2FA) {
    //     setCookie('user', newSession.sessionToken, 7);

    //     userService.userMe().then((res: BaseResult<User>) => {
    //       if(res.success) {
    //         dispatch(UpdateUser(res.data));
    //       }
    //     });

    //     router.push('/me/dashboard');
    //   } else if(response.data.require2FA.require2FAType === 'UpdatePhone') {
    //     router.push('/update-phone');
    //   } else if(response.data.require2FA.require2FAType === 'ChangePasword') {
    //     router.push('/forgot-password/change');
    //   }
    // } else {
    //   setFormError(response.messageList[0].message);
    // }
  };

  const resendCode = () => {
    setTimeLeft(120);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="m-0 flex flex-col flex-grow items-center">
        <div className="flex flex-col items-center justify-start w-full md:w-auto pt-2 px-6 pb-4 md:pt-20 md:px-6 md:pb-12">
          <AuthCard>
            <div className="flex flex-col gap-2 md:gap-4 justify-start items-start mb-8">
              <div
                className={twMerge(
                  "text-[28px] leading-9 font-semibold",
                  "md:text-[32px] md:leading-10"
                )}
              >
                {session?.require2FA.require2FAType === "Email"
                  ? t("verify.email_title")
                  : session?.require2FA.require2FAType === "SMS"
                  ? t("verify.sms_title")
                  : session?.require2FA.require2FAType === "GoogleAuthenticator"
                  ? "Google Authenticator Doğrulama"
                  : "Doğrulama Gerekli"}
              </div>
              <div className="font-normal text-sm leading-6 md:text-base text-gray-300 dark:text-gray dark:md:text-gray-100">
                {session?.require2FA.description}
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 text-sm leading-[22px]">
                <label
                  htmlFor="code"
                  className="text-gray md:text-black-100 md:dark:text-white-100 font-medium"
                >
                  Doğrulama Kodu
                </label>
                <div className="relative">
                  <div className="text-sm absolute right-4 top-[14px] capitalize  z-20">
                    {timeLeft ? (
                      <div className="text-gray-300 dark:text-gray dark:md:text-gray-100 flex gap-2 items-center ">
                        {t("verify.send_code")}
                        <Icon name="info" size={20} />
                      </div>
                    ) : (
                      <div
                        className={twMerge(
                          "text-primary-200 dark:text-primary-100 hover:text-primary",
                          "text-sm font-medium cursor-pointer"
                        )}
                        onClick={resendCode}
                      >
                        {t("verify.resend_code")}
                      </div>
                    )}
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
                {t("verify.submit")}
              </Button>
            </form>
            <div
              className={twMerge(
                "ml-1 mt-5 md:mt-6 flex justify-start md:justify-center mr-auto md:mx-auto cursor-pointer w-min",
                "text-primary-200 dark:text-primary-100 hover:text-primary h-8 text-sm font-medium whitespace-nowrap"
              )}
              onClick={() => setOpen(true)}
            >
              {t("verify.not_arrived")}
            </div>
          </AuthCard>
        </div>
      </div>
      <CodeModal open={open} setOpen={setOpen} user={user} />
    </>
  );
};
