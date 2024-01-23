import React, { createContext, useContext, ReactNode, useState } from 'react';
import { CurrentWeatherData, WeatherDataPoints } from './types';


interface ChartDataContextValue {
  weatherData: WeatherDataPoints[];
  updateWeatherData: (data: WeatherDataPoints[]) => void;
  currentWeatherData: CurrentWeatherData;
  updateCurrentWeatherData: (data: CurrentWeatherData) => void;
}

const ChartDataContext = createContext<ChartDataContextValue | undefined>(undefined);

interface ChartDataProviderProps {
  children: ReactNode;
}

export const ChartDataProvider: React.FC<ChartDataProviderProps> = ({ children }) => {
  const defaultCurrentWeatherData: CurrentWeatherData = {
    temperature: 0,
    humidity: 0,
    weatherCode: 0,
    windSpeed: 0
  };
  const [weatherData, setWeatherData] = useState<WeatherDataPoints[]>([]);
  const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWeatherData>(defaultCurrentWeatherData);

  const updateWeatherData = (data: WeatherDataPoints[]) => {
    setWeatherData(data);
  };

  const updateCurrentWeatherData = (data: CurrentWeatherData) => {
    setCurrentWeatherData(data);
  };

  const contextValue: ChartDataContextValue = {
    weatherData,
    updateWeatherData,
    currentWeatherData,
    updateCurrentWeatherData
  };

  return (
    <ChartDataContext.Provider value={contextValue}>
      {children}
    </ChartDataContext.Provider>
  );
};

export const useChartDataContext = () => {
  const context = useContext(ChartDataContext);
  if (!context) {
    throw new Error('useChartDataContext must be used within a ChartDataProvider');
  }
  return context;
};
