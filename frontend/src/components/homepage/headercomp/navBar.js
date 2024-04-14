import React from "react";
import "./navBar.css";
import "bootstrap/dist/css/bootstrap.css";
import Popup from "reactjs-popup";
import Signup from "./signup";
import Signin from "./signin";
import Logo from "../images/MovieMateLogo.png"

export default function NavBar() {
  return (
    <div className="navbar">
      <img
        src={Logo}
        height="60px"
      />
      <div className="logins">
        {/* SignUP popup */}
        <Popup
          trigger={
            <a type="button" class="btn btn-light me-2">
              Sign Up
            </a>
          }
          modal
          closeOnDocumentClick
          position="bottom left"
        >
          <Signup />
        </Popup>
        {/* SignIn popup */}
        <Popup
          trigger={
            <a type="button" class="btn btn-light me-2">
              Sign In
            </a>
          }
          modal
          closeOnDocumentClick
          position="bottom left"
        >
          <Signin />
        </Popup>
      </div>
    </div>
  );
}
