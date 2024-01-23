import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModelOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotifcationOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from "axios";
import { useChartDataContext } from "../state/weatherDataContext";

const TopBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedTerm, setDisplayedTerm] = useState(`Latitude: 52.52, Longitude: 13.41`);
  const { updateWeatherData, updateCurrentWeatherData } = useChartDataContext(); 

  const handleSearch = () => {
    axios.get(`http://localhost:5000/api/weather/forecast/${searchTerm}`)
    .then(response => {
        updateWeatherData(response.data);
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error sending coordinates to backend:', error);
    });

    axios.get(`http://localhost:5000/api/weather/current/${searchTerm}`)
      .then(response => {
        updateCurrentWeatherData(response.data);
        setDisplayedTerm(`Latitude: ${searchTerm.split(",")[0]}, Longitude: ${searchTerm.split(",")[1]}`); 
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching current weather data:', error);
      })
      .finally(() => {
        setSearchTerm("");
      });
  };

  return (
    <Box display="flex" justifyContent="space-between" p={4} style={{ height: "100px" }}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: colors.primary[400],
          borderRadius: "4px",
          height:"40px"
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1, fontSize:17 }}
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton onClick={handleSearch}>
          <SearchIcon type="button" sx={{ p: 0.1 }} />
        </IconButton>
      </Box>

      <Box mr={12} fontSize={15}>
        <LocationOnIcon sx={{ mr: 1, marginTop: 1 }}/>
        {displayedTerm}
      </Box>
      
      {/* ICON BAR */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkOutlinedIcon />
          ) : (
            <LightModelOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotifcationOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;
