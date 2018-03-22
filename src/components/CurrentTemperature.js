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
    var time = getHoursFromUnix(Date.now()/1000);
    if (time > sunsetTime) {
      return(
        <View style={styles.sunContainer}>
          <Icon name='sunrise' size={20} color={'#666666'}/>
          <AppText style={styles.fontSmall}>{sunriseTime[1]}</AppText>
        </View>
      );
    } else {
      var day = sunriseTime[0] < time && time < sunsetTime;
      const sunObj = day
        ? { time: sunsetTime, icon: 'sunset'}
        : { time: sunriseTime[0], icon: 'sunrise'};
      return(
        <View style={styles.sunContainer}>
          <Icon name={sunObj.icon} size={20} color={'#666666'}/>
          <AppText style={styles.fontSmall}>{sunObj.time}</AppText>
        </View>
      );
    }
  }

  render() {
    const { temperature, apparentTemperature, summary, icon } = this.props;
    return(
        <View style={styles.container}>
          <View style={[styles.rowContainer, styles.tempRowAlign]}>
            <View style={styles.tempContainer}>
              <AppText font="light" style={styles.temperatureValue}>
                {temperature}&deg;C
              </AppText>
            </View>
            <View style={styles.infoContainer}>
              <Icon name={icon} size={72} color={'#00A588'} style={styles.textCenter} />
              <AppText style={styles.summaryText}>
                {summary}
              </AppText>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.tempContainer}>
              <AppText font="light" style={styles.fontMedium}>
                Feels like {apparentTemperature}&deg;C
              </AppText>
            </View>
            <View style={styles.infoContainer}>
              {this.renderSunData()}
            </View>
          </View>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    temperature,
    apparentTemperature,
    summary,
    icon
  } = state.weather.currently;
  const {
    sunriseTime,
    sunsetTime
  } = state.weather.today;

  return {
    temperature,
    apparentTemperature,
    summary,
    icon,
    sunriseTime,
    sunsetTime
  };
};

export default connect(mapStateToProps, null)(CurrentTemperature);

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    flexDirection: 'column',
    margin: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'flex-end',
    margin: 4,
  },
  tempRowAlign: {
    flex: 1,
    alignItems: 'center',
  },
  tempContainer: {
    flex: 2,
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  temperatureValue: {
    fontSize: 88,
    color: '#00A588',
    textAlignVertical: 'bottom',
  },
  summaryText: {
    color: '#007269',
    fontSize: 16,
    textAlign: 'center',
  },
  fontLarge: {
    fontSize: 18,
  },
  fontMedium: {
    fontSize: 16,
  },
  fontSmall: {
    fontSize: 12,
  },
  textCenter: {
    textAlign: 'center',
  },
  sunContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
