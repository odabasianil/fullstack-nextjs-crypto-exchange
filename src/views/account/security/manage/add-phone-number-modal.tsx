import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SelectAreaModal } from "@/components/ui/select-area-modal";

interface AddPhoneModalInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
  onPhoneSubmit?: (value: string) => void;
  type?: string;
}

const texts = {
  addNumber: "Add Phone Number",
  editNumber: "Change Phone Number",
  labelAdd: "Enter Your Number",
  verificationAdd: "Enter Verification Code",
  labelEdit: "Enter Your Number",
  submit: "Submit",
  widthdraw:
    "Withdrawals, P2P selling, and payment services will be disabled for 24 hours after you make this change to protect your account.",
};

export const AddPhoneModal = (props: AddPhoneModalInterface) => {
  const { open, setOpen, onPhoneSubmit = () => {}, type } = props;
  const [phoneValue, setPhoneValue] = useState("");
  const [verificationValue, setVerificationValue] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [areaData, setAreaData] = useState({ flag: "https://bin.bnbstatic.com/image/countrylogo/TR.png", code: "90" });
  const [formData, setFormData] = useState({ phone: "", verificationCode: "" });


  const handlePhoneChange = (e: any) => {
    setPhoneValue(e.target.value)
  };

  const handleVerificationCodeChange = (e: any) => {
    setVerificationValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    formData.phone = phoneValue;
    formData.verificationCode = verificationValue;
    onPhoneSubmit(phoneValue);
  };

  const handlePhoneClick = () => {
    setShowAreaModal(true);
  }

  const handleAreaAlick = ({ flag, code }: { flag: string; code: string }) => {
    setAreaData({ flag: flag, code: code });
    setShowAreaModal(false);
  }

  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        showCloseButton
        className="md:w-[425px] md:max-w-[80vw] w-full md:h-[580px] h-full max-w-[none]"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:px-4">
            <div className="sm:text-[32px] text-left font-semibold sm:leading-[40px] text-[28px] leading-[36px] text-black-100 dark:text-white-100 mb-4">
              {type === "edit" ? texts.editNumber : texts.addNumber}
            </div>
            {type === "edit" && (
              <div className="mt-8 p-3 flex rounded-xl text-black-200 dark:text-white-100 gap-0.5 bg-background-1100 text-sm">
                <Icon name="payment-warning" className="text-gray dark:text-white-100" size={20} />
                <div className="flex-1">{texts.widthdraw}</div>
              </div>
            )}
            <label
              htmlFor="phone"
              className="text-sm text-gray-300 dark:text-gray mt-8"
            >
              {type === "edit" ? texts.labelEdit : texts.labelAdd}
            </label>
            <Input
              id="phone"
              className="h-12 rounded-[10px] w-full mt-1"
              value={phoneValue}
              onChange={handlePhoneChange}
              onPhoneClick={handlePhoneClick}
              phoneInput={
                {
                  flag: areaData.flag,
                  phone: areaData.code
                }
              }
              isClearable={true}
              clearIconClass="text-gray dark:text-gray"
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
      <SelectAreaModal open={showAreaModal} setOpen={setShowAreaModal} onAreaClick={handleAreaAlick}/>
    </>
  );
};
