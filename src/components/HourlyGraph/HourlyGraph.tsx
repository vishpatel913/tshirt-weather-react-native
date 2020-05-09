import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryBar,
  VictoryAxis,
} from 'victory-native';
import { WeatherIcon, Text } from '..';

interface Props {
  data?: NodeProps[];
}

interface NodeProps {
  x: string;
  y: number;
  label?: string;
  timestamp?: number;
  icon?: number;
  additional?: number;
}

const GraphContainer = styled.View``;
const NodeContainer = styled.View<{ x: number; y: number }>`
  position: absolute;
  align-items: center;
  left: ${({ x }) => x - 16}px;
  top: ${({ y }) => y - 88}px;
`;
const NodeAdditional = styled(Text)`
  left: 30%;
`;

const NodeLabel = ({
  x,
  y,
  datum: { additional, icon, timestamp, label },
}: any) => (
  <NodeContainer x={x} y={y}>
    {additional && (
      <NodeAdditional weight="bold" size={16}>
        {additional}
      </NodeAdditional>
    )}
    {icon && <WeatherIcon id={icon} timestamp={timestamp} size={28} />}
    <Text size={20} weight="bold">
      {label}
    </Text>
  </NodeContainer>
);

const HourlyGraph = ({ data = [] }: Props) => {
  const graphData = data.slice(0, 6);
  const domainY: [number, number] = [
    Math.min(...graphData.map((i) => i.y)) - 2,
    Math.max(...graphData.map((i) => i.y)) + 10,
  ];
  return (
    <GraphContainer>
      <VictoryChart
        domain={{ y: domainY }}
        padding={{ left: 20, right: 100, bottom: 72 }}
        style={{
          parent: { color: '#fff' },
        }}>
        <VictoryLine
          data={graphData}
          interpolation="natural"
          labelComponent={<View />}
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
          labels={() => ''}
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
          labelComponent={<View />}
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

export default HourlyGraph;
