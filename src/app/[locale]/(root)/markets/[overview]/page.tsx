import { PageProps } from "@/types/page-props";
import { MarketsOverviewView } from "@/views/markets/overview";

export default function MarketsOverview({
  params,
}: PageProps) {

  return (
    <div className="px-4 md:px-0">
      <MarketsOverviewView path={params.overview} />
    </div>
  )
}