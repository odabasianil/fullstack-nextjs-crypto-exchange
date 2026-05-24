"use client";

import { useEffect } from "react";
import { ToastProvider } from "@/components/ui/toast";
import { I18nextProvider } from "react-i18next";
import { SetPreference } from "@/core/store/reducers/preference.slice";
import { getCookie } from "cookies-next";
import i18n from "../i18n";
import { injectStore } from "@/core/services/webservice";
import { store } from "@/core/store/store";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = getCookie("theme");
  const language = getCookie("language") || "en"; // Varsayılan dil
  const fiatCurrency = getCookie("fiatCurrency");

  // İlk yüklemede, dil ayarını kontrol et
  useEffect(() => {
    const lang = language || "tr";
    i18n.changeLanguage(lang);
  }, []);

  store.dispatch(SetPreference({ language, fiatCurrency, theme }));

  useEffect(() => {
    const _theme = localStorage.getItem("theme");

    if (!_theme || _theme === "dark") {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <ToastProvider>{children}</ToastProvider>
      </I18nextProvider>
    </>
  );
}
