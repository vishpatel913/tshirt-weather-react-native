import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import AppText from './AppText';
import ClothingDetails from './ClothingDetails';
import AccessoryDetails from './AccessoryDetails';

class CurrentClothing extends Component {

  render() {
    let clothingData = {
      temperature: this.props.tempAverage,
      cloudCover: this.props.cloudCoverAverage
    }
    let accessoryData = {
      temperature: this.props.tempAverage,
      apparentTemperature: this.props.appTempAverage,
      sunshine: this.props.sunshine,
      precipProbability: this.props.precipProbAverage
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

const mapStateToProps = ( state ) => {
  const { summary } = state.weather.hourly;
  const {
    sunshine,
    tempAverage,
    appTempAverage,
    // windSpeedAverage,
    precipProbAverage,
    cloudCoverAverage,
    precipIntenAverage
  } = state.weather.today;

  return {
    summary,
    sunshine,
    tempAverage,
    appTempAverage,
    // windSpeedAverage,
    precipProbAverage,
    cloudCoverAverage,
    precipIntenAverage,
  };
};

export default connect(mapStateToProps, null)(CurrentClothing);

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
    fontSize: 12
  }
});
