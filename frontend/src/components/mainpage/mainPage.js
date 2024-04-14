import React, { useState, useEffect } from "react";
import HeaderComp from "./headerSection/header.js";
import CarouselComp from "./carouselSection/carousel.js";
import Footer from "../homepage/otherComps/footer.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DetailsPage from "./detailsPage/detailsPage.js";
import MovieList from "./moviesList.js";
import axios from "axios";
import { setUser } from "../../redux/userInfoSlice.js";
import { useDispatch } from "react-redux";
import { Recommandations } from "./recommandations.js";
import { useSelector } from "react-redux";
import Genres from "./genres/genres.js";

export default function MainPage() {
  const [searchClicked, setSearchClicked] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "https://localhost:5000/api/auth/userData",
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
  }, [token, dispatch]);

  const user = useSelector((state) => state.userInfo.user);
  let recomm = useSelector((state) => state.movies.recommand);
  console.log(recomm);

  return (
    <div className="mainpage" style={{ margin: "0%", padding: "0%" }}>
      <HeaderComp
        searchClicked={searchClicked}
        setSearchClicked={setSearchClicked}
      />
      {user && <Recommandations />}
      <CarouselComp />
      <MovieList />
      <Genres />
      <Footer />
    </div>
  );
}
