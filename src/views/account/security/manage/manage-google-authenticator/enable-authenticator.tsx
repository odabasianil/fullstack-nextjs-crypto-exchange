import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { RootState } from "@/core/store/store";
import Link from "next/link";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { SecurityManageCard } from "../manage-yubikey-authenticator/security-manage-card";

interface EnableAuthenticatorProps {
  enableAuthenticatorClick?: () => void;
}

export const EnableAuthenticator: FC<EnableAuthenticatorProps> = ({
  enableAuthenticatorClick,
}) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [manageData, setManageData] = useState([
    {
      title: "Authenticator",
      added: "November 8, 2023",
      icon: "authenticator",
      onShowEditIcon: false,
      edit: [
        {
          name: "edit",
          type: "edit",
        },
        {
          name: "delete",
          type: "delete",
        },
      ],
    },
  ]);
  
  return (
    <div className=" flex-col ">
      <div className="flex flex-col grow">
        {!user?.isGoogleVerified && (
          <>
            <div className="flex-1 flex flex-col">
              <div className="mx-auto mb-3">
                <Icon name="authenticator-app" className="" size={120} />
              </div>
              <div className="mb-2 md:text-xl text-lg text-black-100 dark:text-white-100 text-center md:block hidden ">
                Enjoy faster login
              </div>
              <div className="text-center text-gray mb-10 text-[14px] leading-[22px]">
                Instead of waiting for text messages, get verification codes
                from an authenticator app like Google Authenticator. It works
                even if your phone is offline.
              </div>
            </div>

            <div className="flex flex-col">
              <Button
                appearance="primary"
                className="w-full h-12 flex items-center justify-center rounded-xl"
                onClick={enableAuthenticatorClick}
              >
                Enable Authenticator App
              </Button>
              <Link
                href={""}
                className="md:text-sm dark:md:text-primary-100 md:text-primary-200 dark:text-white-100 text-black-100 mt-6 md:font-semibold font-normal flex text-left md:text-center order-[-1] md:order-1 items-center md:justify-center justify-start p-4 md:p-0 dark:md:bg-transparent md:bg-transparent bg-white-300 dark:bg-black-300 mb-4 md:mb-auto"
              >
                Download Authenticator App
              </Link>
            </div>
          </>
        )}
        {user?.isGoogleVerified && (
          <>
           <SecurityManageCard
          data={manageData}
          onIconClick={(type: string) => {
            
          }}
        />
        </>
        )}
      </div>
    </div>
  );
};
