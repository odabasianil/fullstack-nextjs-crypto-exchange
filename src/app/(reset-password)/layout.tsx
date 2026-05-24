import { ForgotPasswordHeader } from "@/views/auth/forgot-password/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="dark:bg-background-500 md:dark:bg-background h-screen flex flex-col flex-grow">
        <ForgotPasswordHeader />
        {children}
        <div className="flex items-center justify-center text-gray-300 dark:text-gray-100">
          <div className="py-3 px-4 text-center text-xs">
            FAZ 3 © 2024
          </div>
          <div className="py-3 px-4 text-center text-xs">
            Çerez Tercihleri
          </div>
        </div>
      </div>
    </>
  );
}
