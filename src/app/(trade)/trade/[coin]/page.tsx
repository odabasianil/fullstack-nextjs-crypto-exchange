import { PageProps } from "@/types/page-props";
import { TradeView } from "@/views/trade";

export default function TradePage({
  params,
}: PageProps) {
  const coins = params.coin?.split('_');

  return (
    <TradeView coins={coins} />
  )
}