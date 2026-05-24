"use client";

import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import { AuthCard } from "../card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { setCookie } from "@/utils/set-cookie";
import { ResetPasswordModal } from "../reset-password-modal";

export const ForgotPasswordView = () => {
  const [user, setUser] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [formError, setFormError] = useState("");
  const [openResetModal, setOpenResetModal] = useState(false);
  const router = useRouter();


  const handleEmailChange = (e: any) => {
    setEmailValue(e.target.value);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validateEmail(emailValue)) {
      setFormError("Geçerli bir e-posta adresi girin.");
      return;
    }
    setFormError("");
    setOpenResetModal(true);
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
                Şifre Sıfırlama
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
                  E-posta
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="text"
                    value={emailValue}
                    onChange={handleEmailChange}
                    placeholder="E-posta"
                    className="pt-0.5 px-2.5 h-12 placeholder:text-base rounded-[10px] placeholder:dark:text-gray"
                    error={formError}
                    isClearable
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
            <div className="ml-1 mt-4 flex justify-start md:justify-center mr-auto md:mx-auto">
              <Link
                href="#"
                className="text-primary-200 dark:text-primary-100 hover:text-primary text-sm leading-8 font-medium"
              >
                Giriş yapmak için tıklayın
              </Link>
            </div>
          </AuthCard>
        </div>
      </div>
      <ResetPasswordModal
        open={openResetModal}
        setOpen={setOpenResetModal}
        user={emailValue}
      />
    </>
  );
};
