import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
// import { getIconSource } from '../helpers/iconHelper';

const WEATHER_DATA = {
  wind: {
    description: 'Wind Speed',
    key: 'windSpeed',
    unit: 'km/h',
    icon: "O"
  },
  cloud: {
    description: 'Cloud Cover',
    key: 'cloudCover',
    unit: '%',
    icon: "O"
  },
  rain: {
    description: 'Chance of Rain',
    key: 'precipProbability',
    unit: '%',
    icon: "O"
  }
}

class WeatherIconWidget extends Component {
  constructor(props) {
    super(props);

    const weatherData = WEATHER_DATA[this.props.type];
    this.state = {
      title: weatherData.description,
      key: weatherData.key,
      unit: weatherData.unit,
      icon: weatherData.icon
    }
  }

  render() {
    const value = Math.round(this.props[this.state.key]) + this.state.unit;
    return(
      <View style={styles.container}>
        <View style={styles.dataWrap}>
          <Text style={styles.icon}>{this.state.icon}</Text>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.title}>{this.state.title}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { temperature, apparentTemperature, windSpeed, cloudCover, precipProbability } = state.weather.currently;

  return { temperature, apparentTemperature, windSpeed, cloudCover, precipProbability };
};

export default connect(mapStateToProps, null)(WeatherIconWidget);

const styles = StyleSheet.create({
  container: {
    width: '30%',
    aspectRatio: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: "#00A588",
    paddingVertical: 12,
    paddingHorizontal: 4
  },
  dataWrap: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    flex: 1,
    fontSize: 12
  },
  value: {
    flex: 1,
    fontSize: 20,
    paddingVertical: 2
  },
  icon: {
    flex: 1,
  }
})
