import { useEffect, useState } from 'react';
import axios from 'axios';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import TopBar from './global/TopBar';
import { Route, Routes } from 'react-router-dom';
import SideBar from './global/SideBar';
import Dashboard from './dashboard/main';
import { observer } from "mobx-react-lite";
import { useChartDataContext } from './state/weatherDataContext';
import LoadingComponent from './components/LoadingComponent';

function App() {
  const [theme, colorMode] = useMode();
  const { updateWeatherData, updateCurrentWeatherData } = useChartDataContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/weather/forecast/52.52,13.41')
      .then(response => {
        const newData = response.data;
        updateWeatherData(newData);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });

    axios.get('http://localhost:5000/api/weather/current/52.52,13.41')
      .then(response => {
        updateCurrentWeatherData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching current weather data:', error);
      });
  }, []);

  if (loading) {
    return <LoadingComponent content='Loading app' />;
  }

  return (
    <ColorModeContext.Provider value={colorMode as { toggleColorMode: () => void; }}>
      <ThemeProvider theme={theme as { toggleColorMode: () => void; }}>
        <CssBaseline />
        <div className="app">
            < SideBar />
            <main className="content">
              <TopBar />
              < Routes >
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </main>
        </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default observer(App);
