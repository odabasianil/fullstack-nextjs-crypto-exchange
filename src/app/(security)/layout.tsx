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
          <div className="lg:px-8 sm:px-6 sm:h-[72px] px-4 w-full max-w-[1280px] h-[56px] flex mx-auto">
            <Link
              className="text-black-300 hover:text-white-100 flex items-center"
              href="/me/security"
            >
              <Icon name="chevron-left" className="mr-1" size={20} />
              Security
            </Link>
          </div>
          <div className="xl3:px-0 md:px-10 sm:pb-12 sm:px-4 max-w-[1200px] w-full mx-auto grow flex flex-col flex-1">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
