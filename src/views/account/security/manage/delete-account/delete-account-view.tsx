"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AntiPhishingCodeInfo } from "../anti-phishing-code/anti-phishing-code-info";

export const DeleteAccountView = () => {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [reasonData, setReasonData] = useState({
    reason: "",
    description: "",
  });
  const [isContent, setIsContent] = useState(0);
  const [checked, setChecked] = useState(false);

  const handleSelect = (reason: string) => {
    setSelectedReason(reason);
    if (reason !== "reason3") {
      setOtherReason("");
    }
  };

  const handleFormClick = () => {
    const data = {
      reason: selectedReason,
      description: selectedReason === "reason3" ? otherReason : "",
    };
    setReasonData(data);
    setIsContent(1);
  };

  const handleTermsClick = () => {
    setIsContent(2);
  };

  const handleChecked = () => {
    setChecked(!checked);
  };

  return (
    <>
      {isContent === 0 ? (
        <div className="md:px-0 px-4 sm:h-[72px] sm:min-h-[72px] w-full max-w-[1280px] h-[56px] flex mx-auto">
          <Link
            className="text-black-300 hover:text-white-100 flex items-center"
            href="/me/security"
          >
            <Icon name="chevron-left" className="mr-1" size={20} />
            Security
          </Link>
        </div>
      ) : (
        <div
          onClick={() => {
            setIsContent(isContent - 1);
          }}
          className="cursor-pointer md:px-0 px-4 sm:h-[72px] sm:min-h-[72px] w-full max-w-[1280px] h-[56px] flex mx-auto"
        >
          <div className="text-black-300 hover:text-white-100 flex items-center">
            <Icon name="chevron-left" className="mr-1" size={20} />
            Back
          </div>
        </div>
      )}

      <div className="px-4 md:px-0">
        <div className="flex items-center justify-between">
          <div className="sm:px-0 md:text-[32px] md:leading-[40px] font-semibold text-2xl px-4 text-black-100 dark:text-white-100 sm:mb-6 mb-8 ">
            {isContent === 0 && "Deletion Reason"}
            {isContent === 1 && "Terms And Conditions"}
            {isContent === 2 && "Delete Account"}
          </div>
        </div>

        {isContent === 0 && (
          <div className="w-full md:w-[444px] lg:w-[484px] flex-1 flex flex-col">
            <div className="flex flex-col">
              <div
                onClick={() => handleSelect("reason1")}
                className="flex flex-col items-start px-[15px] py-4 mb-[15px] rounded-[4px] bg-white-300 dark:bg-background-300 cursor-pointer"
              >
                <div className="flex flex-row-reverse items-center self-stretch cursor-pointer">
                  <div
                    className={twMerge(
                      "w-4 h-4 border border-gray-100 items-center inline-flex bg-transparent rounded-[50%] justify-center relative",
                      selectedReason === "reason1"
                        ? "before:bg-white bg-black-200"
                        : "before:bg-transparent",
                      "before:absolute before:transition duration-[250ms] before:transition-property-[background-color] before:ease-in-out before:rounded-full before:w-[6px] before:h-[6px]"
                    )}
                  ></div>
                  <div className="text-sm text-black-200 dark:text-white-100 flex-1 mr-3">
                    No longer want to use this account
                  </div>
                </div>
              </div>

              <div
                onClick={() => handleSelect("reason2")}
                className="flex flex-col items-start px-[15px] py-4 mb-[15px] rounded-[4px] bg-white-300 dark:bg-background-300 cursor-pointer"
              >
                <div className="flex flex-row-reverse items-center self-stretch cursor-pointer">
                  <div
                    className={twMerge(
                      "w-4 h-4 border border-gray-100 inline-flex bg-transparent items-center rounded-[50%] justify-center relative",
                      selectedReason === "reason2"
                        ? "before:bg-white bg-black-200"
                        : "before:bg-transparent",
                      "before:absolute before:transition duration-[250ms] before:transition-property-[background-color] before:ease-in-out before:rounded-full before:w-[6px] before:h-[6px]"
                    )}
                  ></div>
                  <div className="text-sm text-black-200 dark:text-white-100 flex-1 mr-3">
                    Merge multiple account
                  </div>
                </div>
              </div>
              <div
                onClick={() => handleSelect("reason3")}
                className="flex flex-col items-start px-[15px] py-4 mb-[15px] rounded-[4px] bg-white-300 dark:bg-background-300 cursor-pointer"
              >
                <div className="flex flex-row-reverse items-center self-stretch cursor-pointer">
                  <div
                    className={twMerge(
                      "w-4 h-4 border border-gray-100 inline-flex bg-transparent items-center rounded-[50%] justify-center relative",
                      selectedReason === "reason3"
                        ? "before:bg-white bg-black-200"
                        : "before:bg-transparent",
                      "before:absolute before:transition duration-[250ms] before:transition-property-[background-color] before:ease-in-out before:rounded-full before:w-[6px] before:h-[6px]"
                    )}
                  ></div>
                  <div className="text-sm text-black-200 dark:text-white-100 flex-1 mr-3">
                    Others
                  </div>
                </div>
                {selectedReason === "reason3" && (
                  <div className="mt-2 w-full">
                    <div className="md:text-sm text-sm w-full bg-white dark:bg-background rounded-lg">
                      <textarea
                        className="w-full h-[120px] border-none outline-none md:text-sm bg-transparent my-[16px] mx-[12px] resize-none overflow-auto"
                        placeholder="Enter description"
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Button
              onClick={handleFormClick}
              type="submit"
              appearance="primary"
              className={twMerge(
                "w-full h-10 md:w-[198px] flex items-center justify-center rounded-md font-normal mt-6 opacity-30 pointer-events-none",
                selectedReason && "opacity-100 pointer-events-auto"
              )}
            >
              Continue
            </Button>
          </div>
        )}
        {isContent === 1 && (
          <div className="w-full md:w-[444px] lg:w-[484px] flex-1 flex flex-col">
            <div className="md:text-base text-sm dark:text-white-100 text-black-200">
              We hereby inform you that the personal data you have provided in
              connection with your use of Binance Services shall be kept, for as
              long as it is required in order to fulfill the relevant purposes
              described in our Privacy Notice, and as may be required by law
              such as for tax and accounting purposes, compliance with
              Anti-Money Laundering laws, or to resolve disputes and/or legal
              claims or as otherwise communicated to you.
            </div>
            <div className="md:text-base text-sm dark:text-white-100 text-black-200">
              While retention requirements vary by jurisdiction, information can
              be found
            </div>

            <Button
              onClick={handleTermsClick}
              type="submit"
              appearance="primary"
              className={twMerge(
                "w-full h-10 md:w-[198px] flex items-center justify-center rounded-md font-normal mt-6"
              )}
            >
              Accept & Continue
            </Button>
          </div>
        )}
        {isContent === 2 && (
          <div className="w-full md:w-[444px] lg:w-[484px] flex-1 flex flex-col">
            <AntiPhishingCodeInfo
              wrapperClassName="bg-background-1100"
              className="m-0 mb-2 md:w-full w-full max-w-none"
              title="Your identity verification might be rejected if another account is created after this deletion."
            />
            <AntiPhishingCodeInfo
              wrapperClassName="bg-background-1100"
              className="m-0 mb-6 md:w-full w-full max-w-none"
              title="Please be advised that your transaction records will no longer be accessible once your account is deleted. Kindly download your transaction records before proceeding with the account deletion. Refer to the FAQ on the download instructions."
            />
            <div className="text-gray text-base mb-6">
              You have the following assets:
            </div>
            <div className="flex items-center px-4 md:h-[48px] h-[52px] md:mb-6 dark:bg-background-300 bg-white-300 rounded-[4px] mb-3">
              <div className="rounded-lg w-2 h-2 mr-4 ml-2 bg-primary-100"></div>
              <div className="md:text-base dark:text-white-100 text-black-200">
                NFT: 0
              </div>
            </div>
            <div className="flex items-center px-4 md:h-[48px] h-[52px] md:mb-6 dark:bg-background-300 bg-white-300 rounded-[4px] mb-3">
              <div className="rounded-lg w-2 h-2 mr-4 ml-2 bg-primary-100"></div>
              <div className="md:text-base dark:text-white-100 text-black-200">
                Assets: 0 BTC
              </div>
            </div>
            <div className="flex items-center">
              <div
                onClick={handleChecked}
                className={twMerge(
                  "w-4 cursor-pointer min-w-4 h-4 border rounded-sm border-white-100 dark:border-gray relative",
                  checked && "!bg-black-200 border-none text-white-100"
                )}
              >
                {checked && (
                  <Icon name="check" className="absolute w-full h-full" />
                )}
              </div>
              <div className="ml-2 text-sm">I agree and accept to lose all my assets.</div>
            </div>

            <Button
              onClick={handleTermsClick}
              type="submit"
              appearance="primary"
              className={twMerge(
                "w-full h-10 md:w-[198px] flex items-center justify-center rounded-md font-normal mt-6 opacity-30 pointer-events-none",
                checked && "opacity-100 pointer-events-auto"
              )}
            >
              Accept & Continue
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
