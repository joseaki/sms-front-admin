import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from 'Root';
import { saveUserService } from 'Domain/Services/user';
import { User } from '../Domain/Entity/user';

interface IUserState {
  loading: boolean;
  success: boolean;
  error: string;
  user: User | null;
  userList: User[];
}

const initialState: IUserState = {
  loading: false,
  success: false,
  error: '',
  user: null,
  userList: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loading(state) {
      state.loading = true;
      state.success = false;
      state.error = '';
    },
    error(state) {
      state.loading = false;
      state.success = false;
      state.error = 'error';
    },
    saveUSer(state, action: PayloadAction<User>) {
      state.loading = false;
      state.success = true;
      state.error = '';
      state.userList.push(action.payload);
    },
  },
});

export const saveUser = (values: any): AppThunk => (
  dispatch: AppDispatch,
): Promise<Action> => {
  return new Promise((resolve) => {
    const newUser: User = {
      username: values.username,
      password: values.password,
    };
    dispatch(userSlice.actions.loading());
    saveUserService(newUser)
      .then(() => {
        dispatch(userSlice.actions.saveUSer(newUser));
        resolve();
      })
      .catch(() => {
        dispatch(userSlice.actions.error());
      });
  });
};

export const { error, loading } = userSlice.actions;

export default userSlice.reducer;
