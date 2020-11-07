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
import { roundValue } from '../../modules/utils';
import { WeatherCode, WeatherNumberValue } from '../../types/weather';
import { useWeather } from '../../modules/weatherContext';
import { WeatherIcon, Text } from '..';

interface Props {
  data?: NodeProps[];
  domain?: [number, number];
}

interface NodeProps {
  x: string;
  y: number;
  unit?: string;
  timestamp?: string;
  icon?: keyof typeof WeatherCode;
  additional?: WeatherNumberValue;
}

const GraphContainer = styled.View``;
const NodeContainer = styled.View<{ x: number; y: number }>`
  position: absolute;
  align-items: center;
  left: ${({ x }) => x - 16}px;
  bottom: ${({ y }) => 16 - y}px;
`;
const NodeAdditional = styled.View<{ col: boolean }>`
  left: 16px;
  flex-direction: ${({ col }) => (col ? 'column' : 'row')};
  align-items: baseline;
`;

const NodeLabel = ({
  x,
  y,
  datum,
  datum: { units, timestamp, icon, additional },
}: any) => (
  <NodeContainer x={x} y={y}>
    {additional?.value > 0 && (
      <NodeAdditional col={additional.units.length > 3}>
        <Text weight="bold" size={12}>
          {roundValue(additional.value)}
        </Text>
        <Text weight="bold" size={additional.units.length > 3 ? 8 : 12}>
          {additional.units}
        </Text>
      </NodeAdditional>
    )}
    {icon && (
      <WeatherIcon
        name={icon !== 'none' ? icon : 'drizzle'}
        timestamp={timestamp}
      />
    )}
    {datum.y > 0 && (
      <Text size={20} weight="bold">
        {roundValue(datum.y)}
        {units && units}
      </Text>
    )}
  </NodeContainer>
);

const HourlyGraph = ({ data = [], domain }: Props) => {
  const { isLoading } = useWeather();
  const domainY: Props['domain'] = [
    Math.min(...data.map((i) => i.y)) - (domain?.[0] || 0),
    Math.max(...data.map((i) => i.y)) + (domain?.[1] || 0.1),
  ];

  return (
    <GraphContainer>
      <VictoryChart
        height={160}
        domain={{ y: domainY }}
        domainPadding={{ y: [10, 120] }}
        padding={{ left: 20, right: 100, bottom: 36, top: 0 }}
        style={{ parent: { color: '#fff' } }}>
        <VictoryLine
          data={data}
          interpolation="monotoneX"
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
          data={data}
          size={3}
          labels={() => null}
          labelComponent={<NodeLabel />}
          style={{
            data: { fill: '#ffffff' },
            labels: {
              fontSize: 20,
              fill: '#fff',
            },
          }}
        />
        <VictoryScatter
          style={{ data: { fill: '#ffffff' } }}
          size={4}
          data={data.slice(0, 1)}
        />
        <VictoryScatter
          style={{ data: { fill: '#fff3' } }}
          size={10}
          data={data.slice(0, 1)}
        />
        <VictoryBar
          data={data}
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
            tickLabels: {
              fontSize: 16,
              fill: '#fff',
              fontFamily: 'WorkSans-Regular',
            },
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
