import { Icon } from "@/components/ui/icon";
import { twMerge } from "tailwind-merge";

type GridTabsType = {
  tabs: {
    text: string;
    value: string;
    icon?: string;
  }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const GridTabs = (props: GridTabsType) => {
  const { tabs, activeTab, setActiveTab } = props;

  const handleTab = (tab: string) => {
    setActiveTab(tab);
  }
  

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <div className="flex bg-white-100 dark:bg-secondary h-8 w-[calc(50%-20px)] p-0.5 rounded">
          {
            tabs.map((tab, index) => (
              <div onClick={() => handleTab(tab.value)} className={twMerge(
                'cursor-pointer flex items-center justify-center flex-1 text-sm rounded',
                activeTab === tab.value ? 'bg-white-200 dark:bg-black-100 text-black-100 dark:text-white-100' : 'text-black-300 dark:text-gray'
              )}>
                {tab.icon && <Icon
                  name={tab.icon}
                  size={16}
                  color="#fff"
                  className={twMerge(
                    'mr-1',
                  )}
                />}
                {tab.text}
              </div>
            ))
          }
        </div>
        <div className="flex items-center text-xs justify-end">
          <div className="text-xs text-black-300 dark:text-gray px-3 border-r border-r-white-300 dark:border-r-secondary">
            Tutorial
          </div>
          <div className="text-xs text-black-300 dark:text-gray px-3 border-r border-r-white-300 dark:border-r-secondary">
            Transfer
          </div>
          <div className="text-xs pl-3">
            Buy with BRL
          </div>
        </div>
      </div>
    </>
  )
}