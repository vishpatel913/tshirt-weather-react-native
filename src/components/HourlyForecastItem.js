import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';

import AppText from './AppText';
import Icon from './Icon';
import { getHoursFromUnix } from '../helpers/timeHelper';

class HourlyForecastItem extends Component {
  render() {
    const { icon, temperature, time } = this.props.hourly;
    const roundedTemp = Math.round(temperature);
    const timeString = getHoursFromUnix(time, false);

    return (
      <View style={styles.container}>
        <View style={styles.dataWrap}>
          <AppText style={styles.timeStyle}>{timeString}</AppText>
          <Icon name={icon} size={28} color={'#00A588'} />
          <AppText style={styles.tempTextStyle}>{roundedTemp}°C</AppText>
        </View>
      </View>
    );
  }
};

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
    color: '#007269'
  },
  timeStyle: {
    fontSize: 12,
    marginBottom: 4
  },
}

export default HourlyForecastItem;
