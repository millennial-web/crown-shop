import { compose, createStore, applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer } from './root-reducer'

import { logger } from 'redux-logger'

const middleWares = [
  process.env.NODE_ENV === 'development' && logger, 
].filter(Boolean);

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer, 
  undefined, 
  composedEnhancers
);

export const persistor = persistStore(store);
