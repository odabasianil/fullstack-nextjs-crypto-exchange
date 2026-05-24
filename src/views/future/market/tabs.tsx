import tabs from '@/data/futures/market-tabs.json';
import { twMerge } from 'tailwind-merge';

export const MarketTabs = (props: any) => {
  const { selectedTab, selectedSubTab, setSelectedTab, setSelectedSubTab } = props;
  const activeTab = tabs.find((tab) => tab.value === selectedTab);
  const activeSubTab = activeTab?.subTabs.find((subTab) => subTab.value === selectedSubTab);

  return (
    <>
     <div className='flex items-center justify-between border-b border-b-gray-300 dark:border-b-secondary px-4 mb-3'>
        <div className='flex items-center gap-4'>
          {
            tabs.map((tab) => (
              <div
                key={tab.value}
                onClick={() => setSelectedTab(tab.value)}
                className={twMerge(
                  "text-sm cursor-pointer text-gray-300 dark:text-gray h-[38px] flex items-center relative font-semibold ",
                  selectedTab === tab.value && " text-black-100 dark:text-white-100"
                )}
              >
                {tab.name}
                {selectedTab === tab.value && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-4 bg-primary"></div> }
              </div>
            ))
          }
        </div>
        <div className='text-sm'>All</div>
      </div>
      <div className='mb-3 flex items-center px-4 overflow-x-auto no-scrollbar'>
        {
          activeTab?.subTabs?.map((subTab) => (
            <div
              key={subTab.value}
              onClick={() => setSelectedSubTab(subTab.value)}
              className={twMerge(
                "text-xs cursor-pointer text-gray-300 dark:text-gray flex items-center relative font-semibold py-0.5 px-2 leading-5 rounded-md whitespace-nowrap",
                selectedSubTab === subTab.value && " text-black-100 dark:text-white-100 bg-gray-300 dark:bg-secondary"
              )}
            >
              {subTab.name}
            </div>
          ))
        }
      </div>
    </>
  )
}