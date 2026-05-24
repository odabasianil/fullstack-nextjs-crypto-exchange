import { CryptoContentView } from "@/views/crypto/buy/crypto-content";
import { CryptoMainView } from "@/views/crypto/buy/crypto-main";

export default function CryptoBuy({ params }: any) {
  return (
    <div className="container max-w-[1200px] px-0">
      <>
        <CryptoMainView />
        <CryptoContentView />
      </>
    </div>
  );
}
