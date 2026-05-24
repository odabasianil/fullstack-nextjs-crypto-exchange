
import data from "@/data/recurring/recurring-main/select-asset-2.json";
import paymentData from "@/data/payment/payment.json";
import DepositFiat from "./deposit-fiat";
import { HowItWorks } from "@/components/ui/how-it-works";
import SideBarContent from "./sidebar-content";

const DepositMainView = () => {
  return (
    <div className="flex-1">
      <div className="flex md:flex-row justify-between flex-col px-4 lg:min-w-[calc(100vh-64px)] relative md:px-6 xl2:px-0 md:pt-6 pt-4">
       <DepositFiat data={data}/>
       <SideBarContent/>
      </div>
    </div>
  );
};

export default DepositMainView;
