import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoginResult } from "../../models/auth/responsemodel/loginresponse.model";
import { getCookie } from "cookies-next";
export interface IAuthState {
    session: LoginResult | null;
}

function InitialState(): IAuthState {
    const userCookie = getCookie("user");

    if (userCookie) {
      const newSession: LoginResult = {
        require2FA: {
          required2FA: false,
          actionID: 0,
          require2FAType: "",
          description: "",
        },
        roleList: [],
        sessionID: 0,
        sessionToken: userCookie,
        userID: 0,
      };
      return {session: newSession};
    }
    return {
        session: null,
    };
}

export const authSlice = createSlice({
  name: "auth",
  initialState: InitialState(),
  reducers: {
    SetSession: (state, action: PayloadAction<LoginResult>) => {
        state.session = action.payload;
    },
    UpdateSession: (state, action: PayloadAction<LoginResult>) => {
        state.session = {
            ...state.session,
            ...action.payload,
        }
    },
    RemoveSession: (state) => {
        state.session = null;
    }
  },
});

export const { SetSession, RemoveSession, UpdateSession } = authSlice.actions;
export const authReducer = authSlice.reducer;