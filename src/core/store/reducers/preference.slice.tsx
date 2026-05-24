import i18n from "@/i18n";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
export interface IPreferenceState {
    language?: string;
    fiatCurrency?: string;
    theme?: string;
}

export interface PreferenceState {
    language?: string;
    fiatCurrency?: string;
    theme?: string;
}

function InitialState(): IPreferenceState {
    const _language = getCookie("language");
    const _theme = getCookie("theme");
    const _fiatCurrency = getCookie("fiatCurrency");

      const newPreference: PreferenceState = {
        fiatCurrency: _fiatCurrency,
        language: _language,
        theme: _theme,
      };
      return newPreference;
}

export const preferenceSlice = createSlice({
  name: "preference",
  initialState: InitialState(),
  reducers: {
    SetPreference: (state, action: PayloadAction<PreferenceState>) => {
        state.language = action.payload.language;
        state.fiatCurrency = action.payload.fiatCurrency;
        state.theme = action.payload.theme;
        i18n.changeLanguage(action.payload.language);
    }
  },
});

export const { SetPreference } = preferenceSlice.actions;
export const preferenceReducer = preferenceSlice.reducer;