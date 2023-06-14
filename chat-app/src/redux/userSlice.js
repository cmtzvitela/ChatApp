import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: {},
    loggedIn: false,
    activeConversation: '',
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
    setActiveConversation: (state, { payload }) => {
      console.log('🚀 ~ payload:', payload);
      state.activeConversation = payload;
    },
    setGroupChatParticipants: (state, { payload }) => {
      console.log('🚀 ~ payload participant:', payload);
      state.groupChatParticipants = payload;
    },
    setChatMessages: (state, { payload }) => {
      console.log('🚀 ~ payload messages:', payload);
      state.chatMessages = payload;
    },
  },
});

export const { setUser, logOut, setUserSearch, setActiveConversation, setGroupChatParticipants, setChatMessages } =
  userSlice.actions;

export default userSlice.reducer;
