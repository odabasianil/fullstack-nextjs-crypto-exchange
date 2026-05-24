import { useRouter } from "next/navigation";
import Image from "next/image";
import { twJoin } from "tailwind-merge";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export interface Verify2FAModalData {
  title: string;
  description: string;
  InputPlaceHolder: string;
  InputType: string;
  InputActionButtonTitle: string;
  InputAction: () => void;
  SubmitTitle: string;
  SubmitAction: (code: string, setIsLoading: any) => void;
  otherActions: [];
}

export interface Verify2FAModalInterface {
  data?: Verify2FAModalData;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Verify2FAModal = (props: Verify2FAModalInterface) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setIsOpen(props.open);
    props.setOpen(props.open);
  }, [props.open]);

  return (
    props.data &&
    <Modal
      open={isOpen}
      id="verify-2fa-modal"
      setOpen={(_open: boolean) => { console.log("vopen", _open); setIsOpen(_open); props.setOpen(_open); }}
      showCloseButton={true}
      isBackdropClickable={false}
      isMobileOpen
      className="max-h-[70vh] rounded-b-none md:rounded-2xl md:w-[425px] md:max-w-[80vw] w-full md:h-fit h-full max-w-[none] z-[120]"
    >
      <div className="flex flex-col md:px-4">
        <div className="sm:text-[32px] text-left sm:leading-[40px] text-[28px] leading-[36px] text-black-100 dark:text-white-100 mb-4">
          {props.data.title}
        </div>
        <div className="text-sm text-gray-300 dark:text-gray mb-8">
          {props.data.description}
        </div>
        <label
          htmlFor="code"
          className="text-sm text-gray-300 dark:text-gray"
        >
          {props.data.InputPlaceHolder}
        </label>
        <Input
          portalId={props.data.InputPlaceHolder}
          id="code"
          className="h-12 rounded-[10px] w-full mt-1"
          value={value}
          onChange={handleChange}
          getCode={true}
          onGetCodeClick={props.data.InputAction}
        />

        <Button
          appearance="primary"
          isLoading={isLoading}
          className="w-full h-12 flex items-center justify-center rounded-xl font-normal mt-6 mb-4"
          onClick={() => {
            props!.data!.SubmitAction(value, setIsLoading);
            setValue("");
          }}
        >
          {props.data.SubmitTitle}
        </Button>

        {props.data.otherActions.map((actionItem: any) => (
          <div className="py-2" onClick={actionItem.action}>
            <div className="text-sm cursor-pointer dark:text-primary-100 text-primary-200 md:text-center text-left">
              {actionItem.title}
            </div>
          </div>
        ))}

      </div>
    </Modal>
  );
};
