import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface AntiPhishingCodeModalInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCodeChange: (code: string) => void;
}

export const AntiPhishingCodeModal = (
  props: AntiPhishingCodeModalInterface
) => {
  const { open, setOpen, onCodeChange } = props;
  const [value, setValue] = useState("");
  const [inputError, setInputError] = useState("");

  const handleError = (inputValue: string) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (
      inputValue.length < 4 ||
      inputValue.length > 20 ||
      specialCharRegex.test(inputValue)
    ) {
      setInputError("Please enter 4-20 characters, excluding special symbols.");
      return true;
    }
    setInputError("");
    return false;
  };

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    setValue(newValue);
    handleError(newValue);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (handleError(value)) {
      return;
    }
    onCodeChange(value);
    setOpen(false);
  };

  return (
    <>
      <Modal
        className="md:w-[360px] w-full md:h-fit h-full max-w-none md:max-w-[80vw] rounded-md p-4"
        isMobileOpen={false}
        showCloseButton={true}
        open={open}
        setOpen={setOpen}
        title="Change Anti-Phishing Code"
        titleClass="font-medium md:block hidden"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:h-auto h-[calc(-64px+100vh)]"
        >
          <div className="md:mb-12 md:mt-8 mt-2 mb-6 md:text-[32px] text-[24px] leading-[40px] text-center font-semibold md:hidden block">
            Change Anti-Phishing Code
          </div>
          <div className="md:flex-auto flex-1">
            <div className="text-black-200 dark:text-white-100 text-sm pt-6">
              New Anti-Phishing Code
            </div>
            <Input
              id="code"
              className="h-12 rounded-[10px] w-full mt-1"
              value={value}
              onChange={handleChange}
              clearIconSize={16}
              isClearable={true}
              clearIconClass="text-gray"
              error={inputError}
              errorClassName="text-xs"
            />
          </div>
          <div className="mt-6">
            <Button
              appearance="primary"
              className="w-full h-12 flex items-center justify-center rounded-md font-medium md:mb-auto"
              type="submit"
            >
              Confirm
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
