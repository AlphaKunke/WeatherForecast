import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

interface StatBoxProps {
    temperature: number,
    humidity: number,
    weatherCode: number,
    windSpeed: number,
}


const StatBox = ({ temperature, humidity, weatherCode, windSpeed }: StatBoxProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        {/* <Box display="flex" justifyContent="space-between" mt="2px"> */}
        <Box>
          <Typography
                variant="h1"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
                p={1}
              >
                {temperature} °C
              </Typography>
            <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
              Humidity: {humidity} %
            </Typography>
            <Typography
              variant="h5"
              fontStyle="italic"
              sx={{ color: colors.greenAccent[600] }}
            >
              Wind: {windSpeed} km/h
            </Typography>
          {/* </Box> */}
        </Box>
        <Box>
          {
            0 < weatherCode && weatherCode < 3 ? (
              <img src='../../public/icons/wind.svg' alt='icon-weather' style={{ width: '80px', height: '80px' }}/>
            ) : 6 < weatherCode && weatherCode < 10 ? (
              <img src='../../public/icons/cloudy.svg' alt='icon-weather' style={{ width: '50px', height: '50px' }}/>
            ) : 20 < weatherCode && weatherCode < 70 ? (
              <img src='../../public/icons/rain.svg' alt='icon-weather' style={{ width: '50px', height: '50px' }}/>
            ) : (
              <img src='../../public/icons/clear-day.svg' alt='icon-weather' style={{  width: '100px', height: '100px' }}/>
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default StatBox;