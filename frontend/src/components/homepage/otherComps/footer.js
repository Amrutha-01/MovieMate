import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faTwitter,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faLocationDot,faPhone ,faEnvelope} from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/MovieMateLogo.png";

export default function Footer() {
  return (
    <div className="footer">
      <div className="logo-aboutUs">
        <h1>MovieMate</h1>
        <div className="line"></div>
        <p>
        MovieMate is your go-to platform for movie recommendations, curated watchlists, and comprehensive ratings. Created to simplify the movie-watching experience, MovieMate offers personalized suggestions based on your preferences. With easy-to-use features, you can discover new favorites, keep track of must-watch films, and make informed decisions about what to watch next. Join us and elevate your movie nights with MovieMate!
        </p>
      </div>
      <div className="links-section">
      <div className="followus">
        <h1>Follow Us</h1>
        <div className="line"></div>
        < FontAwesomeIcon className="icons"
          icon={faLinkedinIn}
          size="xl"
          style={{ color: "#ffffff" }}
        />
        < FontAwesomeIcon className="icons"
          icon={faInstagram}
          size="xl"
          style={{ color: "#ffffff" }}
        />
        < FontAwesomeIcon className="icons"
          icon={faTwitter}
          size="xl"
          style={{ color: "#ffffff" }}
        />
        < FontAwesomeIcon className="icons"
          icon={faFacebook}
          size="xl"
          style={{ color: "#ffffff" }}
        />
      </div>
      <div className="Quicklinks">
        <h1>Quick Links</h1>
        <div className="line"></div>
        <ul className="list">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms and Conditions</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Help</a></li>
        </ul>
      </div>
      <div className="contacts">
        <h1>Contacts</h1>
        <div className="line"></div>
        <div className="location">
          <FontAwesomeIcon
            icon={faLocationDot}
            size="xl"
            style={{ color: "#fafafa" }}
          />
          <p>Hussain Nagar,Visakhapatnam-530018,Andhra Pradesh</p>
        </div>
        <div className="number">
          <FontAwesomeIcon
            icon={faPhone}
            size="xl"
            style={{ color: "#fafafa" }}
          />
          <p>+91 8639163753</p>
        </div>
        <div className="email">
        <FontAwesomeIcon
            icon={faEnvelope}
            size="xl"
            style={{ color: "#fafafa" }}
          />
        <p>amrutharokkam573@gmail.com</p>
        </div>
        </div>
      </div>
    </div>
  );
}
