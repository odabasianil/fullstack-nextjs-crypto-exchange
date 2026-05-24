import { twMerge } from "tailwind-merge";
import { Icon } from "./icon";
import { ShareModal } from "./share-modal";
import { useState } from "react";
import { Button } from "./button";
import Link from "next/link";
import { truncateText } from "@/utils/truncate";

// Sosyal medya verisi
const socialMediaData = [
  { name: "whatsapp", url: "https://wa.me/" },
  { name: "facebook", url: "https://facebook.com/" },
  { name: "telegram", url: "https://t.me/" },
  { name: "x", url: "https://x.com/" },
  { name: "discord", url: "https://discord.com/" },
  { name: "custom-link", url: "#" },
];

const referralCodes = [
  { code: "YOUR_REFERRAL_CODE", title: "share-referral-code" },
  {
    code: "/en/support/faq/your-faq-slug?utm_source=new_share&ref=YOUR_REFERRAL_CODE",
    title: "Share link",
  },
];

export const Share = ({ className }: { className: any }) => {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const preserveLastFour = true;

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setActiveIndex(index); 
      setTimeout(() => setActiveIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="text-center">
          <div
            className="text-xs p-3 cursor-pointer flex items-center relative rounded-lg dark:bg-black-900"
            onClick={() => {
              setOpen(true);
            }}
          >
            <div className="mr-1 text-base dark:text-white-100 text-black-1100">
              Share
            </div>
            <Icon name="share-2" size="24" />
            <div className="absolute bg-primary-300 rounded py-0.5 px-1 inline-block w-[82px] h-5 share-translate top-1/2 right-0 left-2">
              <div className="box-border m-0 min-w-0 absolute w-[7px] h-[7px] bg-primary-100 top-1/2 left-[-2px] rotate-[-45deg] translate-y-[-50%]"></div>
              <div className="flex items-center">
                <Icon name="share3" size="16" />
                <div className="text-xs dark:text-white-100 text-black-1100">
                  100 USD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShareModal
        className="md:w-[520px]"
        open={open}
        setOpen={setOpen}
        iconSize={24}
      >
        <div className="mb-6 md:text-2xl text-xl text-black-100 dark:text-white-100 font-semibold">
          Share
        </div>
        <div className="mb-4 text-base text-black-100 dark:text-white-100">
          Share with your friends to earn 100 USD worth of trading fee vouchers!
        </div>
        {login ? (
          <>
            {referralCodes.map((item, index) => (
              <div
                key={index}
                className={twMerge("mb-2.5 flex items-center justify-between gap-4 border-white-100 dark:border-background-300 rounded-[32px] p-3 border", index === referralCodes.length - 1 && "mb-5")}
              >
                <div className="text-sm text-gray-300 dark:text-gray overflow-hidden">
                  {item.title}
                </div>
                <div className="flex-1 flex items-center min-w-[200px] gap-2 justify-end">
                  <div className="dark:text-white-100 text-right text-black-1000 whitespace-nowrap text-ellipsis overflow-x-hidden w-full text-sm font-medium">
                    {truncateText(item.code, 20, preserveLastFour)}
                  </div>
                  <div
                    className="relative cursor-pointer"
                    onClick={() => copyToClipboard(item.code, index)}
                  >
                    <Icon name="copy" size="16" />
                    <div
                      className={twMerge(
                        "max-h-0 opacity-0 overflow-hidden absolute transition-opacity top-[50%] translate-y-[-50%] right-[100%] text-sm invisible w-max z-[var(--zindex-tooltip)]",
                        activeIndex === index && "opacity-100 max-h-fit visible"
                      )}
                    >
                      <div className="mr-3 rounded-lg dark:bg-black-100 bg-white-200 max-w-[320px] relative p-4 ">
                        <div className="flex items-center">
                          <Icon
                            name="success"
                            size="16"
                            className="!text-green-200"
                          />
                          <div className="text-sm dark:text-white-100 text-black-100 ml-3">
                            Copy Success
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-row justify-between mb-5 py-4 px-3 gap-2 rounded-[32px] border border-white-100 dark:border-background-300">
            <div className="text-black-100 dark:text-white-100 md:text-sm text-sm">
              Log in to earn 100 USD from your shares
            </div>
            <Button
              appearance="primary"
              className="text-xs py-0 px-2 h-fit min-h-[24px] min-w-[40px]"
            >
              Login
            </Button>
          </div>
        )}
        <div className="flex relative">
          <div className="flex gap-5 justify-between overflow-x-scroll w-full">
            {socialMediaData.map((social, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 flex-col border border-background-300 w-[48px] h-[48px] justify-center rounded-[50%]"
              >
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={social.name} size="24" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </ShareModal>
    </>
  );
};
