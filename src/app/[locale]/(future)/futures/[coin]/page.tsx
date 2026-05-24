import { PageProps } from "@/types/page-props";
import { FutureView } from "@/views/future";

export default function TradePage({
  params,
}: PageProps) {
  const coins = params.coin?.split('_');

  return (
    <FutureView coins={coins} />
  )
}