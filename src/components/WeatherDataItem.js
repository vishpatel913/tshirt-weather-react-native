import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import AppText from './AppText';
import Icon from './Icon';
import { themeColors } from '../styles/Theme';

/**
 * renders single weather data component
 * displaying an icon, title and value
 * based on a key passed in
 */
class WeatherDataItem extends Component {
  constructor(props) {
    super(props);
    this.state = this.getWeatherInfo(this.props);
  }

  /**
   * gets a weather object
   * based on the passed in key
   * TODO: refactor to take in relavent data as component
   */
  getWeatherInfo(currently) {
    let rainTypeProps;
    let rainTypeName;
    switch (currently.type) {
      case 'wind':
        return {
          title: 'Wind Speed', key: 'windSpeed', unit: 'mph', icon: 'windy',
        };
      case 'cloud':
        return {
          title: 'Cloud Cover', key: 'cloudCover', unit: '%', icon: 'cloud', percentage: true,
        };
      case 'rainprobability':
        rainTypeProps = { name: 'Rain', icon: 'raindrops' };
        if (currently.precipType === 'snow') {
          rainTypeProps = { name: 'Snow', icon: 'snowflake' };
        } else if (currently.precipType === 'sleet') {
          rainTypeProps = { name: 'Sleet', icon: 'snowflake' };
        }
        return {
          title: `Chance of ${rainTypeProps.name}`,
          key: 'precipProbability',
          unit: '%',
          icon: `${rainTypeProps.icon}`,
          percentage: true,
        };
      case 'rainintensity':
        rainTypeName = 'Rain';
        if (currently.precipType === 'snow') rainTypeName = 'Snow';
        if (currently.precipType === 'sleet') rainTypeName = 'Sleet';
        return {
          title: `${rainTypeName} Intensity`, key: 'precipIntensity', unit: 'mmph', icon: 'umbrella',
        };
      case 'humidity':
        return {
          title: 'Humidity', key: 'humidity', unit: '%', icon: 'humidity', percentage: true,
        };
      default:
        return {
          title: 'Temperature', key: 'temperature', unit: '°C', icon: 'thermometer',
        };
    }
  }

  render() {
    this.state = this.getWeatherInfo(this.props);
    const value = this.state.percentage
      ? Math.round(this.props[this.state.key] * 100)
      : Math.round(this.props[this.state.key]);
    const { icon, title } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.dataWrap}>
          <Icon name={icon} size={36} color={themeColors.primary} style={styles.icon} />
          <AppText style={styles.value}>{value + this.state.unit}</AppText>
          <AppText style={styles.title}>{title}</AppText>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    temperature,
    apparentTemperature,
    windSpeed,
    humidity,
    cloudCover,
    precipProbability,
    precipIntensity,
    precipType,
  } = state.weather.currently;

  return {
    temperature,
    apparentTemperature,
    windSpeed,
    humidity,
    cloudCover,
    precipProbability,
    precipIntensity,
    precipType,
  };
};

export default connect(mapStateToProps, null)(WeatherDataItem);

const styles = StyleSheet.create({
  container: {
    width: '30%',
    aspectRatio: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: themeColors.primary + '0D',
    padding: 4,
  },
  dataWrap: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    flex: 2,
  },
  value: {
    flex: 2,
    fontSize: 20,
    marginVertical: 4,
    color: themeColors.primaryDark,
  },
  title: {
    flex: 1,
    fontSize: 12,
  },
});
