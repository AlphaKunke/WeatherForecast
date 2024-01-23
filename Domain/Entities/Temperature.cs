namespace Domain.Entities
{
    public class Temperature
    {
        public string? Unit { get; set; }
        public List<decimal>? Temperatures { get; set; }
        public List<string>? Dates { get; set; }

    }
}