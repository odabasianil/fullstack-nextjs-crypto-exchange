import { PageProps } from "@/types/page-props";
import { BuyCouponsView } from "@/views/buy-coupons/buy-coupons-view";
import { CoinPaymentView } from "@/views/coin-payment/coin-payment-view";


export default function Page({ params}: PageProps) {
  return (
    <div className="container max-w-[1200px] px-0">
      {params?.coin?.length === 1 && <BuyCouponsView/>}
      {params?.coin?.length === 2 && 
      <div className="min-h-[80vh] flex items-center justify-center">
          <CoinPaymentView />
        </div>}
    </div>
  );
}
