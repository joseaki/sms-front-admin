import UserRepo from 'api/Repository/users';
import { User } from 'Domain/Entity/user';

const userRepo = new UserRepo();

export const saveUserService = (user: User): Promise<User> => {
  return userRepo.saveUser(user);
};

export const getAllUsersService = (): Promise<User[]> => {
  throw new Error('error');
};
