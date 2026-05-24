"use client";

import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import { AuthCard } from "../card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import demoUser from "@/data/auth/demo_user.json";
import { Icon } from "@/components/ui/icon";
import { WarningModal } from "./warning-modal";
import { ResetPasswordModal } from "./reset-password";
import { setCookie } from "@/utils/set-cookie";

export const LoginPasswordView = () => {
  const [user, setUser] = useState("");
  const [value, setValue] = useState("");
  const [formError, setFormError] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [repeatLimit, setRepeatLimit] = useState(4);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (repeatLimit === 1) {
      setRepeatLimit(repeatLimit - 1);
      setOpen(true);
      return;
    }
    if (repeatLimit === 0) {
      setFormError(
        'Şifrenizi sıfırlamak için "Şifrenizi mi Unuttunuz?" bölümüne tıklayın. (200001004-331b9ab6)'
      );
      return;
    }

    if (demoUser.password === value) {
      localStorage.setItem("isLogin", "true");
      setCookie("isLogin", "true", 2);
      window.location.href = '/me/dashboard'
    } else {
      setRepeatLimit(repeatLimit - 1);
      setFormError(
        `Hatalı şifre. Lütfen tekrar deneyin veya şifrenizi sıfırlamak için "Şifrenizi mi Unuttunuz?" bölümüne tıklayın. ${repeatLimit} hakkınız kaldı.(200001004-331b9ab6)`
      );
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("user")
      ? localStorage.getItem("user")
      : ({} as any);
    const parsedUserInfo = userInfo ?? JSON.parse(userInfo);
    if (parsedUserInfo?.type === "phone" && parsedUserInfo?.value) {
      setUser(
        parsedUserInfo.value.slice(0, 3) +
          "****" +
          parsedUserInfo.value.slice(7, 11)
      );
    } else if (parsedUserInfo?.type === "email" && parsedUserInfo?.value) {
      setUser(
        parsedUserInfo.value.slice(0, 1) +
          "****" +
          parsedUserInfo.value.slice(parsedUserInfo.value.indexOf("@"))
      );
    }
  }, []);

  const ShowButton = () => {
    return (
      <div
        className="absolute right-2 top-[14px] cursor-pointer"
        onClick={() => setIsShow(!isShow)}
      >
        <Icon
          name={isShow ? "eye-on" : "eye-off"}
          size={20}
          className="text-gray-300 dark:text-gray-500"
        />
      </div>
    );
  };

  return (
    <>
      <div className="m-0 flex flex-col flex-grow items-center">
        <div className="flex flex-col items-center justify-start w-full md:w-auto pt-2 px-6 pb-4 md:pt-20 md:px-6 md:pb-12">
          <AuthCard>
            <div className="flex flex-col gap-2 mb-8">
              <div
                className={twMerge(
                  "text-[28px] leading-9 font-semibold",
                  "md:text-[32px] md:leading-10"
                )}
              >
                Şifrenizi girin
              </div>
              <div className="text-sm md:text-base text-gray-300 dark:text-gray dark:md:text-gray-100">
                {user}
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1 text-sm leading-[22px]">
                <label
                  htmlFor="password"
                  className="text-gray md:text-black-100 md:dark:text-white-100 font-medium"
                >
                  Şifre
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={isShow ? "text" : "password"}
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
              <Button
                type="submit"
                appearance="primary"
                className="mt-6 h-12 w-full rounded-[10px]"
              >
                İleri
              </Button>
            </form>
            <div className="ml-1 mt-6 flex justify-start md:justify-center mr-auto md:mx-auto">
              <div
                onClick={() => setOpenResetModal(true)}
                className="cursor-pointer text-primary-200 dark:text-primary-100 hover:text-primary text-sm leading-8 font-medium"
              >
                Şifrenizi mi unuttunuz?
              </div>
            </div>
            <div className="ml-1 mt-4 flex justify-start md:justify-center mr-auto md:mx-auto">
              <Link
                href="#"
                className="text-primary-200 dark:text-primary-100 hover:text-primary text-sm leading-8 font-medium"
              >
                Giriş yapmak için ana parolayı kullanın
              </Link>
            </div>
          </AuthCard>
        </div>
      </div>
      <WarningModal
        open={open}
        setOpen={setOpen}
        icon="warning"
        description="Hatalı şifre. Lütfen tekrar deneyin veya şifrenizi sıfırlamak için Şifrenizi mi Unuttunuz? bölümüne tıklayın. 1 hakkınız kaldı. Başarısız 5 denemenin ardından hesabınız 2 saat süreyle kilitlenir ve para çekme işlemleri 24 saat süreyle devre dışı bırakılır. (001528-4dbc362b)"
      />
      <ResetPasswordModal
        open={openResetModal}
        setOpen={setOpenResetModal}
        user={user}
      />
    </>
  );
};
