import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import AppText from './AppText';
import Icon from './Icon';
// import { getIconSource } from '../helpers/iconHelper';

const WEATHER_DATA = {
  wind: {
    description: 'Wind Speed',
    key: 'windSpeed',
    unit: 'km/h',
    icon: 'wind'
  },
  cloud: {
    description: 'Cloud Cover',
    key: 'cloudCover',
    unit: '%',
    icon: 'cloud'
  },
  rain: {
    description: 'Chance of Rain',
    key: 'precipProbability',
    unit: '%',
    icon: 'raindrops'
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
          <Icon name={this.state.icon} style={styles.icon} />
          <AppText style={styles.value}>{value}</AppText>
          <AppText style={styles.title}>{this.state.title}</AppText>
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
    padding: 4,
  },
  dataWrap: {
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1
  },
  icon: {
    flex: 2,
    fontSize: 36,
  },
  value: {
    flex: 2,
    fontSize: 20,
    paddingVertical: 2
  },
  title: {
    flex: 1,
    fontSize: 12,
    // justifyContent:'flex-end',
  },
})
