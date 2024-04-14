import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    topRated: [],
    upcoming: [],
    nowPlaying: [],
    tvseries: [],
    recommand: [],
  },
  reducers: {
    setTopRatedMovies: (state, action) => {
      state.topRated = action.payload;
    },
    setUpcomingMovies: (state, action) => {
      state.upcoming = action.payload;
    },
    setNowPlayingMovies: (state, action) => {
      state.nowPlaying = action.payload;
    },
    setTvseries: (state, action) => {
      state.tvseries = action.payload;
    },
    setRecommand: (state, action) => {
      state.recommand = action.payload;
    },
    setItemInLocalStorage: (state, action) => {
      const { key, value } = action.payload;
      console.log(key, value);
      localStorage.setItem(key, value);
    },
  },
});

export const {
  setTopRatedMovies,
  setUpcomingMovies,
  setNowPlayingMovies,
  setTvseries,
  setItemInLocalStorage,
  setRecommand
} = moviesSlice.actions;
export default moviesSlice.reducer;
