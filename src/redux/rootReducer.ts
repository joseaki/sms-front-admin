/* eslint-disable import/no-cycle */
import { combineReducers } from '@reduxjs/toolkit';
import todos from 'redux/todoSlice';
import users from 'redux/userSlice';
import { reducer as formReducer } from 'redux-form';
import visibilityFilter from 'redux/visibilityFilterSlice';

const rootReducer = combineReducers({
  todos,
  users,
  visibilityFilter,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
