import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { NoResult } from "@/views/crypto/payment/no-result";


export default function Page() {


  return (
    <div className="w-full mx-auto !max-w-full lg:px-8">
      <div className="p-[28px]">
        <div className="flex items-center justify-between">
          <div className="text-2xl md:text-[32px] leading-10 font-semibold">Financial Reports</div>
          <Button
            appearance="secondary"
            className="text-sm h-8 px-3 flex gap-2 justify-between items-center"
          >
            <Icon name="refresh" size={14} className="mt-0.5" />
            Refresh
          </Button>
        </div>
        <NoResult
          text="There are no documents generated for you at this time."
          imageClass="mb-1 mt-10"
          textClass="text-left"
        />
      </div>
    </div>
  )

}
