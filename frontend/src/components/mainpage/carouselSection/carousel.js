import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./carousel.css";

export default function CarouselComp() {
  const [popularMovies, setPopularMovies] = useState([]);
  
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=ecc35355870fb70c79b880837e7a1312&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="carouselComp">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={false}
      >
        {popularMovies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="poster">
              <img
                src={`https://image.tmdb.org/t/p/original/${
                  movie && movie.backdrop_path
                }`}
              />
            </div>
            <div className="poster-overlay">
              <div id="title">{movie ? movie.original_title : ""}</div>
              <div>
                  {movie ? movie.vote_average : ""}
                  <FontAwesomeIcon icon={faStar} style={{ color: "#f0f4f9" }} />
                </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}
