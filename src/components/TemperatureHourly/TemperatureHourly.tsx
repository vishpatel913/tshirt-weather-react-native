import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import {
  VictoryScatter,
  VictoryChart,
  VictoryLine,
  VictoryContainer,
  VictoryAxis,
} from 'victory-native';

interface Props {
  data: HourlyWeather[];
}

type HourlyWeather = {
  time: number;
  temp: number;
  icon: number;
  percentage?: number;
};

const GraphContainer = styled.View``;

const TemperatureHourly = ({ data }: Props) => {
  const graphData = data.reduce(
    (acc, c, i) =>
      i < 5
        ? [
            ...acc,
            {
              x: moment(c.time, 'X').format('ha'),
              y: `${Math.ceil(c.temp)}°`,
            },
          ]
        : acc,
    [{ x: 'Now', y: `${Math.ceil(data[0].temp)}°` }],
  );

  return (
    <GraphContainer>
      <VictoryChart
        containerComponent={<VictoryContainer />}
        padding={{ left: 20, right: 80 }}
        style={{
          parent: { color: '#fff' },
        }}>
        <VictoryLine
          style={{
            data: { stroke: '#ffffff80', strokeDasharray: '3', strokeWidth: 1 },
          }}
          interpolation="natural"
          data={graphData}
          domain={{ y: [-15, 30] }}
        />
        <VictoryScatter
          data={graphData}
          size={3}
          labels={({ datum }) => datum.y}
          style={{
            data: { fill: '#ffffff' },
            labels: {
              fontSize: 16,
              fill: '#fff',
            },
          }}
        />
        <VictoryAxis
          style={{
            axis: { stroke: 'none' },
            tickLabels: { fontSize: 16, fill: '#fff' },
          }}
        />
      </VictoryChart>
    </GraphContainer>
  );
};

export default TemperatureHourly;
