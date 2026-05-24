import { HelpText } from "@/components/ui/help-text"
import { Icon } from "@/components/ui/icon"
import { twMerge } from "tailwind-merge"

export const FutureOrderTabs = (props: any) => {
  const { selectedTab, setSelectedTab } = props;
  const tabs = ['Limit', 'Market', 'Stop Limit'];
  const stopTabs = ['Stop Limit', 'Trailling Stop', 'Stop Market'];

  return (
    <>
      <div className="flex gap-3 items-center text-center font-semibold text-sm leading-3 px-4 pb-4">
        {
          tabs.map((tab, index) => index + 1 !== tabs?.length && (
            <div
              key={index}
              onClick={() => setSelectedTab(tab)}
              className={`cursor-pointer pt-2 pb-2.5 ${
                selectedTab === tab ? 'text-primary' : 'text-gray-300 dark:text-gray-400 dark:md:text-gray'
              }`}
            >
              {tab}
            </div>
          ))
        }
        <div className="flex items-center">
          <div
            onClick={() => setSelectedTab(tabs?.includes(selectedTab) ? tabs[tabs.length - 1] : selectedTab)}
            className={`cursor-pointer pt-2 pb-2.5 ${
              selectedTab === (tabs?.includes(selectedTab) ? tabs[tabs.length - 1] : selectedTab) ? 'text-primary' : 'text-gray-300 dark:text-gray-400 dark:md:text-gray'
            }`}
          >
            {tabs?.includes(selectedTab) ? tabs[tabs.length - 1] : selectedTab}
          </div>
          <div className="px-[3px] relative group">
            <Icon name="chevron-left" size={16} className="cursor-pointer text-gray-300 dark:text-gray-400 dark:md:text-gray -rotate-90" />
            <div className={twMerge(
              "invisible opacity-0 group-hover:opacity-100 group-hover:visible",
              "w-[110px] rounded-lg text-sm whitespace-nowrap border border-transparent",
              "absolute top-4 -right-6 bg-white dark:bg-[rgb(30,35,41)] shadow z-50 font-medium ",
            )}>
              {
                stopTabs.map((tab, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedTab(tab)}
                    className="py-3 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-black-500 flex items-center justify-center hover:text-primary-100"
                  >
                    {tab}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="group relative ml-auto">
          <Icon
            name="info"
            size={16}
            className="text-gray-300 dark:text-gray cursor-help"
          />
         <HelpText className="-left-20" arrowClass="left-[200px]">Trailing Stop orders allow traders to send a pre-set order to the market when a market swing takes place. When the latest Market Price/Mark Price reaches the highest/lowest price (1 ± Callback Rate) after an order is submitted, this triggers the order to be executed as a market order. Learn More</HelpText>
        </div>
      </div>
    </>
  )
}