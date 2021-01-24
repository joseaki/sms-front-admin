import HttpClient from 'Data/api/Clients/http-client';
import config from 'Config/vars';
import UserMapper from 'Data/api/Mapper/userMapper';
import { User } from 'Domain/Entity/user';

export default class UserRepo extends HttpClient {
  constructor() {
    super(config.host);
  }

  saveUser(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      try {
        this.instance
          .post('/users', {
            username: user.username,
            password: user.password,
          })
          .then((resp) => {
            const userResponse: User = UserMapper(resp.data);
            resolve(userResponse);
          })
          .catch((error) => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  }

  searchUsers(query: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.instance
        .get(`/users?q=${query}`)
        .then((resp) => {
          const searchedUsers: User[] = resp.data.map((user: any) =>
            UserMapper(user),
          );
          resolve(searchedUsers);
        })
        .catch((error) => reject(error));
    });
  }

  getAPIKey(userId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.instance
        .get(`/users/${userId}/getapikey`)
        .then((resp) => {
          resolve(resp.data.apikey);
        })
        .catch((error) => reject(error));
    });
  }

  deleteUser(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.instance
        .delete(`/users/${id}`)
        .then((resp) => {
          if (resp.data) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((error) => reject(error));
    });
  }

  changePassword(newPassword: string, userId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.instance
        .patch(`/users/${userId}`, { password: newPassword })
        .then((resp) => {
          if (resp.data) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((error) => reject(error));
    });
  }
}
