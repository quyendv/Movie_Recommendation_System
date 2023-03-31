import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'User',
  initialState: {
    user: null,
    listFavorites: [],
  },
  reducers: {
    setUser: (state, action) => {
      // todo: ...
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
