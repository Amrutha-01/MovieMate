import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import "./cardComp.css";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function CardComp({
  tv,
  overview,
  movie,
  id,
  url,
  title,
  date,
  rating,
  tabs
}) {
  const handleCardClick = (event) => {
    // event.preventDefault();
    // This will trigger navigation to the specified route
    // window.location.href = `/movie/${id}`;
  };

  // console.log(url);

  return (
    <div className={tabs=="true"?"cardItem tabs":"cardItem"}>
      {tv === "true" ? (
        <Link to={`/tvshow/${id}`} className="card-link">
          <div className="card-poster">
            <img className="card-poster-img" src={movie && url} alt={title} />
            <div className="card-poster-overlay">
              <div className="card-poster-details">
                <h3 className={tabs=="true"?"card-poster-title tabs-title":"card-poster-title"}>{movie ? title : ""}</h3>
                <div className={tabs=="true"?"card-poster-info tabs-info":"card-poster-info"}>
                  <span className="card-poster-date">{movie ? date : ""}</span>
                  <span className="card-poster-rating">
                    {movie ? rating : ""}
                    <FontAwesomeIcon icon={faStar} className="star-icon" />
                  </span>
                </div>
              </div>
              <div className={tabs=="true"?"card-poster-desc tabs-desc":"card-poster-desc"}>
                {movie ? overview.slice(0, 108) + "..." : ""}
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Link to={`/movie/${id}`} className="card-link">
          <div className="card-poster">
            <img className="card-poster-img" src={movie && url} alt={title} />
            <div className="card-poster-overlay">
              <div className="card-poster-details">
                <h3 className="card-poster-title">{movie ? title : ""}</h3>
                <div className="card-poster-info">
                  <span className="card-poster-date">{movie ? date : ""}</span>
                  <span className="card-poster-rating">
                    {movie ? rating : ""}
                    <FontAwesomeIcon icon={faStar} className="star-icon" />
                  </span>
                </div>
              </div>
              <div className="card-poster-desc">
                {movie ? overview.slice(0, 108) + "..." : ""}
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
