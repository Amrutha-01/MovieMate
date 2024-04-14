import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import axios from "axios";
import CardComp from "../cardComp/cardComp";
import "./tabs.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [genres, setGenres] = useState([
    {
      id: 28,
      name: "Action",
      data: [],
    },
    {
      id: 12,
      name: "Adventure",
      data: [],
    },
    {
      id: 16,
      name: "Animation",
      data: [],
    },
    {
      id: 35,
      name: "Comedy",
      data: [],
    },
    {
      id: 80,
      name: "Crime",
      data: [],
    },
    {
      id: 99,
      name: "Documentary",
      data: [],
    },
    {
      id: 18,
      name: "Drama",
      data: [],
    },
    {
      id: 10751,
      name: "Family",
      data: [],
    },
    {
      id: 14,
      name: "Fantasy",
      data: [],
    },
    {
      id: 36,
      name: "History",
      data: [],
    },
    {
      id: 27,
      name: "Horror",
      data: [],
    },
    {
      id: 10402,
      name: "Music",
      data: [],
    },
    {
      id: 9648,
      name: "Mystery",
      data: [],
    },
    {
      id: 10749,
      name: "Romance",
      data: [],
    },
    {
      id: 878,
      name: "Science Fiction",
      data: [],
    },
    {
      id: 10770,
      name: "TV Movie",
      data: [],
    },
    {
      id: 53,
      name: "Thriller",
      data: [],
    },
    {
      id: 10752,
      name: "War",
      data: [],
    },
    {
      id: 37,
      name: "Western",
      data: [],
    },
  ]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function genresInfo(id) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=ecc35355870fb70c79b880837e7a1312&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2MzNTM1NTg3MGZiNzBjNzliODgwODM3ZTdhMTMxMiIsInN1YiI6IjY0OTUwZGJiYTI4NGViMDExY2RiNTM4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._erid2_575ZJ2m8_7OhK6BfG5kuUJS60fJhwYYwQ9X4",
            Accept: "application/json",
          },
        }
      );
      return response.data.results.slice(0, 15);
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  async function fetchGenresData() {
    try {
      const updatedGenres = await Promise.all(
        genres.map(async (genre) => {
          const results = await genresInfo(genre.id);
          return { ...genre, data: results };
        })
      );
      console.log(updatedGenres);
      setGenres(updatedGenres);
      console.log(genres);
    } catch (error) {
      console.error("Error fetching genres data:", error);
    }
  }
  fetchGenresData();

  return (
    <div className="genres">
      <h2>Discover Films by Genre</h2>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          height: 800,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          className="tabs-left"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            "& .MuiTabs-indicator": {
              backgroundColor: "black", // Change the color of the indicator here
            },
            "& .Mui-selected": {
              color: "black", // Change the color of the selected tab text here
            },
          }}
        >
          {genres.map((genre, sno) => (
            <Tab
              label={genre.name}
              {...a11yProps(sno)}
              key={genre.id}
              className="genre-name"
              // sx={{fontSize:''}}
            />
          ))}
        </Tabs>
        {genres.map((genre, sno) => (
          <TabPanel
            value={value}
            index={sno}
            key={genre.id}
            className="tabs-panel"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              className="grid-container"
              sx={{ columnGap: 0.5, rowGap: 0, placeItems: "center" }}
            >
              {genre.data.map((movie) => (
                // <p key={movie.id}>{movie.title}</p>
                <CardComp
                  tv="false"
                  overview={movie.overview}
                  key={movie.id}
                  id={movie.id}
                  url={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  title={movie.original_title || movie.name}
                  date={movie.release_date}
                  rating={movie.vote_average}
                  movie={movie}
                  tabs="true"
                />
              ))}
            </Box>
          </TabPanel>
        ))}
      </Box>
    </div>
  );
}
