import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas.js';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export default configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);
