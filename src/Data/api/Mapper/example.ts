import { Todo } from 'Domain/Entity/example';

const exampleMapper = (data: any): Todo => {
  return {
    id: data.id,
    text: data.text,
    completed: data.completed,
  };
};

export default exampleMapper;
