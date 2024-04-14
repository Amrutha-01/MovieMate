import React, { useEffect, useState } from "react";
import axios from "axios";
import { setUser } from "../../../redux/userInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { Recommandations } from "../recommandations";
import profileImg from "./assests/profileImg.jpg";
import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faTrashCan,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Link } from "react-router-dom";

const Profile = () => {
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://movie-mate-1csd.onrender.com/api/auth/userData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        dispatch(setUser(response.data));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token, dispatch, flag]);

  let recomm = useSelector((state) => state.movies.recommand);
  console.log(user.watchlist.length);

  const removeFromWatchlist = async (movieId) => {
    const response = await axios.post(
      "https://movie-mate-1csd.onrender.com/api/auth/watchlistRm",
      { _id: user._id, movieId: movieId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Removed from watchlist", response.data);
  };
  const removeFromFavorites = async (movieId) => {
    const response = await axios.post(
      "https://movie-mate-1csd.onrender.com/api/auth/favoritesRm",
      { _id: user._id, movieId: movieId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Removed from watchlist", response.data);
  };

  return (
    <div>
      {user ? (
        <div className="profile">
          <div className="profile-details">
            <img src={profileImg} />
            <div className="user-details">
              <p id="name">{user.fullname}</p>
              <div className="email">
                <FontAwesomeIcon icon={faEnvelope} />
                <p>{user.email}</p>
              </div>
            </div>
          </div>
          <div className="profile-lists">
            {user.watchlist.length > 0 && (
              <div className="profile-watchlist">
                <h2>Watchlist</h2>
                <div className="watchlist-items">
                  {user.watchlist.map((item) => (
                    <div className="watchlist-item-hr" key={item.movieId}>
                      <div className="watchlist-item" key={item.movieId}>
                        <p id="movie-name">{item.movieName}</p>
                        <p>
                          Visit Page
                          <Link to={`/movie/${item.movieId}`}>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                          </Link>
                        </p>
                        <button
                          onClick={() => {
                            removeFromWatchlist(item.movieId);
                            setFlag(!flag);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {user.favorites.length > 0 && (
              <div className="profile-watchlist">
                <h2>Favorites</h2>
                <div className="watchlist-items">
                  {user.favorites.map((item) => (
                    <div className="watchlist-item-hr">
                      <div className="watchlist-item" key={item.movieId}>
                        <p id="movie-name">{item.movieName}</p>
                        <p>
                          Visit Page
                          <Link to={`/movie/${item.movieId}`}>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                          </Link>
                        </p>
                        <button
                          onClick={() => {
                            removeFromFavorites(item.movieId);
                            setFlag(!flag);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
