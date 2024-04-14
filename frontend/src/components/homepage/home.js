import React from "react";
import NavBar from "./headercomp/navBar.js";
import "./home.css";
import Hero from "./otherComps/hero.js";
import Footer from "./otherComps/footer.js";

export default function Home() {
  return (
    <div className="home">
      <NavBar />
      <Hero />
      <Footer />
    </div>
  );
}
