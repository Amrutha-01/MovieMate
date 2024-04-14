import React from "react";
import CardComp from "./cardComp/cardComp";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Carousal from "@itseasy21/react-elastic-carousel";
import Item from "@itseasy21/react-elastic-carousel";

export default function MovieCarousel({title,data,tv}) {
  const [itemsToShow, setItemsToShow] = useState(calculateItemsToShow());

  useEffect(() => {
    function handleResize() {
      setItemsToShow(calculateItemsToShow());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 

  function calculateItemsToShow() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
      return 4;
    } else if (screenWidth >= 768) {
      return 3;
    } else {
      return 2;
    }
  }

  return (
   <div className="movielist">
      <h1 style={{ color: "white", marginLeft: "2%" }}>{title}</h1>
      <Carousal itemsToShow={itemsToShow} className="slider" itemPadding={[20, 20]}>
        {data.map((movie) => (
          <CardComp
            tv={tv}
            key={movie.id}
            id={movie.id}
            url={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            title={movie.original_title||movie.name}
            date={movie.release_date}
            rating={movie.vote_average}
            movie={movie}
            overview={movie.overview}
          />
        ))}
      </Carousal>
    </div>
  );
}
