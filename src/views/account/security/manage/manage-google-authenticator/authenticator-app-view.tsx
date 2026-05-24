'use client';
import { useEffect, useState } from "react";
import { EnableAuthenticator } from "./enable-authenticator";
import { QrModal } from "../qr-modal";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { GoogleAuthenticatorResponse, userSecurityService } from "@/core/services/auth/userSecurity.service";

export const AuthenticatorAppView = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
      userSecurityService.GetGoogleAuthenticator().then((authenticatorResult) => {
      if(authenticatorResult.success) {
        setQrCode(authenticatorResult.data.setupCode.qrCodeSetupImageUrl);
        setSecret(authenticatorResult.data.setupCode.manualEntryKey);
        setOpen(true);
      } else {

      }
    });
  }
  
  const user = useSelector((state: RootState) => state.user.user);
  const [qrCode, setQrCode] = useState<string>("");
  const [secret, setSecret] = useState<string>("");

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="sm:px-0 md:text-[32px] md:leading-[40px] font-semibold text-2xl px-4 text-black-100 dark:text-white-100 sm:mb-6 ">
          Authenticator App
        </div>
      </div>
      <EnableAuthenticator enableAuthenticatorClick={handleClick} />
      <QrModal code={secret} qrCode={qrCode}  open={open} setOpen={setOpen} />
    </>
  );
};
