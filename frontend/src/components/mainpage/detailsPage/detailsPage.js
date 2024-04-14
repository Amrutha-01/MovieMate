import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { faCheck, faHome, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../homepage/images/MovieMateLogo.png";
import {
  addToFavorites,
  addToWatchlist,
  removeFromFavorites,
  removeFromWatchlist,
} from "../../../redux/listsSlice";
import {
  faHeart as regularHeart,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import "./detailsPage.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MovieCarousel from "../movieCarousel";

export default function DetailsPage({ type }) {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [flag, setFlag] = useState(false);
  const [similar, setSimilar] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInfo.user);
  console.log(user);
  const [isLiked, setIsLiked] = useState(
    user && user.favorites.some((favorite) => favorite.movieId === id)
      ? true
      : false
  );
  const [isClicked, setIsClicked] = useState(
    user && user.watchlist.some((watchlist) => watchlist.movieId === id)
      ? true
      : false
  );
  console.log(isClicked);
  useEffect(() => {
    if (type === "tvshow") {
      fetch(
        `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=ecc35355870fb70c79b880837e7a1312&language=en-US&page=1`
      )
        .then((tvResponse) => {
          if (!tvResponse.ok) {
            throw new Error(
              `TV data request failed with status ${tvResponse.status}`
            );
          }
          if (tvResponse.ok) {
            return tvResponse.json();
          }
        })
        .then((tvData) => {
          // setFlag(true);
          setMovieDetails(tvData);
        })
        .catch((error) => {
          // console.clear()
          console.log(error);
          // setFlag(false);
        });
    } else {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=ecc35355870fb70c79b880837e7a1312&language=en-US&page=1`
      )
        .then((moviesResponse) => {
          if (!moviesResponse.ok) {
            throw new Error(
              `Movies data request failed with status ${moviesResponse.status}`
            );
          }
          return moviesResponse.json();
        })
        .then((moviesData) => {
          // setFlag(false);
          setMovieDetails(moviesData);
        })
        .catch((error) => {
          console.log(error);
          // console.clear()
          // setFlag(false);
        });
    }
  }, [type, id]);

  useEffect(() => {
    setIsLiked(
      user && user.favorites.some((favorite) => favorite.movieId === id)
        ? true
        : isLiked
    );
    setIsClicked(
      user && user.watchlist.some((watchlist) => watchlist.movieId === id)
        ? true
        : isClicked
    );
  }, [id]);

  const handleHeartClick = async (event) => {
    // dispatch(addToFavorites(id))
    const updatedIsLiked = !isLiked;
    // setIsLiked((prevIsLiked) => !prevIsLiked);
    setIsLiked(updatedIsLiked);

    try {
      if (updatedIsLiked) {
        const response = await axios.post(
          "https://localhost:5000/api/auth/favorites",
          {
            _id: user._id,
            movieId: id,
            type: type,
            movieName: movieDetails.original_title,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Added to favorites", response.data);
      } else {
        const response = await axios.post(
          "https://localhost:5000/api/auth/favoritesRm",
          {
            _id: user._id,
            movieId: id,
            type: type,
            movieName: movieDetails.original_title,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Removed from Favorites", response.data);
      }
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlelistClick = async (event) => {
    // dispatch(addToWatchlist(id))
    // setIsClicked((prev) => !prev);
    const updatedIsClicked = !isClicked;
    // setIsLiked((prevIsLiked) => !prevIsLiked);
    setIsClicked(updatedIsClicked);

    try {
      if (updatedIsClicked) {
        const response = await axios.post(
          "https://localhost:5000/api/auth/watchlist",
          {
            _id: user._id,
            movieId: id,
            type: type,
            movieName: movieDetails.original_title,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Added to watchlist", response.data);
      } else {
        const response = await axios.post(
          "https://localhost:5000/api/auth/watchlistRm",
          { _id: user._id, movieId: id, type: type },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Removed from watchlist", response.data);
      }
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };
  const [isHoveredlist, setIsHoveredlist] = useState(false);

  const handleMouseEnterlist = () => {
    setIsHoveredlist(true);
  };
  const handleMouseLeavelist = () => {
    setIsHoveredlist(false);
  };
  useEffect(() => {
    async function fetchSimilar() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=ecc35355870fb70c79b880837e7a1312&language=en-US&page=1`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2MzNTM1NTg3MGZiNzBjNzliODgwODM3ZTdhMTMxMiIsInN1YiI6IjY0OTUwZGJiYTI4NGViMDExY2RiNTM4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._erid2_575ZJ2m8_7OhK6BfG5kuUJS60fJhwYYwQ9X4",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setSimilar(data);
      } catch (error) {
        console.log("Error fetching similar movies:", error);
        return [];
      }
    }
    fetchSimilar();
  }, []);
  return (
    <div className="details">
      <div className="detailsPage" style={{ margin: "0%", padding: "0%" }}>
        {movieDetails && (
          <div className="details-data" style={{ margin: "0%", padding: "0%" }}>
            <div className="details-heading" style={{ marginLeft: "1%" }}>
              <img src={Logo} id="icon" />
              <Link to="/mainPage" id="back-home">
                <FontAwesomeIcon
                  icon={faHome}
                  size="xl"
                  style={{ color: "#eff1f6" }}
                  id="search-icon"
                />
              </Link>
            </div>
            <div className="details-img-cont">
              <img
                className="details-img"
                src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
              />
            </div>
            <div
              className="details-overlay"
              style={{ margin: "0%", padding: "0%", display: "flex" }}
            >
              <div className="details-poster-div">
                <img
                  src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                  id="details-poster"
                />
              </div>
              <div className="details-matter">
                <div className="watchlist">
                  <FontAwesomeIcon
                    onClick={handlelistClick}
                    onMouseEnter={handleMouseEnterlist}
                    onMouseLeave={handleMouseLeavelist}
                    icon={isClicked ? faCheck : faSquarePlus}
                    style={{ color: "white", fontSize: "23px" }}
                  />
                  <p
                    style={{ marginRight: "5px" }}
                    className={`heart-para  ${isHoveredlist ? "visible" : ""} ${
                      isClicked ? "visible" : ""
                    } `}
                  >
                    {" "}
                    {isClicked ? "Added to Watchlist" : "Add to Watchlist"}
                  </p>
                  <FontAwesomeIcon
                    icon={isLiked ? solidHeart : regularHeart}
                    onClick={handleHeartClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      color: isLiked ? "red" : "white",
                      fontSize: "23px",
                    }}
                  />
                  <p
                    className={`heart-para  ${isHovered ? "visible" : ""} ${
                      isLiked ? "visible" : ""
                    } `}
                  >
                    {" "}
                    {isLiked ? "Added to Favorites" : "Add to Favorites"}
                  </p>
                </div>
                <div id="details-title">
                  {movieDetails
                    ? movieDetails.original_title || movieDetails.name
                    : ""}
                </div>
                <div className="details-info">
                  <span id="details-date">
                    {movieDetails
                      ? movieDetails.release_date || movieDetails.first_air_date
                      : ""}
                  </span>
                  <span>
                    {movieDetails ? movieDetails.vote_average : ""}
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#f0f4f9" }}
                    />
                  </span>
                </div>
                {movieDetails.genres ? (
                  <div className="genre-container">
                    {movieDetails.genres.map((genre) => (
                      <div key={genre.id} className="genre-box">
                        {genre.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        )}
        <div className="details-desc">
          <h2>Overview</h2>
          {movieDetails ? movieDetails.overview : ""}
        </div>
        <div
          className="details-links"
          style={{ marginLeft: "2%", marginTop: "2%" }}
        >
          <h2>Useful Links</h2>
          <div className="links-cont">
            {movieDetails && movieDetails.homepage && (
              <a className="link" href={movieDetails.homepage}>
                Home Page
              </a>
            )}
            {movieDetails && movieDetails.imdb_id && (
              <a
                className="link"
                href={"https://www.imdb.com/title/" + movieDetails.imdb_id}
              >
                IMDB Link
              </a>
            )}
          </div>
        </div>
        {similar && (
          <MovieCarousel
            title="Similar Movies"
            data={similar.results}
            tv={type === "tvshow" ? "true" : "flase"}
          />
        )}
      </div>
    </div>
  );
}
