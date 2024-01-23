export interface WeatherDataPoints {
    id: string,
    color: string,
    data: DataPoints[]
}

export interface DataPoints {
    x: string
    y: number
}

export interface CurrentWeatherData {
    temperature: number,
    humidity: number,
    weatherCode: number,
    windSpeed: number
}

export interface WeatherData {
    weatherDataPoints: WeatherDataPoints,
    currentWeatherData: CurrentWeatherData
}