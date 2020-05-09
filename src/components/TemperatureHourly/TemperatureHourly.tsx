import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryBar,
  VictoryAxis,
} from 'victory-native';
import { WeatherIcon, Text } from '..';

interface Props {
  data: NodeProps[];
}

interface NodeProps {
  x: number;
  y: number;
  label?: string;
  data?: DataProps;
}

type DataProps = {
  icon: number;
  percentage?: number;
};

const GraphContainer = styled.View``;
const NodeContainer = styled.View<{ x: number; y: number }>`
  position: absolute;
  align-items: center;
  left: ${({ x }) => x - 16}px;
  top: ${({ y }) => y - 88}px;
`;
const NodePercentage = styled(Text)`
  left: 30%;
`;

const NodeLabel = ({ x, y, datum }: any) => {
  const { data } = datum;
  return (
    <NodeContainer x={x} y={y}>
      {data.percentage && (
        <NodePercentage weight="bold" size={16}>
          {data.percentage * 100}%
        </NodePercentage>
      )}
      <WeatherIcon id={data.icon} timestamp={datum.timestamp} size={28} />
      <Text size={20} weight="bold">
        {datum.y}°
      </Text>
    </NodeContainer>
  );
};

const TemperatureHourly = ({ data }: Props) => {
  const graphData = data.slice(0, 6).map((item, i) => ({
    ...item,
    timestamp: item.x,
    x: i > 0 ? moment(item.x, 'X').format('ha') : 'NOW',
  }));
  const domain: [number, number] = [
    Math.min(...graphData.map((i) => i.y)) - 2,
    Math.max(...graphData.map((i) => i.y)) + 10,
  ];
  return (
    <GraphContainer>
      <VictoryChart
        padding={{ left: 20, right: 100, bottom: 72 }}
        style={{
          parent: { color: '#fff' },
        }}>
        <VictoryLine
          data={graphData}
          interpolation="natural"
          domain={{ y: domain }}
          style={{
            data: {
              stroke: '#fff',
              strokeOpacity: 0.5,
              strokeDasharray: '3',
              strokeWidth: 1,
            },
          }}
        />
        <VictoryScatter
          data={graphData}
          size={3}
          labels={({ datum }) => `${datum.y}`}
          labelComponent={<NodeLabel />}
          style={{
            data: { fill: '#ffffff' },
            labels: {
              fontSize: 20,
              fill: '#fff',
            },
          }}
        />
        <VictoryBar
          data={graphData}
          barWidth={1}
          domain={{ y: domain }}
          style={{
            data: {
              fill: '#fff',
              opacity: 0.25,
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
