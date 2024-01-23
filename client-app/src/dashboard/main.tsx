import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockTransactions } from "../data/mockData";
import Header from "../components/Header";
import LineChart from "../components/LineChart";
import StatBox from "../components/StatBox";
import { useChartDataContext } from "../state/weatherDataContext";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { weatherData, currentWeatherData } = useChartDataContext();

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  const formattedTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;


  console.log(weatherData);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <Header title="WEATHER FORECAST" subtitle="Have a nice day!"/>

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          sx= {{backgroundColor:colors.primary[400]}}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            temperature={currentWeatherData.temperature}
            humidity={currentWeatherData.humidity}
            windSpeed={currentWeatherData.windSpeed}
            weatherCode={currentWeatherData.weatherCode}
          />
        </Box>
        <Box
          gridColumn="span 9"
          sx= {{backgroundColor:colors.primary[400]}}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          fontSize={20}
          p={4}
        >
          <Box>
            {new Date().toDateString()}
          </Box>
          <Box>
            {formattedTime}
          </Box>
          {/* <StatBox
            title={currentWeatherData.temperature}
            subtitle="Sales Obtained"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          /> */}
        </Box>
        {/* <Box
          gridColumn="span 3"
          sx= {{backgroundColor:colors.primary[400]}}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          sx= {{backgroundColor:colors.primary[400]}}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          /> */}
        {/* </Box> */}

        {/* ROW 2 */}
        <Box
          gridColumn="span 10"
          gridRow="span 4"
          sx= {{backgroundColor:colors.primary[400]}}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Forecast for the next 7 days
              </Typography>
            </Box>
          </Box>
          <Box height="550px" m="-20px 0 0 0">
            <LineChart weatherData={weatherData} isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 2"
          gridRow="span 4"
          sx= {{backgroundColor:colors.primary[400]}}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            sx = {{colors:colors.grey[100]}}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600" fontSize={15}>
              Latin American Cities
            </Typography>
          </Box>
          {mockTransactions.map((city, i) => (
            <Box
              key={`${city.txId}-${i}`}
              display="flow"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[800]}`}
              p="30px"
              fontSize={20}
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                  fontSize={15}
                >
                  {city.txId}
                </Typography>
              </Box>
              <Box>
              {city.desc === "Sunny" ? (
                <img src='../../public/icons/clear-day.svg' alt='icon-weather' style={{ width: '50px', height: '50px' }}/>
              ) : city.desc === "Cloudy" ? (
                <img src='../../public/icons/cloudy.svg' alt='icon-weather' style={{ width: '50px', height: '50px' }}/>
              ) : city.desc === "Rainy" ? (
                <img src='../../public/icons/rain.svg' alt='icon-weather' style={{ width: '50px', height: '50px' }}/>
              ) : (
                <img src='../../public/icons/wind.svg' alt='icon-weather' style={{ width: '50px', height: '50px' }}/>
              )}
              </Box>
              <Box
              >
                {city.temperature}
              </Box>
            </Box>
          ))}
        </Box>

        
      </Box>
    </Box>
  );
};


export default Dashboard;