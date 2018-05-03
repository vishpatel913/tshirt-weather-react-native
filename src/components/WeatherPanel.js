import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper'
import AppText from './AppText';
import Forecast from './Forecast';
import CurrentClothing from './CurrentClothing';
import TomorrowClothing from './TomorrowClothing';


class WeatherPanel extends Component {

  renderSwipeDot(active = false) {
    const dotStyle = {
      backgroundColor: '#00a4884D',
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 4,
      marginRight: 4
    };
    if (active) dotStyle.backgroundColor = '#00A588';
    return <View style={dotStyle} />
  }

  render() {
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper}
          dot={this.renderSwipeDot()}
          activeDot={this.renderSwipeDot(true)}
          paginationStyle={{
            bottom: Platform.select({
              ios: -24,
              android: 0
            }),
          }}
          loop={false}>
          <View style={styles.slide}>
            <AppText font="bold" style={styles.heading}>
              Today
            </AppText>
            <CurrentClothing />
            <Forecast data={this.props.hourly.data} time={true} />
          </View>
          <View style={styles.slide}>
            <AppText font="bold" style={styles.heading}>
          		Tomorrow
          	</AppText>
            <TomorrowClothing />
            <Forecast data={this.props.daily.data} time={false} />
          </View>
        </Swiper>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { hourly, today, daily } = state.weather;
  return { hourly, daily, today };
};

export default connect(mapStateToProps, null)(WeatherPanel);

const styles = StyleSheet.create({
  container: {
    flex: 6,
    flexDirection: 'column',
    padding: 8,
    borderWidth: 1,
    borderColor: "#00A58833",
    width: '100%',
    marginTop: 4,
    marginBottom: Platform.select({
      ios: 16,
      android: 0
    }),
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  heading: {
    textAlign: 'center',
    fontSize: 16,
  },
})
