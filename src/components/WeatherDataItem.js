import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import AppText from './AppText';
import Icon from './Icon';

class WeatherDataItem extends Component {
  constructor(props) {
    super(props);
    this.state = this.getWeatherInfo(this.props);
  }

  getWeatherInfo(currently) {
    switch (currently.type) {
      case 'wind':
        return { title: 'Wind Speed', key: 'windSpeed', unit: 'mph', icon: 'windy' };
        break;
      case 'cloud':
        return { title: 'Cloud Cover', key: 'cloudCover', unit: '%', icon: 'cloud', percentage: true };
        break;
      case 'rainprobability':
        let typeProps = { name: 'Rain', icon: 'raindrops' }
        if (currently.precipType == 'snow') {
          typeProps = { name: 'Snow', icon: 'snowflake' }
        } else if (currently.precipType == 'sleet') {
          typeProps = { name: 'Sleet', icon: 'snowflake' }
        }
        return { title: `Chance of ${typeProps.name}`, key: 'precipProbability', unit: '%', icon: `${typeProps.icon}`, percentage: true };
        break;
      case 'rainintensity':
        let typeName = 'Rain';
        if (currently.precipType == 'snow') typeName = 'Snow';
        if (currently.precipType == 'sleet') typeName = 'Sleet';
        return { title: `${typeName} Intensity`, key: 'precipIntensity', unit: 'mmph', icon: 'umbrella' };
        break;
      case 'humidity':
        return { title: 'Humidity', key: 'humidity', unit: '%', icon: 'humidity', percentage: true };
        break;
      default:
        return { title: 'Temperature', key: 'temperature', unit: '°C', icon: 'thermometer' };
    }
  }

  render() {
    this.state = this.getWeatherInfo(this.props);
    const value = this.state.percentage
      ? Math.round(this.props[this.state.key] * 100)
      : Math.round(this.props[this.state.key]);
    let { icon, title } = this.state;
    return(
      <View style={styles.container}>
        <View style={styles.dataWrap}>
          <Icon name={icon} style={styles.icon} />
          <AppText style={styles.value}>{value + this.state.unit}</AppText>
          <AppText style={styles.title}>{title}</AppText>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { temperature, apparentTemperature, windSpeed, humidity, cloudCover, precipProbability, precipIntensity, precipType } = state.weather.currently;

  return { temperature, apparentTemperature, windSpeed, humidity, cloudCover, precipProbability, precipIntensity, precipType };
};

export default connect(mapStateToProps, null)(WeatherDataItem);

const styles = StyleSheet.create({
  container: {
    width: '30%',
    aspectRatio: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#00A588",
    padding: 4,
  },
  dataWrap: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    flex: 2,
    fontSize: 36,
  },
  value: {
    flex: 2,
    fontSize: 20,
    marginVertical: 4
  },
  title: {
    flex: 1,
    fontSize: 12,
  },
})
