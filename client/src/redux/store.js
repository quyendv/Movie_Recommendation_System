import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});
