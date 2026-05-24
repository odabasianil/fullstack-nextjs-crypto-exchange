'use client'

import { Button } from "@/components/ui/button"
import Select from "@/components/ui/select"
import { OrderHistory } from "@/views/tables/order-history"
import { useState } from "react"
import DatePicker from "react-datepicker"
import { TableControls } from "./table-controls"


export const AccountHistoryTable = ({isTradeOrder=false}: {isTradeOrder?: boolean}) => {
  const [base, setBase] = useState('all')
  const [quote, setQueto] = useState('all')
  const [side, setSide] = useState('all')
  const [sortBy, setSortBy] = useState('order_time')
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());


  return (
    <>
      <TableControls
        base={base}
        setBase={setBase}
        quote={quote}
        setQueto={setQueto}
        side={side}
        setSide={setSide}
        sortBy={sortBy}
        setSortBy={setSortBy}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {isTradeOrder ? <OrderHistory isAccount /> : <OrderHistory isAccount />}
    </>
  )
}