import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../features/shopSlice';


export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },

});
