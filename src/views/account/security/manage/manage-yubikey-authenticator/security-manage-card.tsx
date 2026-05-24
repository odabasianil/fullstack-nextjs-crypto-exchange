import { Icon } from "@/components/ui/icon";
import { twMerge } from "tailwind-merge";

interface iconsProps {
  name?: string;
  type?: string;
}

interface SecurityManageCardProps {
  title?: string;
  type?: string;
  added?: string;
  lastUsed?: string;
  edit: iconsProps[];
  icon?: string;
  onShowEditIcon?: boolean;
}

interface ManageDataProps {
  data: SecurityManageCardProps[];
  onIconClick: (modalType: string) => void;
}

export const SecurityManageCard = ({ onIconClick, data }: ManageDataProps) => {
  return (
    <div className="sm:p-6 sm:border dark:border-background-300 border-white-100 rounded-xl w-full">
      {data.map((item, index) => (
        <div
          key={"card" + index}
          className={twMerge(
            "sm:px-0 px-4 sm:pt-0 p-6 sm:pb-6 md:border-b dark:border-background-300 border-white-100 w-full",
            index === data.length - 1 &&
              data.length > 1 &&
              "sm:py-6 md:border-0 sm:pb-0",
            data.length === 1 && "md:border-0 md:pb-0"
          )}
        >
          <div className="flex items-center">
            <div className="flex items-start flex-grow-[1]">
              <div className="p-0.5">
                <Icon
                  name={item.icon}
                  size={20}
                  className="dark:text-white-100 text-black-100 cursor-pointer"
                />
              </div>
              <div className="px-2 sm:px-4">
                <div className="flex flex-col-reverse items-start sm:flex-row sm:items-center">
                  {item.title && (
                    <div className="text-base mr-1 text-black-100 dark:text-white-100">
                      {item.title}
                    </div>
                  )}
                  {item.type && (
                    <div className="mb-1 sm:mb-0">
                      <div className="bg-background-1000 px-1 text-xs rounded text-primary-100">
                        {item.type}
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-gray text-sm my-[2px]">
                  Added: {item.added}
                </div>
                {item.lastUsed && (
                  <div className="text-gray text-sm my-[2px]">
                    Last used: {item.lastUsed}
                  </div>
                )}
                {item.onShowEditIcon && (
                  <div className="flex gap-1 sm:mt-[6px]">
                    <Icon
                      name="edit-1"
                      size={20}
                      className="dark:text-white-100 text-black-100"
                    />
                    <Icon
                      name="edit-2"
                      size={20}
                      className="dark:text-white-100 text-black-100"
                    />
                  </div>
                )}
              </div>
            </div>
            {item.edit.map((icon, iconIndex) => (
              <div
                onClick={() => onIconClick(icon.type || "")}
                key={"icon" + iconIndex}
              >
                <Icon
                  key={iconIndex}
                  name={icon.name}
                  size={24}
                  className="dark:text-white-100 ml-6 text-black-100 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
