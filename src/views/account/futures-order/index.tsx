import { FuturesFundingFeeHistory } from "./tables/funding-fee-history"
import { FuturesOpenOrder } from "./tables/open-order"
import { FuturesOrderHistory } from "./tables/order-history"
import { FuturesPositionHistory } from "./tables/position-history"
import { FuturesTradeHistory } from "./tables/trade-history"
import { FuturesTransactionHistory } from "./tables/transaction-history"
import { FuturesOrderTabs } from "./tabs"

const tabs = [
  {
    text: 'Open Orders',
    value: '/me/orders/futures/openorder',
  },
  {
    text: 'Order History',
    value: '/me/orders/futures/tradeorder',
  },
  {
    text: 'Trade History',
    value: '/me/orders/futures/tradehistory',
  },
  {
    text: 'Transaction History',
    value: '/me/orders/futures/transactionhistory',
  },
  {
    text: 'Position History',
    value: '/me/orders/futures/positionhistory',
  },
  {
    text: 'Funding Fee',
    value: '/me/orders/futures/fundingfeehistory',
  }
]


export const FuturesOrderView = ({table}: {table: string}) => {


  return (
    <>
      <FuturesOrderTabs
        tabs={tabs}
        activeTab={`/me/orders/futures/${table}`}
      />
      {table === 'openorder' && <FuturesOpenOrder />}
      {table === 'tradeorder' && <FuturesOrderHistory />}
      {table === 'tradehistory' && <FuturesTradeHistory />}
      {table === 'transactionhistory' && <FuturesTransactionHistory />}
      {table === 'positionhistory' && <FuturesPositionHistory />}
      {table === 'fundingfeehistory' && <FuturesFundingFeeHistory />}
    </>
  )
}