import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Icon from './Icon';
import AppText from './AppText';

class TemperatureReading extends Component {

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
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { temperature, apparentTemperature, summary, icon } = state.weather.currently;

  return { temperature, apparentTemperature, summary, icon };
};

export default connect(mapStateToProps, null)(TemperatureReading);

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
});
