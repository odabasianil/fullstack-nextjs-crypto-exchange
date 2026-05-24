import "@/assets/globals.scss";
import ReduxProvider from "@/core/store/redux.provider";
import { headers } from "next/headers";

export const generateStaticParams = () => {
  return ['en', 'tr'].map((lng) => ({ locale: lng }));
};


export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const theme = headers().get('x-theme') || 'dark';

  return (
    <html lang={locale} className={theme || 'dark'} >
      <body className='font-sans bg-white text-black-100 dark:text-white-100 dark:bg-background'>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
