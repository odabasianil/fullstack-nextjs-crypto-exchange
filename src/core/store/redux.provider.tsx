"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { injectStore } from "../services/webservice";
import { userService } from "../services/auth/user.service";
import { UpdateUser } from "./reducers/user.slice";
import { useEffect, useState } from "react";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  injectStore(store);

  let isLoaded = false;

  useEffect(() => {
    if (isLoaded) return;
    isLoaded = true;
    const _session = store.getState().auth.session;
    const _user = store.getState().user.user;

    if (_session && !_user) {
      userService.userMe().then((res) => {
        if (res.success) {
          store.dispatch(UpdateUser(res.data));
          console.log("User updated");
        }
      });
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
