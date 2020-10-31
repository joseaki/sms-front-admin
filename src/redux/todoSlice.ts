import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from 'Root';
import { Todo } from '../Domain/Entity/example';

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.push(action.payload);
    },
    toggleTodo(state, action: PayloadAction<Todo>) {
      const todoItem = state.find((todo) => todo.id === action.payload.id);

      if (todoItem) {
        todoItem.completed = !todoItem.completed;
      }
    },
  },
});

export const { toggleTodo } = todoSlice.actions;

export const addTodo = (text: string): AppThunk => async (
  dispatch: AppDispatch,
) => {
  const newTodo: Todo = {
    id: Math.random().toString(36).substr(2, 9),
    completed: false,
    text,
  };

  dispatch(todoSlice.actions.addTodo(newTodo));
};

export default todoSlice.reducer;
