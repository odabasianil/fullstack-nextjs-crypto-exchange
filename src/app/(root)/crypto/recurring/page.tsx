import { Icon } from "@/components/ui/icon";
import RecurringHeader from "@/views/crypto/recurring/header";
import RecurringContentView from "@/views/crypto/recurring/recurring-content";
import RecurringMainView from "@/views/crypto/recurring/recurring-main";

export default function CryptoDeposit() {
  return (
   <>
   <RecurringHeader />
   <RecurringMainView/>
   <RecurringContentView/>
   </>
  );
}
