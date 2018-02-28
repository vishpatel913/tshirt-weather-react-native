import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import AppText from './AppText';
import HourlyForecast from './HourlyForecast';



class WeatherPanel extends Component {

  render() {
    return (
      <View style={styles.container}>
      	<AppText font="bold" style={styles.heading}>
      		Hourly Forcast
      	</AppText>
      	<HourlyForecast style={styles.hourly} hours="5" />
      </View>
    );
  }
}

module.exports = WeatherPanel;

const styles = StyleSheet.create({
  container: {
    flex: 7,
    flexDirection: 'column',
    padding: 8,
    borderWidth: 1,
    borderColor: "#00A588",
  },
  heading: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
})
