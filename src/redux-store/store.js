import { configureStore } from '@reduxjs/toolkit';
import allUserReducer from './alluserSlice/alluserSlice';
import postReducer from './postSlice/postSlice';
export const store = configureStore({
  reducer: {
    allUsers: allUserReducer,
    posts: postReducer,
  },
});
