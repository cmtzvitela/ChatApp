import { createAction } from '@reduxjs/toolkit';

export const sagasLogin = createAction('sagas/login');
export const sagasSearch = createAction('sagas/search');
export const sagasConversation = createAction('sagas/conversation');
export const sagasGroupParticipants = createAction('sagas/groupParticipants');
export const sagasChatMessages = createAction('sagas/chatMessages');
