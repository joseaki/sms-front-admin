import { Todo } from 'Domain/Entity/example';
import ExampleRepo from 'api/Repository/example';

export default class ExampleService {
  private todoRepo = new ExampleRepo();

  test(): Promise<Todo> {
    return this.todoRepo.test();
  }
}
