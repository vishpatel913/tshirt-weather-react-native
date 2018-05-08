import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import ForecastItem from './ForecastItem';
import { themeColors } from '../styles/Theme';

/**
 * renders regular readings of temperature
 * using data passed in as properties
 */
class Forecast extends Component {

  renderForecast(number) {
    return this.props.data.map((data, index) =>
      index !== 0
      && index <= number
      && <ForecastItem key={JSON.stringify(data)} data={data} showTime={this.props.time} />);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderForecast(4)}
      </View>
    );
  }
}

export default Forecast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderColor: themeColors.primary + '33',
    marginBottom: Platform.select({
      android: 4,
    }),
  },
});
