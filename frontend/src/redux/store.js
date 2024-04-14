import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import listsReducer from './listsSlice';
import userInfoReducer from './userInfoSlice';

const store = configureStore({
  reducer: {
    movies:moviesReducer,
    lists:listsReducer,
    userInfo:userInfoReducer
  },
});

export default store;
