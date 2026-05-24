import { FuturesOrderView } from "@/views/account/futures-order";

export default function Page() {
  return (
    <div className="!max-w-full lg:px-8 mx-auto w-full">
      <FuturesOrderView table={'openorder'} />
    </div>
  )
}