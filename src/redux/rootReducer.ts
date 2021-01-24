/* eslint-disable import/no-cycle */
import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from 'redux/userSlice';
import generalReducer from 'redux/generalSlice';

const rootReducer = combineReducers({
  general: generalReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
