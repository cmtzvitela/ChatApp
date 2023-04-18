import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: {},
    loggedIn: false,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.profile = payload;
      state.loggedIn = true;
    },
    setUserSearch: (state, { payload }) => {
      state.search = payload;
    },
    logOut: (state) => {
      state.profile = null;
      state.loggedIn = false;
    },
  },
});

export const { setUser, logOut, setUserSearch } = userSlice.actions;

export default userSlice.reducer;
