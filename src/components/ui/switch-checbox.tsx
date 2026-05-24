import { twMerge } from "tailwind-merge";

export const SwitchChecbox = ({
  checked,
  setChecked,
  disabled,
  theme,
}: {
  checked: boolean;
  setChecked: any;
  disabled?: boolean;
  theme?: string;
}) => {
  const toggleCheck = () => {
    if (!disabled) {
      setChecked(!checked);
    }
  };

  return (
    <div
      className={twMerge(
        "bg-gray-100 dark:bg-gray-300 border border-white-400 dark:border-secondary rounded-[8px]",
        "h-[22px] min-w-[42px] p-0.5 cursor-pointer",
        "inline-flex items-center relative",
        checked && "dark:bg-primary",
        theme === "secondary" && "min-w-[32px] h-[20px]",
        disabled  && "cursor-not-allowed opacity-50"
      )}
      onClick={() => toggleCheck()}
    >
      <div
        className={twMerge(
          "hidden absolute left-0.5 bottom-0 top-0 ",
          "bg-white my-0.5 w-[18px] rounded-md",
          "items-center justify-center",
          !checked && "flex",
          theme === "secondary" && "w-[14px] rounded-[4px]"
        )}
      />
      <div
        className={twMerge(
          "hidden absolute right-0.5 bottom-0 top-0",
          "bg-white my-0.5 w-[18px] rounded-md",
          "items-center justify-center",
          checked && "flex"
        )}
      />
    </div>
  );
};
