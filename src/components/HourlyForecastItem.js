import React, { Component } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
// import { getIconSource } from '../helpers/iconHelper';
import { getHoursFromUnix } from '../helpers/timeHelper';

class HourlyForecastItem extends Component {
  render() {
    const { icon, temperature, time } = this.props.hourly;
    // const iconSource = getIconSource(icon);
    const roundedTemp = Math.round(temperature);
    const timeString = getHoursFromUnix(time, false);

    return (
      <View style={styles.container}>
        <View style={styles.dataWrap}>
          <Text style={styles.tempTextStyle}>{roundedTemp}°C</Text>
          <Text style={styles.iconStyle}>o</Text>
          {// <Image source={iconSource} style={styles.iconStyle} />
          }
          <Text style={styles.timeStyle}>{timeString}</Text>
        </View>

      </View>
    );
  }
};

const styles = {
  container: {
    // width: '20%',
    flex: 1,
    aspectRatio: 1,
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
    padding: 4,
  },
  timeStyle: {
    // flex: 1,
    // paddingBottom: 2
  },
  tempTextStyle: {
    // flex: 1,
    // marginVertical: 2
  }
}

export default HourlyForecastItem;
