import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface AddEmailModalInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
  onEmailSubmit?: (value: string) => void;
  type?: string;
}

const texts = {
  addEmail: "Add Email",
  editEmail: "Change Email",
  labelAdd: "Enter Email Address",
  verificationAdd: "Enter Verification Code",
  labelEdit: "New Email Address",
  submit: "Submit",
  widthdraw:
    "Withdrawals, P2P selling, and payment services will be disabled for 24 hours after you make this change to protect your account.",
};

export const AddEmailModal = (props: AddEmailModalInterface) => {
  const { open, setOpen, onEmailSubmit = () => {}, type } = props;
  const [authenticator, setAuthenticator] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [verificationValue, setVerificationValue] = useState("");

  const [disabled, setDisabled] = useState(true);

  const handleEmailChange = (e: any) => {
    setEmailValue(e.target.value);
  };
  const handleVerificationCodeChange = (e: any) => {
    setVerificationValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onEmailSubmit(emailValue);
  };

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        showCloseButton
        className="md:w-[425px] md:max-w-[80vw] w-full md:h-[580px] h-full max-w-[none]"
        showBackButton={authenticator ? true : false}
        onBackButtonClick={() => setAuthenticator(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:px-4">
            <div className="sm:text-[32px] text-left font-semibold sm:leading-[40px] text-[28px] leading-[36px] text-black-100 dark:text-white-100 mb-4">
              {type === "edit" ? texts.editEmail : texts.addEmail}
            </div>
            {type === "edit" && (
              <div className="mt-8 p-3 flex rounded-xl text-black-200 dark:text-white-100 gap-0.5 bg-background-1100 text-sm">
                <Icon name="payment-warning" className="text-gray dark:text-white-100" size={20} />
                <div className="flex-1">{texts.widthdraw}</div>
              </div>
            )}
            <label
              htmlFor="email"
              className="text-sm text-gray-300 dark:text-gray mt-8"
            >
              {type === "edit" ? texts.labelEdit : texts.labelAdd}
            </label>
            <Input
              id="email"
              className="h-12 rounded-[10px] w-full mt-1"
              value={emailValue}
              onChange={handleEmailChange}
            />
            <label
              htmlFor="code"
              className="text-sm text-gray-300 dark:text-gray mt-4"
            >
              {texts.verificationAdd}
            </label>
            <Input
              id="code"
              className="h-12 rounded-[10px] w-full mt-1"
              value={verificationValue}
              onChange={handleVerificationCodeChange}
              getCode={true}
              onGetCodeClick={() => {}}
            />

            <Button
              appearance="primary"
              className={twMerge(
                "w-full h-12 flex items-center justify-center rounded-xl font-normal mt-6 mb-4",
                disabled &&
                  verificationValue.length < 5 &&
                  "cursor-not-allowed opacity-30"
              )}
            >
              {texts.submit}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
