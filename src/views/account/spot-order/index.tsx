import { AccountOpenOrdersTable } from "./open-orders"
import { AccountHistoryTable } from "./order-history"
import { SpotOrderTabs } from "./tabs"

const tabs = [
  {
    text: 'Open Orders',
    value: '/me/orders/exchange/openorder',
  },
  {
    text: 'Order History',
    value: '/me/orders/exchange/tradeorder',
  },
  {
    text: 'Trade History',
    value: '/me/orders/exchange/usertrade',
  },
]


export const AccountSpotOrder = ({table}: {table: string}) => {


  return (
    <>
      <SpotOrderTabs
        tabs={tabs}
        activeTab={`/me/orders/exchange/${table}`}
      />
      {table === 'tradeorder' && (<div className=""><AccountHistoryTable isTradeOrder /></div>)}
      {table === 'usertrade' && (<div className=""><AccountHistoryTable /></div>)}
      {table === 'openorder' && (<div className=""><AccountOpenOrdersTable /></div>)}
    
    </>
  )
}
