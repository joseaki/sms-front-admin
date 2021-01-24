import UserRepo from 'Data/api/Repository/users';
import { User } from 'Domain/Entity/user';
import { Store } from 'redux/store';
import { userSlice } from 'redux/userSlice';
import { error } from 'redux/generalSlice';

const userRepo = new UserRepo();

export const getUsersByQuery = async (query: string): Promise<User[]> => {
  const { dispatch } = Store.store;
  try {
    const usersFetched = await userRepo.searchUsers(query);
    dispatch(userSlice.actions.setUsersList(usersFetched));
    return usersFetched;
  } catch (err) {
    dispatch(error(err.statusText));
    throw new Error(err);
  }
};

export const saveUser = async (user: User): Promise<User> => {
  const { dispatch } = Store.store;
  try {
    const userSaved = await userRepo.saveUser(user);
    dispatch(userSlice.actions.addUser(userSaved));
    return userSaved;
  } catch (err) {
    dispatch(error(err.statusText));
    throw new Error(err);
  }
};

export const getAPIKey = async (userId: number): Promise<string> => {
  const { dispatch, getState } = Store.store;
  try {
    const user = getState().users.userList.find(
      (userItem: User) => userItem.id === userId,
    );
    const apiKey = await userRepo.getAPIKey(userId);
    user.apiKey = apiKey;
    dispatch(userSlice.actions.setUser(user));
    return apiKey;
  } catch (err) {
    dispatch(error(err.statusText));
    throw new Error(err);
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  const { dispatch } = Store.store;
  try {
    await userRepo.deleteUser(userId);
    dispatch(userSlice.actions.deleteUser(userId));
  } catch (err) {
    dispatch(error(err.statusText));
    throw new Error(err);
  }
};

export const changePassword = async (
  password: string,
  userId: number,
): Promise<void> => {
  const { dispatch } = Store.store;
  try {
    await userRepo.changePassword(password, userId);
  } catch (err) {
    dispatch(error(err.statusText));
    throw new Error(err);
  }
};
