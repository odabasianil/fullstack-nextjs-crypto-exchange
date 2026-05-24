"use client";

import { useState } from "react";
import { AccountConnectionCard } from "./account-connection-card";
import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

const data = [
  {
    image: "/images/google-icon.png",
    title: "Sign in with Google",
    connection: "Not Connected",
    button: "Connect",
    info: "",
    platform: "google",
  },
  {
    image: "/images/apple-icon.svg",
    title: "Sign in with Apple",
    connection: "Not Connected",
    button: "Connect",
    info: "",
    platform: "apple",
  },
  {
    image: "/images/telegram.svg",
    title: "Connect with Telegram",
    connection: "Not Connected",
    button: "Connect",
    info: "Telegram account cannot be used for FAZ3 login.",
    platform: "telegram",
  },
];

export const AccountConnectionsView = () => {
  const [connectionPlatform, setConnectionPlatform] = useState("");

  const handleButtonClick = (platform: string) => {
    setConnectionPlatform(platform);
  };

  return (
    <>
      <div className="md:px-0 px-4 sm:h-[72px] sm:min-h-[72px] w-full max-w-[1280px] h-[56px] flex mx-auto">
        <Link
          className="text-black-300 hover:text-white-100 flex items-center"
          href="/me/security"
        >
          <Icon name="chevron-left" className="mr-1" size={20} />
          Security
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="sm:px-0 md:text-[32px] md:leading-[40px] font-semibold text-2xl px-4 text-black-100 dark:text-white-100 sm:mb-6 ">
          Account Connections
        </div>
      </div>
      <div className="flex xl3:px-0 xl3:flex-row lg:px-6 lg:flex-col md:px-6 md:flex-col px-4 flex-col">
        <div className="flex flex-1 flex-col mb-6 ">
          {data.map((item, index) => (
            <AccountConnectionCard
              key={index}
              image={item.image}
              title={item.title}
              connection={item.connection}
              button={item.button}
              info={item.info}
              platform={item.platform}
              onButtonClick={handleButtonClick}
            />
          ))}
        </div>
        <div className="xl3:ml-16 lg:ml-0 md:ml-0 md:w-[333px] w-full">
          <div className="flex rounded-[4px] p-4 bg-white-200 dark:bg-black-900">
            <div className="flex justify-center items-start mr-2">
              <Icon
                name="account-activity"
                size="16"
                className="text-gray mt-1"
              />
            </div>
            <div className="flex flex-col shrink-[1]">
              <div className="flex flex-col">
                <div className="text-base text-black-100 dark:text-white-100 mb-2">
                  Check Account Activity
                </div>
                <div className="text-sm text-black-300 dark:text-gray-900 mb-1">
                  You can check all activity on your account by clicking the
                  link below.
                </div>
              </div>
              <Link
                href={""}
                className="text-primary-200 dark:text-primary-100 text-sm underline"
              >
                Account Activity
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className="md:w-[425px] w-full sm:max-w-[80vw] max-w-none h-full sm:h-[580px]"
        showCloseButton={true}
        open={connectionPlatform == "telegram"}
        setOpen={(open) => setConnectionPlatform(open ? "telegram" : "")}
      >
        <div className="flex justify-center">
          <Icon
            name="telegram"
            className="text-[#29abee] text-center"
            size={56}
          />
        </div>
        <div className="text-center font-semibold md:mt-4 mt-0 mb-6 md:text-xl text-lg text-black-100 dark:text-white-100 md:block hidden">
          Connect Telegram
        </div>
        <div className="text-left md:text-sm text-sm text-black-200 dark:text-white-100 mb-4">
          After clicking on the Connect button below, you will be redirected to
          the Telegram pages to complete authorization for linking your account.
        </div>
        <div className="md:text-sm text-sm text-gray-300 dark:text-gray-100 p-4 dark:bg-black-100 bg-white-200 mb-6">
          <div>Please note:</div>
          <div>
            <b> · </b>Telegram account will not be used for FAZ3 account login.
          </div>
          <div>
            <b> · </b>Each Telegram account can only be linked to one FAZ3
            account at a time.
          </div>
          <div>
            <b> · </b>A Telegram account can only be linked to a FAZ3 account 30
            days after unbinding.
          </div>
          <div>
            <b> · </b>Your FAZ3 account can only be linked to a Telegram account
            again 30 days after the previous link.
          </div>
        </div>
        <Button
          appearance="primary"
          className="w-full h-12 flex items-center justify-center rounded-xl font-semibold mt-6"
          onClick={() => {}}
        >
          Connect
        </Button>
      </Modal>
    </>
  );
};
