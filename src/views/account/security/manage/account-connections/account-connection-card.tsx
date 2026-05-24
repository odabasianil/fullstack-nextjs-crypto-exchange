import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import Image from "next/image";

type AccountConnectionCardProps = {
  image?: string;
  title?: string;
  connection?: string;
  button?: string;
  onButtonClick?: (platform: string) => void;
  info?: string;
  platform: string;
};

export const AccountConnectionCard = ({
  image,
  title,
  connection,
  button,
  onButtonClick,
  info,
  platform,
}: AccountConnectionCardProps) => {
  return (
    <>
      <div className="flex border-b border-white-100 dark:border-white-200 items-start pb-6">
        <div className="flex justify-center items-start md:mr-4 w-6 py-7">
          <Image width={16} height={16} src={image || ""} alt="" />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex justify-between pt-6 items-center flex-1 ">
            <div className="flex flex-col flex-1 ">
              <div className="text-base text-black-100 dark:text-white-100 mb-2">
                {title}
              </div>
              <div className="md:mb-2 text-sm text-gray-100">{connection}</div>
              {info && (
                <div className="md:mt-2 flex items-start mt-1">
                  <Icon
                    className="text-gray-100 mr-1 mt-1"
                    name="payment-warning"
                    size="16"
                  />
                  <div className="text-gray-100 flex items-center text-sm">
                    {info}
                  </div>
                </div>
              )}
            </div>
            <div className="flex relative justify-end w-[120px] ">
              <Button
                appearance="primary"
                className="w-full text-sm h-8 flex items-center justify-center rounded-md !min-w-[96px]"
                onClick={() => {
                  onButtonClick?.(platform ?? "");
                }}
              >
                {button}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
