import { AuthFooter } from "@/views/auth/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="dark:bg-background-500 md:dark:bg-background h-screen flex flex-col flex-grow">
        {children}
        <AuthFooter />
      </div>
    </>
  );
}
