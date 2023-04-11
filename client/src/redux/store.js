import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './features/globalSlice';
import themeReducer from './features/themeSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    global: globalReducer,
  },
});
