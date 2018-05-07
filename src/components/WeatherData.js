import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import WeatherDataItem from './WeatherDataItem';

class WeatherData extends Component {

  renderWeatherWidgets() {
    let typeList = ['cloud', 'wind', 'rainprobability'];
    if (this.props.precipProbability > 50) typeList = ['rainprobability', 'rainintensity', 'humidity']
    return typeList.map(type =>
      <WeatherDataItem type={type} key={type} />);
  }

  render() {
    return (
      <View style={styles.weatherWidgets}>
        {this.renderWeatherWidgets()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { precipProbability } = state.weather.currently;
  return { precipProbability };
};

export default connect(mapStateToProps, null)(WeatherData);

const styles = StyleSheet.create({
  weatherWidgets: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'flex-end',
  },
});
