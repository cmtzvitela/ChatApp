import { userLogin } from '../services/userServices.js';
import { setUser } from './userSlice.js';
import { call, takeEvery, put, all } from 'redux-saga/effects';
import { sagasLogin } from './sagaActions.js';

export function* userLoginSaga(action) {
  console.log("action",   action);
  try {
    let user = yield call(userLogin, action.payload.email, action.payload.password);
    console.log("user", user);
    yield put(setUser(user));
  } catch (e) {
    yield put({ type: 'USER_LOGIN_FAILED' });
  }
}

export function* watchUserLogin() {
  yield takeEvery(sagasLogin, userLoginSaga);
}

export default function* rootSaga() {
  yield all([watchUserLogin()]);
}
