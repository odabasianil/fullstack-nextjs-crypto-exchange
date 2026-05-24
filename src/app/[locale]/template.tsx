'use client';

import { ToastProvider } from '@/components/ui/toast';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from "../../i18n";
import { store } from '@/core/store/store';
import { SetPreference } from '@/core/store/reducers/preference.slice';
import { usePathname } from 'next/navigation';

export default function RootTemplate({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const theme = getCookie('theme');
  const fiatCurrency = getCookie('fiatCurrency');
  const locale = pathname?.split('/')?.[1];

  useEffect(() => {
    const _theme = localStorage.getItem('theme');

    if (!_theme || _theme === 'dark') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }

    i18n.changeLanguage(locale || 'en');
  }, [])
  
  store.dispatch(SetPreference({ language: locale, fiatCurrency, theme }));

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </I18nextProvider>
    </>
  );
}
