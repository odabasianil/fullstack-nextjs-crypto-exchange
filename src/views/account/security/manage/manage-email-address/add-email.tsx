import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { FC } from "react";

interface AddEmailProps {
  onAddEmailClick?: () => void;
}

export const AddEmail: FC<AddEmailProps> = ({ onAddEmailClick }) => {
  return (
    <div className="sm:w-[425px] mx-auto mt-6 sm:px-0 px-4 flex flex-col grow pb-10 md:pb-0">
      <div className="flex flex-col md:grow-0 grow">
        <div className="flex-1 flex flex-col">
          <div className="mx-auto mb-3">
            <Icon name="email-verification" className="" size={120} />
          </div>
          <div className="mb-2 md:text-xl text-lg text-black-100 dark:text-white-100 text-center md:block hidden font-semibold ">
            Improve your account security
          </div>
          <div className="text-center text-gray mb-10 text-[14px] leading-[22px]">
            Email verification adds another layer of security to your
            withdrawals and Binance account.
          </div>
        </div>

        <div className="flex flex-col">
          <Button
            appearance="primary"
            className="w-full h-12 flex items-center justify-center rounded-xl"
            onClick={onAddEmailClick}
          >
            Add Email
          </Button>
        </div>
      </div>
    </div>
  );
};
