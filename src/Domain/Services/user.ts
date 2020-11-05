import UserRepo from 'api/Repository/users';
import { User } from 'Domain/Entity/user';

const userRepo = new UserRepo();

export const saveUserService = (user: User): Promise<User> => {
  return userRepo.saveUser(user);
};

export const getUsersByQueryService = (query: string): Promise<User[]> => {
  return userRepo.searchUsers(query);
};

export const getAllUsersService = (): Promise<User[]> => {
  throw new Error('error');
};

export const getAPIKeyService = (userId: number): Promise<string> => {
  return userRepo.getAPIKey(userId);
};

export const deleteUserService = (userId: number): Promise<boolean> => {
  return userRepo.deleteUser(userId);
};

export const changePasswordService = (
  password: string,
  userId: number,
): Promise<boolean> => {
  return userRepo.changePassword(password, userId);
};
