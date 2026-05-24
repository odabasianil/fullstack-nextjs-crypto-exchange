import type { Metadata } from "next";
import { Header } from "@/views/header/index";
import { Footer } from "@/views/footer";
import { cookies, headers } from "next/headers";
import { store } from "@/core/store/store";

export const metadata: Metadata = {
  title: "FAZ 3 - Bitcoin, Ethereum ve Altcoin'ler için Kripto Para Borsası",
  description: "FAZ 3, 180'den fazla ülkede 185 milyondan fazla kullanıcıya hizmet veren, alım satım hacmi bazında en büyük kripto para borsasıdır. Listelenen 350'den fazla Altcoin ile dünyanın önde gelen kripto borsasıdır.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestUrl = headers().get("x-pathname") as string;
  const isReferral = requestUrl.includes("/referral");

  return (
    <>
      <Header />
        <div className="pt-16 md:pt-[60px]">
          {children}
        </div>
      <Footer isMobileHidden={isReferral} />
    </>
  );
}

