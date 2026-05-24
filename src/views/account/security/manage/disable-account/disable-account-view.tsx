"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import Link from "next/link";
import { useState } from "react";

export const DisableAccountView = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
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
          Account Activity
        </div>
      </div>
      <div className="sm:w-[425px] mx-auto mt-6 sm:px-0 px-4 flex flex-col grow pb-10 md:pb-0">
        <div className="flex flex-col grow md:grow-0">
          <div className="flex-1 flex flex-col">
            <div className="mx-auto mb-3">
              <Icon name="disable-account" className="" size={120} />
            </div>
            <div className="mb-2 md:text-xl text-lg text-black-100 dark:text-white-100 text-center">
              Disable Your Account
            </div>
            <div className="text-left text-gray md:mb-10 mb-2 text-[14px] leading-[22px]">
              Disabling your account will cause the following:
            </div>
            <ul className="text-left list-disc text-sm dark:text-white-100 text-black-100 font-normal px-4 mb-6">
              <li>
                All trading capacities and login for your account will be
                disabled.
              </li>
              <li>All devices for your account will be deleted.</li>
              <li>All pending withdrawals will be canceled.</li>
              <li>All open orders will be canceled.</li>
              <li>All API keys for your account will be deleted.</li>
              <li>Your verified information will not be deleted.</li>
            </ul>
            <div className="dark:bg-gray-700 bg-white-100 h-[1px]"></div>
            <div className="my-6 dark:text-gray-900 text-black-300 text-sm">
              Once your account is disabled, you will not be able to begin the
              reactivation process until at least two hours have passed.
            </div>
          </div>

          <div className="flex flex-col">
            <Button
              appearance="primary"
              className="w-full h-12 flex items-center justify-center rounded-xl"
              onClick={handleClick}
            >
              Disable this account
            </Button>
          </div>
        </div>
      </div>

      <Modal
        className="md:w-[360px] md:max-w-[80vw] w-full"
        open={open}
        setOpen={setOpen}
      >
        <div className="flex flex-col items-center">
          <Icon name="disable-account" className="" size={96} />
          <div className="text-center md:mt-4 mt-0 mb-6 md:text-xl text-lg text-black-100 dark:text-white-100 font-semibold">
            Are you sure you want to delete this device?
          </div>
          <div className="text-black-100 dark:text-white-100 text-sm text-center">
            If you wish to reactivate your account that was previously disabled,
            please ensure that the account is secure before reactivating.
          </div>
          <div className="flex items-center w-full gap-2">
            <Button
              appearance="secondary"
              className="dark:bg-background-400 bg-white-100 dark:!text-white-100 !text-black-100  opacity-80 w-full h-10 flex items-center justify-center rounded-xl font-normak mt-6"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              appearance="primary"
              className="w-full h-10 flex items-center justify-center rounded-xl font-normal mt-6"
              onClick={() => setOpen(false)}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
