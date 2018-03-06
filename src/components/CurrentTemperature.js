import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Icon from './Icon';
import AppText from './AppText';

import { getHoursFromUnix } from '../helpers/timeHelper';

class CurrentTemperature extends Component {

  renderSunData() {
    const { sunriseTime, sunsetTime } = this.props;
    let time = getHoursFromUnix(Date.now()/1000);
    if (time > sunsetTime) {
      return;
    } else {
      let day = sunriseTime < time && time < sunsetTime;
      const sunObj = day ? { time: sunsetTime, icon: 'sunset'} : { time: sunriseTime, icon: 'sunrise'};
      return(
        <View style={styles.sunContainer}>
          <Icon name={sunObj.icon} size={20}/>
          <AppText style={styles.fontSmall}>{sunObj.time}</AppText>
        </View>
      );
    }
  }

  render() {
    const { temperature, apparentTemperature, summary, icon } = this.props;
    return(
      <View style={styles.container}>
        <View style={styles.tempContainer}>
          <AppText font="light" style={styles.temperatureValue}>
            {temperature}&deg;C
          </AppText>
          <Icon name={icon} size={60}/>
        </View>
        <AppText style={styles.fontMedium}>{summary}</AppText>
        <AppText style={styles.fontSmall}>Feels like {apparentTemperature}&deg;C</AppText>
        {this.renderSunData()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { temperature, apparentTemperature, summary, icon } = state.weather.currently;
  const { sunriseTime, sunsetTime } = state.weather.today;

  return { temperature, apparentTemperature, summary, icon, sunriseTime, sunsetTime };
};

export default connect(mapStateToProps, null)(CurrentTemperature);

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperatureValue: {
    fontSize: 48,
  },
  fontMedium: {
    fontSize: 18,
  },
  fontMedium: {
    fontSize: 16,
  },
  fontSmall: {
    fontSize: 12,
  },
  sunContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8
  },
});
