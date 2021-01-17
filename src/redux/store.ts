import { configureStore, Action, EnhancedStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import rootReducer, { RootState } from 'redux/rootReducer';

// interface Props {
//   initialState?: any;
// }
// let store: EnhancedStore;
// export const storeConfig = ({ initialState }: Props) => {
//   store = configureStore({
//     reducer: rootReducer,
//     preloadedState: initialState,
//   });

//   if (process.env.NODE_ENV === 'development' && module.hot) {
//     module.hot.accept('./rootReducer', () => {
//       // eslint-disable-next-line global-require
//       const newRootReducer = require('./rootReducer').default;
//       store.replaceReducer(newRootReducer);
//     });
//   }

//   return store;
// };
// export type AppDispatch = typeof store.dispatch;
// export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

let customStore: EnhancedStore;
interface ConfigProps {
  initialState?: any;
}
export class Store {
  static store: EnhancedStore;

  static config({ initialState }: ConfigProps) {
    this.store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    });

    if (process.env.NODE_ENV === 'development' && module.hot) {
      module.hot.accept('./rootReducer', () => {
        // eslint-disable-next-line global-require
        const newRootReducer = require('./rootReducer').default;
        this.store.replaceReducer(newRootReducer);
      });
    }
    customStore = this.store;
    return this.store;
  }
}

export type AppDispatch = typeof customStore.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
