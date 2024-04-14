import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Logo from "../../homepage/images/MovieMateLogo.png";

export default function HeaderComp() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await axios.post(
        "https://localhost:5000//api/auth/logout"
      );
      navigate("/");
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const api1 = `https://api.themoviedb.org/3/discover/movie?api_key=ecc35355870fb70c79b880837e7a1312&language=en-US&page=1&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
    const api2 = `https://api.themoviedb.org/3/discover/tv?api_key=ecc35355870fb70c79b880837e7a1312&language=en-US&page=1&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`;

    axios
      .all([axios.get(api1), axios.get(api2)])
      .then(
        axios.spread((res1, res2) => {
          const dataFromRes1 = res1.data.results || [];
          const dataFromRes2 = res2.data.results || [];
          const dataFromRes2WithTitles = dataFromRes2.map((item) => ({
            ...item,
            title: item.name,
          }));
          const combinedData = [...dataFromRes1, ...dataFromRes2WithTitles];
          setItems(combinedData);
        })
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const formatResult = (item) => {
    console.log(item);
    return (
      <div className="result-wrapper">
        <span className="result-span">id: {item.id}</span>
        <span className="result-span">name: {item.id}</span>
      </div>
    );
  };
  const defProps = {
    options: items,
    getOptionLabel: (options) => options.title,
  };

  //  for profile icon
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };
  return (
    <div className="header">
      {/* Logo */}
      <div className="header-left">
        <img src={Logo} alt="Logo image" id="icon" />
        {/* search bar */}
        <div style={{ color: "white", marginTop: "0%" }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            className="searchBar"
            {...defProps}
            getOptionLabel={(option) => option.title}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
            // value={selected.title}
            onChange={(event, newValue) => {
              newValue != null && setSelected(newValue.id);
            }}
          />
        </div>
        <Link to={`/movie/${selected}`}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="xl"
            style={{ color: "#eff1f6" }}
            id="search-icon"
            onClick={() => {
              setSearchClicked(!searchClicked);
            }}
          />
        </Link>
      </div>
      {/* Profile icon */}
      {auth && (
        <div className="profile-icon">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            style={{ color: "white" }}
          >
            <AccountCircle style={{ fontSize: "2.5rem" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleSignOut}>Logout</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
}
