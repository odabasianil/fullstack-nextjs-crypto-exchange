import { AccountSidebar } from "@/views/account/sidebar";
import { headers } from "next/headers";
import { twMerge } from "tailwind-merge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestUrl = headers().get("x-pathname") as string;

  return (
    <>
      <div className="">
        <div className="lg:flex">
          {!requestUrl?.includes('withdrawal') && <AccountSidebar />}
          <div className={twMerge(
            "w-full mx-auto lg:pt-6 lg:mb-20 lg:min-h-screen bg-white dark:bg-[#181E25] lg:dark:bg-transparent",
          )}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
