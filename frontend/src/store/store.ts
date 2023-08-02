// store.ts
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

store.subscribe(() => {
  const state = store.getState();
  const { token } = state.auth;

  if (token) {
    sessionStorage.setItem('token', token);
  }
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export { store, persistor };
