import React from "react";
import heroimg from "../images/heroimg2.jpg";
import "./hero.css";
import Card from "./card";
import info from "./info";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-part">
        <img src={heroimg} className="heroimg" />
        <div className="hero-overlay">
          <h1>Welcome to MovieMate</h1>
          <p>
            Uncover the greatest blockbusters and the most captivating stories,
            all streaming here.
          </p>
        </div>
        <div className="cards-part">
          <h1>Our Key Features</h1>
          <div className="cards">
            {info.map((data) => (
              <Card key={data.id} {...data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
