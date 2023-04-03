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
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
