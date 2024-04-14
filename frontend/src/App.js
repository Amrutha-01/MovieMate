import CarouselComp from "./components/mainpage/carouselSection/carousel"
import HeaderComp from "./components/mainpage/headerSection/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailsPage from "./components/mainpage/detailsPage/detailsPage";
// import TopRated from "./components/topRated";
import MainPage from "./components/mainpage/mainPage";
import Home from "./components/homepage/home";
import Profile from "./components/mainpage/profile/profile";


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/movie/:id" element={<DetailsPage type="movie"/>} />
          <Route path="/tvshow/:id" element={<DetailsPage type="tvshow"/>} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
