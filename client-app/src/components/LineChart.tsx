import { ResponsiveLine, Serie } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData } from "../data/mockData"
import PropTypes from 'prop-types';
import { useMemo } from "react";
import { WeatherDataPoints } from "../state/types";
import { useChartDataContext } from "../state/weatherDataContext";


interface LineChartProps {
  isDashboard: boolean,
  weatherData: WeatherDataPoints[]
}

const LineChart = ( {isDashboard = false}: LineChartProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
   // Access ChartDataContext
   const { weatherData } = useChartDataContext();
  
  const dataPoints = useMemo(() => {
    return (
      weatherData &&
      weatherData
      )
  }, [weatherData])

  // Calculate the minimum value for y-axis scale
  const minYValue = Math.min(
    ...dataPoints.flatMap(weatherDataPoint =>
      weatherDataPoint.data.map(dataPoint => dataPoint.y)
    )
  ) - 2;
  const maxYValue = Math.max(
    ...dataPoints.flatMap(weatherDataPoint =>
      weatherDataPoint.data.map(dataPoint => dataPoint.y)
    )
  ) + 2;

  return (
    <ResponsiveLine
    data={dataPoints}
    theme={{
      text: {
        fontSize: 20,
        fill: colors.grey[200],
      },
      axis: {
        domain: {
          line: {
            stroke: colors.grey[100],
          },
        },
        legend: {
          text: {
            fill: colors.grey[100],
          },
        },
        ticks: {
          line: {
            stroke: colors.grey[100],
            strokeWidth: 1,
          },
          text: {
            fill: colors.grey[100],
          },
        },
      },
      legends: {
        text: {
          fill: colors.grey[100],
        },
      },
      tooltip: {
        container: {
          color: colors.primary[500],
        },
      },
    }}
    colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: minYValue,
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        
        yFormat=" >-.2f"
        curve="catmullRom"
        lineWidth={5}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'date',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'temperature (°C)',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        enableGridY={false}
        enableArea={true}
        areaBaselineValue={minYValue}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={11}
        pointBorderColor={{ from: 'serieColor' }}
        enablePointLabel={true}
        pointLabel="y"
        pointLabelYOffset={-24}
        isInteractive={false}
        useMesh={true}
        legends={[]}
    />
  );
};



export default LineChart;