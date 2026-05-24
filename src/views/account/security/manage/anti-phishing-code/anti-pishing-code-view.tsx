"use client";
import { Button } from "@/components/ui/button";
import { HelpText } from "@/components/ui/help-text";
import { AntiPhishingCodeInfo } from "./anti-phishing-code-info";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { AntiPhishingCodeModal } from "../anti-phishing-code-modal";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { userSecurityService } from "@/core/services/user/userSecurity.service";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export const AntiPhishingCodeView = () => {
  const [open, setOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const [pishingCode, setPishingCode] = useState("");

  const user = useSelector((state: RootState) => state.user.user);
  const toast = useToast();

  useEffect(() => {
    if (user) {
      userSecurityService.GetAntiPhishingCode().then((res) => {
        if (res.success) {
          if (res.data) {
            setPishingCode(res.data);
          }
        }
      });
    }
  }, [user]);

  const handleCodeChange = (code: string) => {
    if (code) {
      setPishingCode(code);
      userSecurityService.SetAntiPhishingCode(code).then((res) => {
        if (res.success) {
          toast?.open("Anti-Phishing Code updated successfully", "success");
          setPishingCode(code);
        }
      });
    }
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
      <div className="flex-1">
        <div className="md:justify-start flex flex-col items-center justify-normal h-[calc(100vh-124px)] md:px-0 px-4">
          <div className="md:mb-12 md:mt-8 mt-2 mb-6 md:text-[32px] text-[24px] leading-[40px] text-center font-semibold">
            Anti-Phishing Code
          </div>

          {/* {<AntiPhishingCodeInfo title=" Do not disclose your password or verification codes to anyone, including FAZ3 Support." />} */}
          <div className="md:w-[384px] flex-1 md:flex-none md:max-w-full md:px-0 mx-auto w-full max-w-[375px] bg-transparent">
            <>
              <div className="text-black-200 dark:text-white-100 text-sm">
                Old Anti-Phishing Code
              </div>
              <div className="bg-gray-1000 dark:bg-black-900 text-sm h-12 py-3.5 text-center rounded-[4px]">
                {pishingCode}
              </div>
            </>
            <div className="mt-6 flex justify-end ">
              <div className="text-primary-200 relative hidden md:flex dark:text-primary-100 text-sm cursor-pointer group">
                <HelpText
                  arrowClass="bg-gray-600"
                  className="w-[384px] max-w-[384px] bg-gray-600 p-6"
                >
                  <AntiPhishingCodeInfo title=" We recommend that you change your Anti-Phishing Code from time to time in order to improve your account security." />
                  <div className="text-white-800 text-base mb-1.5">
                    What is an Anti-Phishing Code?
                  </div>
                  <div className="text-xs text-white-800">
                    An Anti-Phishing Code is a code that helps to prevent
                    phishing attempts from fake FAZ3 websites or email
                    addresses.
                  </div>
                  <div className="text-white-800 text-base mb-2 mt-6">
                    What is an Anti-Phishing Code?
                  </div>
                  <div className="text-xs text-white-800">
                    Once you've set your unique Anti-Phishing Code, it will be
                    included in all official FAZ3 emails.
                  </div>
                </HelpText>
                How does it work ?
              </div>
              <div
                onClick={() => {
                  setInfoModalOpen(true);
                }}
                className="text-primary-200 relative block md:hidden dark:text-primary-100 text-sm cursor-pointer group"
              >
                How does it work ?
              </div>
            </div>
          </div>
          <div className="md:w-[384px] md:max-w-full md:px-0 mx-auto w-full max-w-[375px] py-4 md:py-0 bg-transparent">
            <Button
              appearance="primary"
              className="w-full h-12 flex items-center justify-center rounded-md mt-6"
              onClick={() => setOpen(true)}
            >
              {pishingCode && "Change Anti-Phishing Code"}
              {!pishingCode && "Create Anti-Phishing Code"}
            </Button>
          </div>
        </div>
      </div>
      <AntiPhishingCodeModal
        onCodeChange={handleCodeChange}
        open={open}
        setOpen={setOpen}
      />
      <Modal
        className="md:w-[360px] w-full md:h-fit h-full max-w-none md:max-w-[80vw] rounded-md p-4"
        isMobileOpen={false}
        showCloseButton={true}
        open={infoModalOpen}
        setOpen={setInfoModalOpen}
      >
        <div className="flex flex-col md:h-auto h-[calc(-64px+100vh)]">
          <div className="md:mb-12 md:mt-8 mt-2 mb-6 md:text-[32px] text-[24px] leading-[40px] text-center font-semibold">
            Anti-Phishing Code
          </div>
          <AntiPhishingCodeInfo
            textClass="leading-[24px]"
            className="mx-0"
            title=" We recommend that you change your Anti-Phishing Code from time to time in order to improve your account security."
          />
          <div className="flex-1">
            <div className="text-black-200 dark:text-white-100 text-base mb-1.5">
              What is an Anti-Phishing Code?
            </div>
            <div className="text-sm text-white-1000 dark:text-white-100">
              An Anti-Phishing Code is a code that helps to prevent phishing
              attempts from fake FAZ3 websites or email addresses.
            </div>
            <div className="text-black-200 dark:text-white-100 text-base mb-2 mt-6">
              What is an Anti-Phishing Code?
            </div>
            <div className="text-sm text-white-1000 dark:text-white-100">
              Once you've set your unique Anti-Phishing Code, it will be
              included in all official FAZ3 emails.
            </div>
          </div>
          <div className="mt-6">
            <Button
              appearance="primary"
              className="w-full h-12 flex items-center justify-center rounded-md"
              onClick={() => {
                setOpen(true);
                setInfoModalOpen(false);
              }}
            >
              Change Anti-Phishing Code
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
