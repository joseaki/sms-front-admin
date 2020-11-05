import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from 'Root';
import {
  saveUserService,
  getUsersByQueryService,
  getAPIKeyService,
  deleteUserService,
  changePasswordService,
} from 'Domain/Services/user';
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
    success(state) {
      state.loading = false;
      state.success = true;
      state.error = '';
    },
    saveUser(state, action: PayloadAction<User>) {
      state.userList.push(action.payload);
    },
    searchUsers(state, action: PayloadAction<User[]>) {
      state.userList = action.payload;
    },
    getAPIKey(state, action: PayloadAction<User>) {
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

export const saveUser = (values: any): AppThunk => (
  dispatch: AppDispatch,
): Promise<Action> => {
  return new Promise((resolve) => {
    const newUser: User = {
      id: -1,
      username: values.username,
      password: values.password,
    };
    dispatch(userSlice.actions.loading());
    saveUserService(newUser)
      .then((savedUser) => {
        dispatch(userSlice.actions.saveUser(savedUser));
        dispatch(userSlice.actions.success());
        resolve();
      })
      .catch(() => {
        dispatch(userSlice.actions.error());
      });
  });
};

export const searchUserByQuery = (query: string): AppThunk => (
  dispatch: AppDispatch,
): Promise<Action> => {
  return new Promise((resolve, reject) => {
    dispatch(userSlice.actions.loading());
    getUsersByQueryService(query)
      .then((users) => {
        dispatch(userSlice.actions.searchUsers(users));
        dispatch(userSlice.actions.success());
        resolve();
      })
      .catch((error) => {
        dispatch(userSlice.actions.error());
        reject(error);
      });
  });
};

export const getAPIKey = (userId: number): AppThunk => (
  dispatch: AppDispatch,
  getState,
): Promise<Action> => {
  return new Promise((resolve, reject) => {
    dispatch(userSlice.actions.loading());
    getAPIKeyService(userId)
      .then((key) => {
        const user = getState().users.userList.find(
          (thisUser) => thisUser.id === userId,
        );
        if (user) {
          user.apiKey = key;
          dispatch(userSlice.actions.getAPIKey(user));
          dispatch(userSlice.actions.success());
          resolve();
        }
      })
      .catch((error) => {
        dispatch(userSlice.actions.error());
        reject(error);
      });
  });
};

export const deleteUser = (userId: number): AppThunk => (
  dispatch: AppDispatch,
): Promise<Action> => {
  return new Promise((resolve, reject) => {
    dispatch(userSlice.actions.loading());
    deleteUserService(userId)
      .then((resp) => {
        if (resp) {
          dispatch(userSlice.actions.deleteUser(userId));
          dispatch(userSlice.actions.success());
        } else {
          dispatch(userSlice.actions.error());
        }
        resolve();
      })
      .catch((error) => {
        dispatch(userSlice.actions.error());
        reject(error);
      });
  });
};

export const changePassword = (password: string, userId: number): AppThunk => (
  dispatch: AppDispatch,
): Promise<Action> => {
  return new Promise((resolve, reject) => {
    dispatch(userSlice.actions.loading());
    changePasswordService(password, userId)
      .then((resp) => {
        if (resp) {
          dispatch(userSlice.actions.success());
        } else {
          dispatch(userSlice.actions.error());
        }
        resolve();
      })
      .catch((error) => {
        dispatch(userSlice.actions.error());
        reject(error);
      });
  });
};

export const { error, loading } = userSlice.actions;

export default userSlice.reducer;
