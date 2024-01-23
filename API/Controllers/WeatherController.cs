using Microsoft.AspNetCore.Mvc;
using Domain;
using Newtonsoft.Json;
using Domain.Transformers;
using Domain.Entities;

namespace API.Controllers
{
    [ApiController]
    [Route("api/weather")]
    public class WeatherController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public WeatherController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }


        [HttpGet("current/{coordinates}")]
        public async Task<IActionResult> GetCurrent(string coordinates)
        {
             if (string.IsNullOrEmpty(coordinates) || !coordinates.Contains(','))
            {
                return BadRequest("Invalid search request");
            }

            string[] coordinateArray = coordinates.Split(',');
            string latitude = coordinateArray[0];
            string longitude = coordinateArray[1];

            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m");
            
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();

                var weatherData = JsonConvert.DeserializeObject<CurrentWeatherData>(json);

                var currentWeatherData = new CurrentWeather 
                { 
                    Temperature = Convert.ToInt32(weatherData?.Current?.Temperature2m),
                    Humidity = weatherData?.Current?.RelativeHumidity2m,
                    WeatherCode = weatherData?.Current?.WeatherCode,
                    WindSpeed = weatherData?.Current?.WindSpeed10m,
                };

                if (currentWeatherData != null)
                {
                    return Ok(currentWeatherData);
                }
                else
                {
                    return BadRequest("Failed to deserialize JSON.");
                }
            }
            else
            {
                return BadRequest($"Failed to retrieve data. Status code: {response.StatusCode}");
            }
        }


        [HttpGet("forecast/{coordinates}")]
        public async Task<IActionResult> GetForecast(string coordinates)
        {
            if (string.IsNullOrEmpty(coordinates) || !coordinates.Contains(','))
            {
                return BadRequest("Invalid search request");
            }

            string[] coordinateArray = coordinates.Split(',');
            string latitude = coordinateArray[0];
            string longitude = coordinateArray[1];

            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&hourly=temperature_2m");
            
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();

                var weatherData = JsonConvert.DeserializeObject<ForecastWeatherData>(json);

                var temperatureData = new Temperature 
                { 
                    Temperatures = weatherData?.Hourly?.Temperature2m,
                    Dates = weatherData?.Hourly?.Time,
                    Unit = weatherData?.HourlyUnits?.Temperature2m
                };

                List<NivoSerie> weatherDataPoints = DataPointsTransformer.TransformToDataPoints(temperatureData);

                if (weatherDataPoints != null)
                {
                    return Ok(weatherDataPoints);
                }
                else
                {
                    return BadRequest("Failed to deserialize JSON.");
                }
            }
            else
            {
                return BadRequest($"Failed to retrieve data. Status code: {response.StatusCode}");
            }
        }

       
    }
}