using Newtonsoft.Json;

namespace Domain.Entities
{
    public class CurrentWeatherData
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double GenerationTimeMs { get; set; }
        public int UtcOffsetSeconds { get; set; }
        public string? Timezone { get; set; }
        public string? TimezoneAbbreviation { get; set; }
        public double Elevation { get; set; }

        public CurrentUnits? CurrentUnits { get; set; }
        public CurrentData? Current { get; set; }
    }

public class CurrentUnits
{
    public string? Time { get; set; }
    public string? Interval { get; set; }
    [JsonProperty("temperature_2m")]
    public string? Temperature2m { get; set; }
    [JsonProperty("relative_humidity_2m")]
    public string? RelativeHumidity2m { get; set; }
    [JsonProperty("weather_code")]
    public string? WeatherCode { get; set; }
    [JsonProperty("wind_speed_10m")]
    public string? WindSpeed10m { get; set; }
}

public class CurrentData
    {
        public string? Time { get; set; }
        public int Interval { get; set; }

        [JsonProperty("temperature_2m")]
        public double Temperature2m { get; set; }
        [JsonProperty("relative_humidity_2m")]
        public int RelativeHumidity2m { get; set; }
        [JsonProperty("weather_code")]
        public int WeatherCode { get; set; }
        [JsonProperty("wind_speed_10m")]
        public double WindSpeed10m { get; set; }
    }
}