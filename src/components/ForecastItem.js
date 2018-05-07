import React, { Component } from 'react';
import { View } from 'react-native';

import AppText from './AppText';
import Icon from './Icon';
import { getHoursFromUnix, getDayOfWeek } from '../helpers/timeHelper';

class ForecastItem extends Component {
  render() {
    const { icon, temperature, temperatureMax, time } = this.props.data;
    const roundedTemp = Math.round(temperature) || Math.round(temperatureMax);
    const label = this.props.showTime ? getHoursFromUnix(time) : getDayOfWeek(time, true);

    return (
      <View style={styles.container}>
        <View style={styles.dataWrap}>
          <AppText style={styles.labelStyle}>{label}</AppText>
          <Icon name={icon} size={28} color={'#00A588'} />
          <AppText style={styles.tempTextStyle}>{roundedTemp}°C</AppText>
        </View>
      </View>
    );
  }
};

export default ForecastItem;

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 8,
  },
  dataWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  tempTextStyle: {
    fontSize: 20,
    color: '#007269',
  },
  labelStyle: {
    fontSize: 12,
    marginBottom: 4,
  },
};
