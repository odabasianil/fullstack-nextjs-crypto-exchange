import Image from "next/image";
import { twMerge } from "tailwind-merge";

export const AuthCard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <div className={
      twMerge(
        "w-full bg-transparent",
        "md:border border-white-100 md:dark:border-secondary md:rounded-3xl md:p-10",
        "md:w-[425px] md:min-h-[580px]"
      )}
    >
      <div className="mt-3 mb-7 md:mt-0 md:mb-8">
        <Image src="/images/logo/logo-big-black.png" width={100} height={28} alt="FAZ 3 Logo" className="dark:hidden" />
        <Image src="/images/logo/logo-big.png" width={100} height={28} alt="FAZ 3 Logo" className="hidden dark:block" />
        </div>
      {children}
    </div>
  )
}