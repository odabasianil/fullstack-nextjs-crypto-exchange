import DepositMainView from "@/views/crypto/deposit";
import DepositHeader from "@/views/crypto/deposit/header";

export default function CryptoRecurring() {
  return (
    <div className="container max-w-[1200px] px-0">
      <DepositHeader/>
      <DepositMainView/>
    </div>
  );
}
