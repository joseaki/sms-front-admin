import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const userSlice = createSlice({
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
    success(state) {
      state.loading = false;
      state.success = true;
      state.error = '';
    },
    addUser(state, action: PayloadAction<User>) {
      state.userList.push(action.payload);
    },
    setUsersList(state, action: PayloadAction<User[]>) {
      state.userList = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      const userIdx = state.userList.findIndex(
        (user) => user.id === action.payload.id,
      );
      state.userList[userIdx] = action.payload;
    },
    deleteUser(state, action: PayloadAction<number>) {
      const newList = state.userList.filter(
        (user) => user.id !== action.payload,
      );
      state.userList = newList;
    },
  },
});

export const { error, loading } = userSlice.actions;

export default userSlice.reducer;
