//import { createStore, applyMiddleware } from "redux";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
//import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './root.reducer';
import rootSaga from './root.saga';

// const sagaMiddleware = createSagaMiddleware();
// const middlewares = [sagaMiddleware];

// if (process.env.NODE_ENV === "development") {
//   middlewares.push(logger);
// }

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

// sagaMiddleware.run(rootSaga);

const configureAdminStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  // sagaMiddleware: Makes redux-sagas work
  const middlewares = [sagaMiddleware, logger];

  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({ thunk: false }), ...middlewares],
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export const store = configureAdminStore();

export const persistor = persistStore(configureAdminStore());
