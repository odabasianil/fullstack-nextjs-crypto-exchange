import { useRouter } from "next/navigation";
import Image from "next/image";
import { twJoin } from "tailwind-merge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface PasskeyModalInterface {
  coin?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const texts = {
  verifyWithPasskey: "Verify with passkey",
  verificationFailed: "Verification failed",
  verificationMessage:
    "The operation either timed out or was not allowed. Try using your passkeys again to complete the verification.",
  tryAgain: "Try Again",
  passkeysNotAvailable: "My Passkeys Are Not Available",
  phoneNumberVerification: "Phone Number Verification",
  enterCodeMessage: "Enter the 6-digit verification code sent to 534***7790.",
  phoneVerificationCode: "Phone Verification Code",
  submit: "Submit",
  usePasskeys: "Use Passkeys to Complete Verification",
  securityUnavailable: "Security verification unavailable?",
};

export const PasskeyModal = (props: PasskeyModalInterface) => {
  const { open, setOpen } = props;
  const [authenticator, setAuthenticator] = useState(false);
  const [value, setValue] = useState("");
  const [codeClick, setCodeClick] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        showCloseButton
        className="md:w-[425px] md:max-w-[80vw] w-full md:h-fit h-full max-w-[none]"
      >
        {!authenticator ? (
          <div className="flex flex-col md:px-4">
            <div className="sm:text-[32px] text-left sm:leading-[40px] text-[28px] leading-[36px] text-black-100 dark:text-white-100 mb-4">
              {texts.verifyWithPasskey}
            </div>
            <div className="flex justify-center">
              <Icon name="passkey" className="text-center" size={120} />
            </div>
            <div className="text-base text-black-100 dark:text-white-100 font-semibold mb-2">
              {texts.verificationFailed}
            </div>
            <div className="text-sm text-gray-300 dark:text-gray-100 mb-2">
              {texts.verificationMessage}
            </div>

            <Button
              appearance="primary"
              className="w-full h-12 flex items-center justify-center rounded-xl font-normal mt-6 mb-4"
              onClick={() => setOpen(false)}
            >
              {texts.tryAgain}
            </Button>

            <div className="py-2" onClick={() => setAuthenticator(true)}>
              <div className="text-sm cursor-pointer md:text-center text-left dark:text-primary-100 text-primary-200">
                {texts.passkeysNotAvailable}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:px-4">
            <div className="sm:text-[32px] text-left sm:leading-[40px] text-[28px] leading-[36px] text-black-100 dark:text-white-100 mb-4">
              {texts.phoneNumberVerification}
            </div>
            <div className="text-sm text-gray-300 dark:text-gray mb-8">
              {texts.enterCodeMessage}
            </div>
            <label
              htmlFor="code"
              className="text-sm text-gray-300 dark:text-gray"
            >
              {texts.phoneVerificationCode}
            </label>
            <Input
              id="code"
              className="h-12 rounded-[10px] w-full mt-1"
              value={value}
              onChange={handleChange}
              getCode={true}
              onGetCodeClick={() => setCodeClick("Code send")}
            />

            <Button
              appearance="primary"
              className="w-full h-12 flex items-center justify-center rounded-xl font-normal mt-6 mb-4"
              onClick={() => setOpen(false)}
            >
              {texts.submit}
            </Button>

            <div className="py-2" onClick={() => setAuthenticator(false)}>
              <div className="text-sm cursor-pointer dark:text-primary-100 text-primary-200 md:text-center text-left">
                {texts.usePasskeys}
              </div>
            </div>
            <div className="py-2" onClick={() => setAuthenticator(false)}>
              <div className="text-sm cursor-pointer dark:text-primary-100 text-primary-200 md:text-center text-left">
                {texts.securityUnavailable}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
