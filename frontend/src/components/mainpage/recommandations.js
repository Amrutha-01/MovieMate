import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setRecommand } from "../../redux/moviesSlice";

export function Recommandations() {
  const [favorites, setFavorites] = useState(null);
  const user = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getFavorites() {
      try {
        const response = await axios.get(
          `https://movie-mate-taupe.vercel.app/api/auth/favorites?userId=${user._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setFavorites(response.data.favorites);
      } catch (err) {
        console.log("Something went wrong", err);
      }
    }
    getFavorites();
  }, [user._id]);

  useEffect(() => {
    async function fetchRecommendations(movieId) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=ecc35355870fb70c79b880837e7a1312&language=en-US&page=1`
        );
        const data = await response.json();
        return data.results.slice(0, Math.ceil(20 / favorites.length)); // Limit recommendations for each movie
      } catch (error) {
        console.log("Error fetching recommendations:", error);
        return [];
      }
    }

    async function getAllRecommendations() {
      if (!favorites) return;

      let allRecommendations = [];
      for (const favorite of favorites) {
        const recommendations = await fetchRecommendations(favorite.movieId);
        allRecommendations = [...allRecommendations, ...recommendations];
      }

      dispatch(setRecommand(allRecommendations.slice(0, 20))); // Limit total recommendations
    }

    getAllRecommendations();
  }, [favorites, dispatch]);

  return null;
}
