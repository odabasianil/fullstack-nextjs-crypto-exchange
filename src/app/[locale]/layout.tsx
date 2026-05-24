import "@/assets/globals.scss";
import ReduxProvider from "@/core/store/redux.provider";
import { headers } from "next/headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const theme = headers().get('x-theme') || 'dark';
  const language = headers().get('x-language') || 'en'; // Varsayılan dil

  return (
    <html lang={language} className={theme || 'dark'}>
      <body className='font-sans bg-white text-black-100 dark:text-white-100 dark:bg-background'>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
