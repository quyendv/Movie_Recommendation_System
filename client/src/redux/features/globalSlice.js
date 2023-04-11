import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
  name: 'globalState',
  initialState: {
    globalLoading: false,
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = globalSlice.actions;
export default globalSlice.reducer;
