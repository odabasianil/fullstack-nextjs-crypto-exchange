"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { truncateText } from "@/utils/truncate";
import { SwitchChecbox } from "@/components/ui/switch-checbox";
import { useState } from "react";
import { SecurityManageCard } from "./security-manage-card";
import { WarningModal } from "@/views/auth/login-password/warning-modal";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { PasskeyModal } from "../passkey-modal";
import { AddPasskey } from "./add-passkey";

const manageData = [
  {
    title: "ads",
    type: "Cross Device",
    added: "November 8, 2023",
    lastUsed: "-",
    icon:"user-edit",
    onShowEditIcon: true,
    edit: [
      {
        name: "edit",
        type: "ads",
      },
      {
        name: "trash",
        type: "trash",
      },
    ],
  },
  {
    title: "Passkey on iPhone 11",
    type: "Cross Device",
    added: "November 8, 2023",
    lastUsed: "12 hours ago",
    icon:"user-edit",
    onShowEditIcon: true,
    edit: [
      {
        name: "edit",
        type: "edit",
      },
      {
        name: "trash",
        type: "trash",
      },
    ],
  },
];

export const PasskeysView = () => {
  const [checked, setChecked] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [openWarning, setOpenWarning] = useState(false);
  const [openWarningSecond, setOpenWarningSecond] = useState(false);
  const [modalPasskey, setModalPasskey] = useState(false);
  const [isContent, setIsContent] = useState(false);

  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleAddPasskeyClick = () => {
    setIsContent(true);
  };

  const RenderWarningContent = () => {
    return (
      <div className="md:text-sm min-h-[140px] overflow-y-auto px-1.5 w-full">
        <div className="sm:p-3 sm:gap-1 grid rounded-lg border border-white-100 dark:border-background-300">
          <div className="flex gap-2">
            <Icon name="check" className="text-success-100" size="16" />
            <div className="text-left text-black-100 dark:text-white-100 text-sm ">
              You must have completed identity verification.
            </div>
          </div>
          <div className="flex gap-2">
            <Icon name="cancel" className="text-error" size="16" />
            <div className="text-left text-black-100 dark:text-white-100 text-sm ">
              You must have more than 100 USD worth of asset in your account.
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "edit":
        return (
          <div className="flex flex-col md:items-center items-start">
            <Icon name="authenticator" className="md:block hidden" size={96} />
            <div className="md:mt-4 mt-0 mb-6 md:text-xl text-lg text-black-100 dark:text-white-100 md:block hidden">
              Rename Authenticator
            </div>
            <div className="w-full">
              <label
                htmlFor="code"
                className="text-sm text-black-100 dark:text-white-100 "
              >
                Biometric/Security Key Label
              </label>
              <Input
                id="code"
                className="h-12 rounded-[10px] w-full mt-1"
                value={value}
                onChange={handleChange}
                clearIconSize={16}
                isClearable={true}
                counter={true}
              />
            </div>
            <Button
              appearance="primary"
              className="w-full h-12 flex items-center justify-center rounded-xl font-semibold mt-6"
              onClick={() => setModalType(null)}
            >
              Save
            </Button>
          </div>
        );
      case "ads":
        return (
          <div className="flex flex-col md:items-center items-start">
            <Icon name="authenticator" className="md:block hidden" size={96} />
            <div className="md:mt-4 mt-0 mb-6 md:text-xl text-lg text-black-100 dark:text-white-100 md:block hidden">
              Rename Authenticator
            </div>
            <div className="w-full">
              <label
                htmlFor="code"
                className="text-sm text-black-100 dark:text-white-100 "
              >
                Biometric/Security Key Label
              </label>
              <Input
                id="code"
                className="h-12 rounded-[10px] w-full mt-1"
                value={value}
                onChange={handleChange}
                clearIconSize={16}
                isClearable={true}
                counter={true}
              />
            </div>
            <Button
              appearance="primary"
              className="w-full h-12 flex items-center justify-center rounded-xl font-semibold mt-6"
              onClick={() => setModalType(null)}
            >
              Save
            </Button>
          </div>
        );
      case "trash":
        return (
          <div className="flex flex-col items-center">
            <Icon name="trash-image" className="" size={96} />
            <div className="text-center md:mt-4 mt-0 mb-6 md:text-xl text-lg text-black-100 dark:text-white-100 font-semibold">
              Are You Sure You Want to Remove Your Passkey?
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
                onClick={() => setModalType(null)}
              >
                Cancel
              </Button>
              <Button
                appearance="primary"
                className="w-full h-10 flex items-center justify-center rounded-xl font-normal mt-6"
                onClick={() => setModalType(null)}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="sm:px-0 md:text-[32px] md:leading-[40px] font-semibold text-2xl px-4 text-black-100 dark:text-white-100 ">
          Passkeys (Biometrics)
        </div>
        <div
          className="fixed bottom-10 px-6 sm:static sm:px-0 sm:w-[180px] sm:block w-full"
          onClick={() => setModalPasskey(true)}
        >
          {isContent && (
            <Button className="w-full text-base h-[40px] leading-[0] py-6 sm:py-0  ">
              {truncateText("Add New Authenticator", 20, false)}
            </Button>
          )}
        </div>
      </div>
      {isContent ? (
        <>
          <div className="sm:px-0 px-4 sm:pt-4 sm:pb-6 flex sm:justify-start justify-between py-4 border-0 dark:border-background-300 border-white-100 w-full">
            <div className="inline-flex pr-6 items-center">
              <div className="sm:text-base w-full text-base text-black-100 dark:text-white-400">
                Must verify using passkey for important scenarios
              </div>
              <div onClick={() => setOpenWarning(true)} className="ml-1">
                <Icon
                  name="payment-warning"
                  size={20}
                  className="mr-1 text-gray cursor-pointer"
                />
              </div>
            </div>
            <div
              className="flex items-center"
              onClick={() => {
                setOpenWarningSecond(true);
              }}
            >
              <SwitchChecbox
                disabled={true}
                checked={checked}
                setChecked={setChecked}
                theme="secondary"
              />
            </div>
          </div>
          <SecurityManageCard
            onIconClick={(type: string) => {
              setModalType(type);
            }}
            data={manageData}
          />
        </>
      ) : (
        <AddPasskey onClick={handleAddPasskeyClick} />
      )}

      <WarningModal
        open={openWarning}
        setOpen={setOpenWarning}
        icon="warning"
        title="Tip"
        textClass="text-sm font-normal text-center"
        titleClass="mb-4 font-medium"
        description="After turning on this switch, you will be required to use your passkeys to verify actions for important scenarios including log in, withdraw, etc. If you don't have your passkeys available when you want to perform certain actions, you might need to contact Customer Support."
        className="pt-4 pr-6 pb-6"
        iconClass="order-[-1]"
      />

      <WarningModal
        open={openWarningSecond}
        setOpen={setOpenWarningSecond}
        icon="warning"
        title="Eligibility Check"
        textClass="text-sm font-normal text-center"
        titleClass="mb-4 font-medium"
        description="To use this feature, you must meet these following prerequisites."
        className="pt-4 pr-6 pb-6"
        iconClass="order-[-1]"
      >
        {RenderWarningContent()}
      </WarningModal>

      <Modal
        className={
          modalType === "trash" ? "w-[360px]" : "md:w-[360px] md:max-w-[80vw]"
        }
        isMobileOpen={modalType !== "trash"}
        showCloseButton={modalType !== "trash"}
        open={!!modalType}
        setOpen={() => setModalType(null)}
        title={modalType === "trash" ? "" : "Rename Authenticator"}
        titleClass="font-medium md:hidden block"
      >
        {renderModalContent()}
      </Modal>

      <PasskeyModal open={modalPasskey} setOpen={setModalPasskey} />
    </>
  );
};
