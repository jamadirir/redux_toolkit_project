import { configureStore } from '@reduxjs/toolkit'
import postReducer from './postSlice'
import loaderReducer from './loaderSlice';
export const store = configureStore({
  reducer: {
    posts:postReducer,
    loaders:loaderReducer
  },
})
