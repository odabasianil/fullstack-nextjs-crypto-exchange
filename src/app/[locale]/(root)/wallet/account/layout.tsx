
import { WithdrawSidebar } from "@/views/account/crypto/sidebar";
import { headers } from "next/headers";
import { twMerge } from "tailwind-merge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <div className="">
        <div className="md:flex">
          <WithdrawSidebar />
          <div className={twMerge(
            "w-full mx-auto pt-6 px-4 pb-10 lg:mb-20 md:min-h-screen bg-white dark:bg-[#181E25] md:dark:bg-transparent lg:max-w-[1064px]",
          )}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
