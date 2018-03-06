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
          <Icon name={icon} style={styles.iconStyle} />
          <AppText style={styles.tempTextStyle}>{roundedTemp}°C</AppText>
          <AppText style={styles.timeStyle}>{timeString}</AppText>
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
    borderWidth: 1,
    borderColor: "#00A588",
    padding: 4,
    margin: 4,
  },
  dataWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  iconStyle: {
    fontSize: 28,
  },
  tempTextStyle: {
    fontSize: 16,
    padding: 4,
  },
  timeStyle: {
    fontSize: 12,
  },
}

export default HourlyForecastItem;
