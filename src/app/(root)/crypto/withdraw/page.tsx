import DepositMainView from "@/views/crypto/deposit";
import WithdrawHeader from "@/views/crypto/withdraw/header";

export default function CryptoWithdraw() {
  return (
    <div className="container max-w-[1200px] px-0">
      <WithdrawHeader />
      <DepositMainView />
    </div>
  );
}
