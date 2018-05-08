import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import AppText from './AppText';
import ClothingDetails from './ClothingDetails';
import AccessoryDetails from './AccessoryDetails';

<<<<<<< HEAD
/**
 * renders the clothing components
 * using next day weather attributes
 * NOTE: same functionality as CurrentClothing
 * TODO: refactor
 */
class TomorrowClothing extends Component {

=======
class CurrentClothing extends Component {
  
>>>>>>> master
  render() {
    let clothingData = {
      temperature: this.props.temperatureHigh,
      cloudCover: this.props.cloudCover
    }
    let accessoryData = {
      temperature: this.props.temperatureHigh,
      apparentTemperature: this.props.apparentTemperatureHigh,
      cloudCover: this.props.cloudCover,
      precipProbability: this.props.precipProbability
    }

    return (
      <View style={styles.container}>
        <ClothingDetails data={clothingData}/>
        <View style={styles.subContainer}>
          <AccessoryDetails data={accessoryData}/>
          <AppText style={styles.daySummary}>
            {this.props.summary}
          </AppText>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    summary,
    temperatureHigh,
    apparentTemperatureHigh,
    cloudCover,
    precipProbability,
  } = state.weather.daily.data[1];

  return {
    summary,
    temperatureHigh,
    apparentTemperatureHigh,
    cloudCover,
    precipProbability,
  };
};

export default connect(mapStateToProps, null)(TomorrowClothing);

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    margin: 4,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 4,
    justifyContent: 'space-around',
  },
  daySummary: {
    fontSize: 12,
  },
});
