import { userLogin, searchUser } from '../services/userServices.js';
import {
  setUser,
  setUserSearch,
  setActiveConversation,
  setGroupChatParticipants,
  setChatMessages,
} from './userSlice.js';
import { call, takeEvery, put, all } from 'redux-saga/effects';
import {
  sagasConversation,
  sagasGroupParticipants,
  sagasLogin,
  sagasSearch,
  sagasChatMessages,
} from './sagaActions.js';

export function* userLoginSaga(action) {
  try {
    let user = yield call(userLogin, action.payload.email, action.payload.password);
    console.log('userSaga', user);
    yield put(setUser(user));
  } catch (e) {
    yield put({ type: 'USER_LOGIN_FAILED' });
  }
}

export function* userSearchSaga(action) {
  try {
    let userArray = yield call(searchUser, action.payload.username);
    console.log(userArray);
    yield put(setUserSearch(userArray));
  } catch (e) {
    yield put({ type: 'USER_NOT_FOUND' });
  }
}

export function* activeConversationSaga(action) {
  console.log('🚀 ~ action:', action.payload);
  yield put(setActiveConversation(action.payload));
}

export function* groupChatParticipants(action) {
  console.log('🚀 ~ action groupPart:', action);
  yield put(setGroupChatParticipants(action.payload));
}

export function* chatMessages(action) {
  yield put(setChatMessages(action.payload));
}

export function* watchUserLogin() {
  yield takeEvery(sagasLogin, userLoginSaga);
}
export function* watchUserSearch() {
  yield takeEvery(sagasSearch, userSearchSaga);
}

export function* watchActiveConversation() {
  yield takeEvery(sagasConversation, activeConversationSaga);
}

export function* watchGroupParticipants() {
  yield takeEvery(sagasGroupParticipants, groupChatParticipants);
}
export function* watchChatMessages() {
  yield takeEvery(sagasChatMessages, chatMessages);
}

export default function* rootSaga() {
  yield all([watchUserLogin(), watchActiveConversation(), watchGroupParticipants(), watchChatMessages()]);
}
