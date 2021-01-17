import UserRepo from 'Data/api/Repository/users';
import { User } from 'Domain/Entity/user';
import { Store } from 'redux/store';
import { userSlice } from 'redux/userSlice';

const userRepo = new UserRepo();

export const getUsersByQuery = async (query: string): Promise<User[]> => {
  const { dispatch } = Store.store;
  try {
    dispatch(userSlice.actions.loading());
    const usersFetched = await userRepo.searchUsers(query);
    dispatch(userSlice.actions.setUsersList(usersFetched));
    dispatch(userSlice.actions.success());
    return usersFetched;
  } catch (error) {
    dispatch(userSlice.actions.error());
    throw new Error(error);
  }
};

export const saveUser = async (user: User): Promise<User> => {
  const { dispatch } = Store.store;
  try {
    dispatch(userSlice.actions.loading());
    const userSaved = await userRepo.saveUser(user);
    dispatch(userSlice.actions.addUser(userSaved));
    dispatch(userSlice.actions.success());
    return userSaved;
  } catch (error) {
    dispatch(userSlice.actions.error());
    throw new Error(error);
  }
};

export const getAPIKey = async (userId: number): Promise<string> => {
  const { dispatch, getState } = Store.store;
  try {
    dispatch(userSlice.actions.loading());
    const user = getState().users.userList.find(
      (userItem: User) => userItem.id === userId,
    );
    const apiKey = await userRepo.getAPIKey(userId);
    user.apiKey = apiKey;
    dispatch(userSlice.actions.setUser(user));
    dispatch(userSlice.actions.success());
    return apiKey;
  } catch (error) {
    dispatch(userSlice.actions.error());
    throw new Error(error);
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  const { dispatch } = Store.store;
  try {
    dispatch(userSlice.actions.loading());
    await userRepo.deleteUser(userId);
    dispatch(userSlice.actions.deleteUser(userId));
    dispatch(userSlice.actions.success());
  } catch (error) {
    dispatch(userSlice.actions.error());
    throw new Error(error);
  }
};

export const changePassword = async (
  password: string,
  userId: number,
): Promise<void> => {
  const { dispatch } = Store.store;
  try {
    dispatch(userSlice.actions.loading());
    await userRepo.changePassword(password, userId);
    dispatch(userSlice.actions.success());
  } catch (error) {
    dispatch(userSlice.actions.error());
    throw new Error(error);
  }
};
