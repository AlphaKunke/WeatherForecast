namespace Domain.Entities 
{
    public class NivoSerie {
        public string Id { get; set; }
        public string Color { get; set; }
        public List<DataPoint> Data {get; set; }
    }
}

    