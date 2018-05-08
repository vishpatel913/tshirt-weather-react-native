import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from './Icon';
import AppText from './AppText';
import { getHoursFromUnix } from '../helpers/timeHelper';
import { themeColors } from '../styles/Theme';

/**
 * renders a header component
 * displaying current temperature, icon and summary
 * based on the weather attributes passed in from the state
 */
class CurrentTemperature extends Component {

  /**
   * renders either the apparent temperature
   * or the temperature high and low
   * based on the current temperature values
   */
  renderFeelsLikeData() {
    const { temperature, apparentTemperature, tempHigh, tempLow } = this.props;

    if (apparentTemperature !== temperature) {
      return (
        <AppText font="light" style={styles.fontMedium}>
          Feels like {apparentTemperature}&deg;C
        </AppText>
      );
    } else {
      return(
        <AppText font="light" style={styles.fontMedium}>
          <Icon name="arrow-up" color={themeColors.text}/>
          {tempHigh}&deg;C &nbsp;
          <Icon name="arrow-down" color={themeColors.text}/>
          {tempLow}&deg;C
        </AppText>
      );
    }
  }

  /**
   * renders a sundown/sunrise time with relavant icon
   * based on the current time
   */
  renderSunData() {
    const { sunriseTime, sunsetTime } = this.props;
    let time = getHoursFromUnix(Date.now()/1000);
    if (time > sunsetTime) {
      return(
        <View style={styles.sunContainer}>
          <Icon name='sunrise' size={20} color={'#666666'} />
          <AppText style={styles.fontSmall}>{sunriseTime[1]}</AppText>
        </View>
      );
    } else {
      let day = sunriseTime[0] < time && time < sunsetTime;
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
    const { temperature, summary, icon } = this.props;

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
              {this.renderFeelsLikeData()}
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
    sunsetTime,
    tempHigh,
    tempLow,
  } = state.weather.today;

  return {
    temperature,
    apparentTemperature,
    tempHigh,
    tempLow,
    summary,
    icon,
    sunriseTime,
    sunsetTime,
  };
};

export default connect(mapStateToProps, null)(CurrentTemperature);

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    flexDirection: 'column',
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
    color: themeColors.primary,
    textAlignVertical: 'bottom',
  },
  summaryText: {
    color: themeColors.primaryDark,
    fontSize: 16,
    textAlign: 'center',
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
