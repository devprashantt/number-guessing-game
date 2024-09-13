import { createSlice } from "@reduxjs/toolkit";

import SLICE_NAMES from "../../constants/slices";

const initialState = localStorage.getItem(SLICE_NAMES.USER)
  ? JSON.parse(localStorage.getItem(SLICE_NAMES.USER) || "")
  : null;

const userSlice = createSlice({
  name: SLICE_NAMES.USER,
  initialState,
  reducers: {
    setUser: (state: any, actions: any) => {
      // set local storage
      localStorage.setItem(SLICE_NAMES.USER, JSON.stringify(actions.payload));

      // save to browser cookie
      document.cookie = `user=${JSON.stringify(actions.payload)}; expires=${new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24 * 365,
      ).toUTCString()}; path=/`;

      // set state
      return {
        ...state,
        ...actions.payload,
      };
    },

    logoutUser: (state) => {
      // remove local storage
      localStorage.removeItem(SLICE_NAMES.USER);

      // remover high score
      localStorage.removeItem(`highest_score`);

      // remove browser cookie
      document.cookie = `user=; expires=${new Date(0).toUTCString()}; path=/`;

      // set state
      return null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
