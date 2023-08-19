// store.ts
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import rootReducer from './reducers';
import { setTokens } from './actions/authActions';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

store.subscribe(() => {
  const state: RootState = store.getState();
  const { accessToken, refreshToken } = state.auth;

  if (accessToken && refreshToken) {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
  }
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export { store, persistor, setTokens };
