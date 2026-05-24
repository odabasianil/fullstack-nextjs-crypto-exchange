"use client";
import { useState } from "react";
import { AddEmail } from "./add-email";
import { AddEmailModal } from "../add-email-modal";
import { SecurityManageCard } from "../manage-yubikey-authenticator/security-manage-card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import { maskSensitiveData } from "@/utils/truncate";

export const EmailVerificationView = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const [emailModaltype, setEmailModalType] = useState("");

  const [manageData, setManageData] = useState([
    {
      title: "",
      added: "November 8, 2023",
      icon: "email",
      onShowEditIcon: false,
      edit: [
        {
          name: "edit",
          type: "edit",
        },
      ],
    },
  ]);

  const handleEmailSubmit = (value: string) => {
    const maskedEmail = maskSensitiveData(value, "email");
    const updatedData = [...manageData];
    updatedData[0].title = maskedEmail;
    setManageData(updatedData);
    setIsContent(true);
    setOpen(false);
  };

  const handleIconClick = (modalType: string) => {
    if (modalType === "edit") {
      setEditOpen(true);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="sm:px-0 md:text-[32px] md:leading-[40px] font-semibold text-2xl px-4 text-black-100 dark:text-white-100 sm:mb-6 ">
          Email Verification
        </div>
      </div>
      {isContent ? (
        <SecurityManageCard
          data={manageData}
          onIconClick={(type: string) => {
            handleIconClick(type);
          }}
        />
      ) : (
        <AddEmail onAddEmailClick={handleClick} />
      )}
      <AddEmailModal
        open={open}
        setOpen={setOpen}
        onEmailSubmit={handleEmailSubmit}
        type={emailModaltype}
      />

      <Modal
        className="md:w-[360px] md:max-w-[80vw] w-[360px]"
        open={editOpen}
        setOpen={setEditOpen}
      >
        <div className="flex flex-col items-center">
          <Icon name="email-verification-alert" className="" size={96} />
          <div className="text-center md:mt-4 mt-0 mb-6 md:text-xl text-lg text-black-100 dark:text-white-100 font-semibold">
            Are You Sure You Want to Change Your Email Address?
          </div>
          <ul className="text-left list-disc text-sm dark:text-white-100 text-black-100 font-normal px-4">
            <li>
              Withdrawals and P2P transactions might be disabled for 24 hours
              after removing your passkey to ensure the safety of your assets,
              based on our assessment of your risk level.
            </li>
            <li>
              Passkeys give good protection to your account and asset. We
              recommend that you keep using passkeys.
            </li>
          </ul>
          <div className="flex items-center w-full gap-2">
            <Button
              appearance="secondary"
              className="dark:bg-background-400 bg-white-100 dark:!text-white-100 !text-black-100  opacity-80 w-full h-10 flex items-center justify-center rounded-xl font-normak mt-6"
              onClick={() => {
                setEditOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              appearance="primary"
              className="w-full h-10 flex items-center justify-center rounded-xl font-normal mt-6"
              onClick={() => {
                setOpen(true);
                setEditOpen(false);
                setEmailModalType("edit");
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
