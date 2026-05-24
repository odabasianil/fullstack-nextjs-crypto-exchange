import { User } from "@/core/models/auth/models/user.model";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IUserState {
    user: User | null;
}

const initialState: IUserState = {
    user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SetUser: (state, action: PayloadAction<User>) => {
        state.user = action.payload;
    },
    UpdateUser: (state, action: PayloadAction<User>) => {
        state.user = {
            ...state.user,
            ...action.payload,
        }
    },
    RemoveUser: (state) => {
        state.user = null;
    }
  },
});

export const { SetUser, RemoveUser, UpdateUser } = userSlice.actions;
export const userReducer = userSlice.reducer;