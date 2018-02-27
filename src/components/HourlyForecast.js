import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import HourlyForecastItem from "./HourlyForecastItem";

class HourlyForecast extends Component {

  renderHourlyForecast(hours) {
    return this.props.data.map((hourly, index) =>
      index != 0 && index < hours && <HourlyForecastItem key={hourly.time} hourly={hourly} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHourlyForecast(this.props.hours)}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state.weather.hourly;

  return { data };
};

export default connect(mapStateToProps, null)(HourlyForecast);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
})
