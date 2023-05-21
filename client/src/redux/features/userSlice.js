import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'User',
  initialState: {
    user: null,
    favoriteList: [],
  },
  reducers: {
    setUser: (state, action) => {
      if (!action.payload) localStorage.removeItem('acc_token');
      else if (action.payload.accessToken) localStorage.setItem('acc_token', action.payload.accessToken);

      state.user = action.payload; // payload == token | userInfo (expected)
    },
    setFavoriteList: (state, action) => {
      state.favoriteList = action.payload;
    },
    addFavorite: (state, action) => {
      state.favoriteList = [action.payload, ...state.favoriteList]; // push to head of array
    },
    removeFavorite: (state, action) => {
      const { mediaId } = action.payload;
      state.favoriteList = state.favoriteList.filter((item) => item.mediaId.toString() !== mediaId.toString()); // remove by mediaId (or can use .id of favoriteDocument) && ensure compare 2 string or 2 number
    },
  },
});

export const { setUser, setFavoriteList, addFavorite, removeFavorite } = userSlice.actions;
export default userSlice.reducer;
