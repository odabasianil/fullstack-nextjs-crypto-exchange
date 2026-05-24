import { Icon } from "@/components/ui/icon";
import { Header } from "@/views/header/index";
import Link from "next/link";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="h-[100vh]">
        <div className="flex flex-col h-full">
          <Header isSecurityHeader={true} />
          <div className="xl3:px-0 md:px-10 sm:pb-12 sm:px-4 max-w-[1200px] w-full mx-auto grow flex flex-col flex-1">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
