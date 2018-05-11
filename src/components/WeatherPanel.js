import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import AppText from './AppText';
import Forecast from './Forecast';
import ClothingDisplay from './ClothingDisplay';
import { themeColors } from '../styles/Theme';

/**
 * renders a swipe panel for use as the main data container
 */
class WeatherPanel extends Component {

  getCurrentWeatherData() {
    return {
      temperature: this.props.today.tempAverage,
      apparentTemperature: this.props.today.appTempAverage,
      cloudCover: this.props.today.cloudCoverAverage,
      sunshine: this.props.today.sunshine,
      precipProbability: this.props.today.precipProbAverage,
      summary: this.props.hourly.summary
    }
  }

  getTomorrowWeatherData() {
    return {
      temperature: this.props.daily.data[1].temperatureHigh,
      apparentTemperature: this.props.daily.data[1].apparentTemperatureHigh,
      cloudCover: this.props.daily.data[1].cloudCover,
      precipProbability: this.props.daily.data[1].precipProbability,
      summary: this.props.daily.data[1].summary
    }
  }

  /**
   * renders pagination dot for swipe panel
   */
  renderSwipeDot(active = false) {
    const dotStyle = {
      backgroundColor: themeColors.primary + '4D',
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 4,
      marginRight: 4,
    };
    if (active) dotStyle.backgroundColor = themeColors.primary;
    return <View style={dotStyle} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          dot={this.renderSwipeDot()}
          activeDot={this.renderSwipeDot(true)}
          paginationStyle={{
            bottom: Platform.select({
              ios: -24,
              android: 0,
            }),
          }}
          loop={false}>
          <View style={styles.slide}>
            <AppText font="bold" style={styles.heading}>
              Today
            </AppText>
            <ClothingDisplay data={this.getCurrentWeatherData()} />
            <Forecast data={this.props.hourly.data} time={true} />
          </View>
          <View style={styles.slide}>
            <AppText font="bold" style={styles.heading}>
              Tomorrow
            </AppText>
            <ClothingDisplay data={this.getTomorrowWeatherData()} />
            <Forecast data={this.props.daily.data} time={false} />
          </View>
        </Swiper>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { hourly, daily, today } = state.weather;
  return { hourly, daily, today };
};

export default connect(mapStateToProps, null)(WeatherPanel);

const styles = StyleSheet.create({
  container: {
    flex: 6,
    flexDirection: 'column',
    padding: 8,
    borderWidth: 1,
    borderColor: themeColors.primary + '33',
    width: '100%',
    marginTop: 4,
    marginBottom: Platform.select({
      ios: 16,
      android: 0,
    }),
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  heading: {
    textAlign: 'center',
    fontSize: 16,
  },
});
