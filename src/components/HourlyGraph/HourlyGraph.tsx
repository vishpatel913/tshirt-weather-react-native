import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
} from 'victory-native';
import { useWeather } from '../../modules/weatherContext';
import { WeatherIcon, Text } from '..';

interface Props {
  data?: NodeProps[];
  domain?: [number, number];
}

interface NodeProps {
  x: string;
  y: number;
  label?: string;
  timestamp?: number;
  icon?: number;
  additional?: string;
}

const GraphContainer = styled.View``;
const NodeContainer = styled.View<{ x: number; y: number }>`
  position: absolute;
  align-items: center;
  left: ${({ x }) => x - 16}px;
  bottom: ${({ y }) => 32 - y}px;
`;
const NodeAdditional = styled(Text)`
  left: 30%;
`;

const NodeLabel = ({
  x,
  y,
  datum: { label, timestamp, icon, additional },
}: any) => (
  <NodeContainer x={x} y={y}>
    {additional && (
      <NodeAdditional weight="bold" size={12}>
        {additional}
      </NodeAdditional>
    )}
    {icon && <WeatherIcon id={icon} timestamp={timestamp} size={28} />}
    <Text size={20} weight="bold">
      {label}
    </Text>
  </NodeContainer>
);

const HourlyGraph = ({ data = [], domain }: Props) => {
  const { isLoading } = useWeather();
  let domainY = domain || [0, 0];
  const graphData = data.slice(0, 6);
  domainY = [
    Math.min(...graphData.map((i) => i.y)) - domainY[0],
    Math.max(...graphData.map((i) => i.y)) + domainY[1],
  ];

  return (
    <GraphContainer>
      <VictoryChart
        height={200}
        domain={{ y: domainY }}
        domainPadding={{ y: [10, 120] }}
        padding={{ left: 20, right: 100, bottom: 64 }}
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
          fixLabelOverlap
          tickFormat={(t, i) => (i > 0 ? t : 'NOW')}
          tickLabelComponent={isLoading ? <View /> : <VictoryLabel />}
        />
      </VictoryChart>
    </GraphContainer>
  );
};

export default HourlyGraph;
