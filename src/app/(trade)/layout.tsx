import { Header } from "@/views/header/index";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
        {children}
    </>
  );
}
