import HttpClient from 'Data/api/Clients/http-client';
import host from 'Config/vars';
import TodoMapper from 'Data/api/Mapper/example';
import { Todo } from 'Domain/Entity/example';

export default class ExampleRepo extends HttpClient {
  public constructor() {
    super(host || '');
  }

  public test(): Promise<Todo> {
    return new Promise((resolve, reject) => {
      try {
        this.instance
          .get('/api/banking/currency/searchCurrency/')
          .then((resp) => {
            const data: Todo = TodoMapper(resp.data);
            resolve(data);
          })
          .catch((error) => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  }
}
