import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';

import AppText from './AppText';
import Icon from './Icon';
import CurrentTemperature from './CurrentTemperature';
import WeatherPanel from './WeatherPanel';
import WeatherData from './WeatherData';

import { getWeather } from '../actions/WeatherActions';
import { getLocation } from '../actions/GeolocationActions';
import { getLongDateString, getHoursFromUnix } from '../helpers/timeHelper';
import { themeColors } from '../styles/Theme';

class Main extends Component {
  state = {
    error: '',
    refreshing: false
  }

  /**
   * sets weather details and location in the state
   * on component mount
   */
  componentDidMount() {
    this.watchId = navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        this.setState({ latitude, longitude });
        this.props.getWeather({ latitude, longitude });
        this.props.getLocation({ latitude, longitude });
      },
      // TODO: handle location errors
      error => this.setState({ error: error.message || '' }),
      { timeout: 20000, maximumage: 1000 }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ refreshing: newProps.isRefreshing });
  }

  refreshWeather() {
    // TODO: refresh position as well || at least test the watcher
    const { latitude, longitude } = this.state;
    this.props.getWeather({ latitude, longitude });
  }

  renderRefreshControl() {
    return <RefreshControl
      tintColor={themeColors.primary}
      refreshing={this.state.refreshing}
      onRefresh={this.refreshWeather.bind(this)}/>;
  }

  render() {
    let date = getLongDateString(this.props.time);
    let time = getHoursFromUnix(this.props.time, true);

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={this.renderRefreshControl()}>
        <View style={styles.headerInfo}>
          <AppText>
            <Icon name="location" size={12} color={themeColors.text}/>
            &nbsp;
            {this.props.city}
          </AppText>
          <AppText>
            {date}
          </AppText>
        </View>

        <CurrentTemperature />
        <WeatherPanel />
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
    backgroundColor: themeColors.background,
  },
  contentContainer: {
    flex: 1,
    margin: 20,
    justifyContent: 'space-between',
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: Platform.select({
      ios: 20,
      android: 0
    })
  },
  footer: {
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  footerText: {
    fontSize: 12,
    color: themeColors.primaryDark,
  },
});
