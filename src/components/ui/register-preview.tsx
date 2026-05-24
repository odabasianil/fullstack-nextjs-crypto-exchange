import { twMerge } from "tailwind-merge";
import { Icon } from "./icon";
import { Button } from "./button";

export const RegisterPreview = ({ className }: { className: any }) => {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center bg-white-900 dark:bg-black-900 text-center rounded-2xl p-6",
        className
      )}
    >
      <div className="mb-4">
        <Icon name="register-preview" size="64" />
      </div>
      <div className="mb-4">
        <div className="text-base dark:text-white-100 text-black-1100 font-semibold">
          222,636,797 users chose us. Find out why today.
        </div>
      </div>
      <Button className="py-1.5 px-3 h-auto min-w-[128px] leading-5" appearance="primary">Register Now</Button>
      <div className="mb-4"></div>
    </div>
  );
};
