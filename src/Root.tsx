import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { configureStore, Action, EnhancedStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import rootReducer, { RootState } from './redux/rootReducer';

interface Props {
  children: ReactNode;
  initialState?: any;
}
let store: EnhancedStore;
export default ({ children, initialState }: Props) => {
  store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./redux/rootReducer', () => {
      // eslint-disable-next-line global-require
      const newRootReducer = require('./redux/rootReducer').default;
      store.replaceReducer(newRootReducer);
    });
  }

  return <Provider store={store}>{children}</Provider>;
};

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
