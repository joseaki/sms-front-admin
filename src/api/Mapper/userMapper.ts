import { User } from 'Domain/Entity/user';

const exampleMapper = (data: any): User => {
  return {
    id: data.id,
    username: data.id,
    password: data.password,
  };
};

export default exampleMapper;
