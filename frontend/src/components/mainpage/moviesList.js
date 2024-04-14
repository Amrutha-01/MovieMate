import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTopRatedMovies,
  setUpcomingMovies,
  setNowPlayingMovies,
  setTvseries,
} from "../../redux/moviesSlice";
import MovieCarousel from "./movieCarousel";

const MovieList = () => {
  const dispatch = useDispatch();
  let recommand = useSelector((state) => state.movies.recommand);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=ecc35355870fb70c79b880837e7a1312&language=en-US&page=1"
    )
      .then((response) => response.json())
      .then((data) => dispatch(setTopRatedMovies(data.results)));

    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=ecc35355870fb70c79b880837e7a1312&language=en-US&page=1"
    )
      .then((response) => response.json())
      .then((data) => dispatch(setNowPlayingMovies(data.results)));

    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=ecc35355870fb70c79b880837e7a1312&language=en-US&page=1"
    )
      .then((response) => response.json())
      .then((data) => dispatch(setUpcomingMovies(data.results)));

    fetch(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=ecc35355870fb70c79b880837e7a1312"
    )
      .then((response) => response.json())
      .then((data) => dispatch(setTvseries(data.results)));
  }, [dispatch]);

  const { topRated, upcoming, nowPlaying, tvseries } = useSelector(
    (state) => state.movies
  );
  console.log(recommand)
  return (
    <div className="movielist" style={{marginTop:'100px'}}>
      {recommand.length>0 && <MovieCarousel title="Recommanded for you" data={recommand} tv="false" />}
      <MovieCarousel title="Top Rated" data={topRated} tv="flase"/>
      <MovieCarousel title="Now Playing" data={nowPlaying} tv="flase"/>
      <MovieCarousel title="Upcoming" data={upcoming} tv="flase"/>
      <MovieCarousel title="TV Series" data={tvseries} tv="true"/>
    </div>
  );
};

export default MovieList;
