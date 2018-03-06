import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';

import AppText from './AppText';
import CurrentTemperature from './CurrentTemperature';
import WeatherPanelView from './WeatherPanelView';
import WeatherData from './WeatherData';

import { getWeather } from '../actions/WeatherActions';
import { getLocation } from '../actions/GeolocationActions';
import { getLongDateString, getHoursFromUnix } from '../helpers/timeHelper';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

class Main extends Component {

  state = {
    error: '',
    latitude: 0,
    longitude: 0,
    refreshing: false
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.setState({ latitude, longitude });
        this.props.getWeather({ latitude, longitude });
        this.props.getLocation({ latitude, longitude });
      },
      (error) => this.setState({ error: error.message || '' }),
      { enableHighAccuracy: true, timeout: 20000, maximumage: 1000 }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ refreshing: newProps.isRefreshing });
  }

  refreshWeather() {
    const { latitude, longitude } = this.state;
    this.props.getWeather({ latitude, longitude });
  }

  renderRefreshControl() {
    return <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshWeather.bind(this)}/>;
  }

  render() {
    let date = getLongDateString(this.props.time);
    let time = getHoursFromUnix(this.props.time, true);
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} refreshControl={this.renderRefreshControl()}>
        <View style={styles.info}>
          <AppText>
            {this.props.city}
          </AppText>
          <AppText>
            {date}
          </AppText>
        </View>
        
        <CurrentTemperature />
        <WeatherPanelView />
        <WeatherData />

        <View style={styles.footer}>
          <AppText font="light" style={styles.footerText}>
            TShirt Weather
          </AppText>
          <AppText font="light" style={styles.footerText}>
            Last Updated: {time}
          </AppText>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { time } = state.weather.currently;
  const { isRefreshing } = state.refreshing;
  const { city } = state.geolocation;

  return { time, city, isRefreshing };
};

export default connect(mapStateToProps, { getWeather, getLocation })(Main);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#F3EDE7',
  },
  contentContainer: {
    flex: 1,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  footer: {
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  footerText: {
    fontSize: 12,
  },
});
