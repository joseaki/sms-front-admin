import HttpClient from 'api/Client/http-client';
import host from 'Config/vars';
import Mapper from 'api/Mapper/userMapper';
import { User } from 'Domain/Entity/user';

export default class UserRepo extends HttpClient {
  constructor() {
    super(host || '');
  }

  saveUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      try {
        this.instance
          .post('/users', {
            ...user,
          })
          .then((resp) => {
            const userResponse: User = Mapper(resp.data);
            resolve(userResponse);
          })
          .catch((error) => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  }
}
