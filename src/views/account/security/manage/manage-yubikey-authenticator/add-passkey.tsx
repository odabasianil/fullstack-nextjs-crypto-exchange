import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { FC } from "react";

interface AddPasskeyProps {
  onClick: () => void;
}

export const AddPasskey: FC<AddPasskeyProps> = ({ onClick }) => {
  return (
    <div className="sm:w-[425px] mx-auto mt-6">
      <div className="flex flex-col">
        <div className="mx-auto mb-3">
          <Icon name="authenticator" className="" size={120} />
        </div>
        <div className="text-[28px] leading-[36px] font-semibold block mb-8 sm:hidden text-black-100 dark:text-white-100 text-center">
          Add Passkey
        </div>

        <div className="mb-6 md:px-0 px-3">
          <div className="flex items-start py-3 sm:gap-2">
            <Icon name="passkey-1" className="" size={24} />
            <div>
              <div className="text-base text-black-100 dark:text-white-100">
                Keep your crypto safer
              </div>
              <div className="text-sm text-gray mt-[2px]">
                Get better protection from online attacks like phishing.
              </div>
            </div>
          </div>
          <div className="flex items-start py-3 sm:gap-2">
            <Icon name="passkey-1" className="" size={24} />
            <div>
              <div className="text-base text-black-100 dark:text-white-100">
                Works on all of your devices
              </div>
              <div className="text-sm text-gray mt-[2px]">
                Use your passkeys to log in from any synced device.
              </div>
            </div>
          </div>
          <div className="flex items-start py-3 sm:gap-2">
            <Icon name="passkey-1" className="" size={24} />
            <div>
              <div className="text-base text-black-100 dark:text-white-100">
                Keep your crypto safer
              </div>
              <div className="text-sm text-gray mt-[2px]">
                Get better protection from online attacks like phishing.
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-10 px-6 sm:static sm:px-0 sm:block w-full">
          <Button
            appearance="primary"
            className="w-full h-12 flex items-center justify-center rounded-xl"
            onClick={onClick}
          >
            Add Passkey
          </Button>
        </div>
      </div>
    </div>
  );
};
