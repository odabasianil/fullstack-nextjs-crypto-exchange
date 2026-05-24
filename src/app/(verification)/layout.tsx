import { Header } from "@/views/header/index";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="pt-16 md:pt-[60px]">
        {children}
      </div>
    </>
  );
}
