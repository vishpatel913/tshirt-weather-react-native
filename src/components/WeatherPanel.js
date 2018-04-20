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
import ClothingDetails from './ClothingDetails';


class WeatherPanel extends Component {

  renderSwipeDot(active) {
    const dotStyle = {
      backgroundColor: 'rgba(0, 164, 136, 0.3)',
      width: 8,
      height: 8,
      borderRadius: 5,
      marginLeft: 5,
      marginRight: 5
    };
    if (active) dotStyle.backgroundColor = '#00A588';
    return <View style={dotStyle} />
  }

  render() {
    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper}
          dot={this.renderSwipeDot(false)}
          activeDot={this.renderSwipeDot(true)}
          paginationStyle={{
            bottom: -25
          }}
          loop={false}>
          <View style={styles.slide}>
            <AppText font="bold" style={styles.heading}>
              Today
            </AppText>
            <ClothingDetails today data={this.props.today}/>
            <Forecast style={styles.forecast} data={this.props.hourly.data} time={true} />
          </View>
          <View style={styles.slide}>
            <AppText font="bold" style={styles.heading}>
          		Tomorrow
          	</AppText>
            <ClothingDetails tomorrow data={this.props.daily.data[1]}/>
            <Forecast style={styles.forecast} data={this.props.daily.data} time={false} />
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
    // backgroundColor: '#00A5880D',
    width: '100%',
    marginBottom: 15,
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
