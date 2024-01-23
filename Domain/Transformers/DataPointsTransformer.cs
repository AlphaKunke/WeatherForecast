using Domain.Entities;

namespace Domain.Transformers
{
    public static class DataPointsTransformer
    {
         public static List<NivoSerie> TransformToDataPoints(Temperature temperatureData)
        {
            List<DataPoint> dataPoints = new List<DataPoint>();

            if (temperatureData.Temperatures != null && temperatureData.Dates != null &&
                temperatureData.Temperatures.Count == temperatureData.Dates.Count)
            {
                for (int i = 0; i < temperatureData.Temperatures.Count; i++)
                {
                    if (i % 24 == 17) {
                        int temperature = Convert.ToInt16(temperatureData.Temperatures[i]);
                        string date = temperatureData.Dates[i][..10];
                        
                        dataPoints.Add(new DataPoint { X = date, Y = temperature });
                    }
                }
            }

            var listSerie = new List<NivoSerie>();
            var serie = new NivoSerie { Id = "Forecast", Color = "hsl(193, 70%, 50%)", Data = dataPoints};
            listSerie.Add(serie);

            return listSerie;
        }
    }
}