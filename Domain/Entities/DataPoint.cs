using Newtonsoft.Json;

namespace Domain.Entities {
    public class DataPoint
    {
        [JsonProperty("x")]
        public string X { get; set; }

        [JsonProperty("y")]
        public int Y { get; set; }
    }
}
