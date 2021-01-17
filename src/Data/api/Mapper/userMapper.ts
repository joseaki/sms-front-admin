import { User } from 'Domain/Entity/user';

const userMapper = (data: any): User => {
  return {
    id: data.id,
    username: data.username,
    password: data.password,
  };
};

export default userMapper;
