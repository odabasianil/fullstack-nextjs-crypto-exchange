export const CallPutCard = () => {

  const getCurrentFormattedDate = () => {
    const date = new Date();
    
    const day = String(date.getDate()).padStart(2, '0'); // 14
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 11
    const hours = String(date.getHours()).padStart(2, '0'); // 14
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 29
  
    return `${day}-${month} ${hours}:${minutes}`;
  }

  return (
    <div className="w-full h-full py-4 px-6 border border-[rgb(234,236,239)] dark:border-gray-300 rounded-lg">
      <div className="flex justify-between items-center mb-[22px]">
        <div>Open Interest: Call vs Put</div>
        <div className="text-gray-300 dark:text-gray text-sm">{getCurrentFormattedDate()}</div>
      </div>
      <div className="w-full h-[26px] relative">
        <div className="w-[calc(67.81%)] absolute left-0 h-full top-0 overflow-hidden rounded-l-full" style={{background: 'linear-gradient(90deg, rgba(46, 189, 133, 0), rgb(46, 189, 133))'}}>
          <span className="font-medium text-xs text-[rgb(71,77,87)] dark:text-[rgb(183,189,198)]">67.81%</span>
        </div>
        <div className="absolute flex items-center justify-center left-[max(min(67.81%-15px,100%-10px),-10px)] z-10 rounded-full bg-[rgb(50,217,147)] h-[30px] w-[30px] text-center -top-0.5">
          C
        </div>
        <div className="flex items-center justify-end w-[calc(32.19%)] text-right absolute right-0 h-full top-0 overflow-hidden rounded-r-full" style={{background: 'linear-gradient(270deg, rgba(246, 70, 93, 0), rgb(246, 70, 93))'}}>
          <span className="font-medium text-xs text-[rgb(71,77,87)] dark:text-[rgb(183,189,198)]">32.19%</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between mt-[18px]">
        <div className="flex items-center justify-between flex-[0_0_calc(50%-12px)] mb-1">
          <div className="text-success text-sm">Call</div>
          <div className="text-gray-300 dark:text-gray-100 text-sm">1,281,850,244.27 USDT</div>
        </div>
        <div className="flex items-center justify-between flex-[0_0_calc(50%-12px)] mb-1">
          <div className="text-error text-sm">Put</div>
          <div className="text-gray-300 dark:text-gray-100 text-sm">608,611,079.02 USDT</div>
        </div>

      </div>
      <div className="my-6 w-full h-[1px] bg-[rgb(234,236,239)] dark:bg-[rgb(43,49,57)]" />
      <div className="flex justify-between items-center mb-[22px]">
        <div>24hr Volume: Call vs Put</div>
        <div className="text-gray-300 dark:text-gray text-sm">{getCurrentFormattedDate()}</div>
      </div>
      <div className="w-full h-[26px] relative">
        <div className="w-[calc(43.41%)] absolute left-0 h-full top-0 overflow-hidden rounded-l-full" style={{background: 'linear-gradient(90deg, rgba(46, 189, 133, 0), rgb(46, 189, 133))'}}>
          <span className="font-medium text-xs text-[rgb(71,77,87)] dark:text-[rgb(183,189,198)]">43.41%</span>
        </div>
        <div className="absolute flex items-center justify-center left-[max(min(43.41%-15px,100%-10px),-10px)] z-10 rounded-full bg-[rgb(255,112,126)] h-[30px] w-[30px] text-center -top-0.5">
          P
        </div>
        <div className="flex items-center justify-end w-[calc(56.59%)] text-right absolute right-0 h-full top-0 overflow-hidden rounded-r-full" style={{background: 'linear-gradient(270deg, rgba(246, 70, 93, 0), rgb(246, 70, 93))'}}>
          <span className="font-medium text-xs text-[rgb(71,77,87)] dark:text-[rgb(183,189,198)]">56.59%</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between mt-[18px]">
        <div className="flex items-center justify-between flex-[0_0_calc(50%-12px)] mb-1">
          <div className="text-success text-sm">Call</div>
          <div className="text-gray-300 dark:text-gray-100 text-sm">1,281,850,244.27 USDT</div>
        </div>
        <div className="flex items-center justify-between flex-[0_0_calc(50%-12px)] mb-1">
          <div className="text-error text-sm">Put</div>
          <div className="text-gray-300 dark:text-gray-100 text-sm">608,611,079.02 USDT</div>
        </div>

      </div>
  </div>
  )
}