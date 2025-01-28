import React from "react";
import "./card.css"
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Card({src, title, desc}) {
  return (
    <div className="card" style={{width:"fitContent"}}>
      <img src={src} />
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}
