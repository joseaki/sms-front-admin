import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IGeneralState {
  loading: boolean;
  error: string;
}

const initialState: IGeneralState = {
  loading: false,
  error: '',
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    loading(state) {
      state.loading = true;
      state.error = '';
    },
    error(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loading, error } = generalSlice.actions;

export default generalSlice.reducer;
