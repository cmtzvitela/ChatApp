import { userLogin, searchUser } from '../services/userServices.js';
import { setUser, setUserSearch } from './userSlice.js';
import { call, takeEvery, put, all } from 'redux-saga/effects';
import { sagasLogin, sagasSearch } from './sagaActions.js';

export function* userLoginSaga(action) {
  console.log('action', action);
  try {
    let user = yield call(userLogin, action.payload.email, action.payload.password);
    console.log('user', user);
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

export function* watchUserLogin() {
  yield takeEvery(sagasLogin, userLoginSaga);
}
export function* watchUserSearch(){
  yield takeEvery(sagasSearch, userSearchSaga);
}

export default function* rootSaga() {
  yield all([watchUserLogin()]);
}
