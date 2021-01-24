import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../Domain/Entity/user';

interface IUserState {
  user: User | null;
  userList: User[];
}

const initialState: IUserState = {
  user: null,
  userList: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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

// export const { addUser } = userSlice.actions;
export default userSlice.reducer;
