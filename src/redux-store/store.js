import { configureStore } from '@reduxjs/toolkit';
import allUserReducer from './alluserSlice/alluserSlice';
export const store = configureStore({
  reducer: {
    allUsers: allUserReducer,
  },
});
