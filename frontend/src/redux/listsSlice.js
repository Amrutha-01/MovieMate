import { createSlice } from '@reduxjs/toolkit';

const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    watchlist:[],
    favorites:[],
  },
  reducers: {
    addToWatchlist: (state, action) => {
      state.watchlist.push(action.payload)
    },
    removeFromWatchlist: (state, action) => {
      return state.watchlist.filter(item => item.id !== action.payload.id);
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload)
    },
    removeFromFavorites: (state, action) => {
      return state.favorites.filter(item => item.id !== action.payload.id);
    },
  },
});

export const {addToWatchlist,addToFavorites,removeFromFavorites,removeFromWatchlist } = listsSlice.actions;
export default listsSlice.reducer;