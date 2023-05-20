import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'User',
  initialState: {
    user: null,
    listFavorites: [],
  },
  reducers: {
    setUser: (state, action) => {
      if (!action.payload) localStorage.removeItem('acc_token');
      else if (action.payload.accessToken) localStorage.setItem('acc_token', action.payload.accessToken);

      state.user = action.payload; // payload == token | userInfo (expected)
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
