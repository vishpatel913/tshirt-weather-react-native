import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';
import { connect } from 'react-redux';
import AppText from './AppText';
import { getImageSource } from '../helpers/imageHelper';
import { getHoursFromUnix } from '../helpers/timeHelper';

class ClothingDetails extends Component {

  getClothingDetails() {
    var { tempAverage, cloudCoverAverage, windSpeedAverage } = this.props;
    // var windConst = 0.5 * (9 - windSpeedAverage);
    var cloudConst = 6 * cloudCoverAverage;
    if (tempAverage > cloudConst + 18) {
      console.log("TShirtTempEquation", `${tempAverage} > ${cloudConst} + 18`);
      return {
        image: 'tshirt',
        caption: `It's T-shirt Weather!`
      }
    } else if (tempAverage > cloudConst + 12) {
      console.log("JacketTempEquation", `${tempAverage} > ${cloudConst} + 12`);
      return {
        image: 'jacket',
        caption: `Maybe a light jacket`
      }
    } else if (tempAverage > cloudConst + 6) {
      console.log("HoodieTempEquation", `${tempAverage} > ${cloudConst} + 6`);
      return {
        image: 'hoodie',
        caption: `Hoodie or jumper`
      }
    } else {
      console.log("CoatTempEquation", `${tempAverage} < ${cloudConst} + 6`);
      return {
        image: 'coat',
        caption: `Coat or layer up`
      }
    }
  }

  renderSubImages() {
    var {
      tempAverage,
      appTempAverage,
      sunshine,
      precipProbAverage,
      precipProbability,
      sunsetTime,
      sunriseTime
    } = this.props;

    var time = getHoursFromUnix(Date.now()/1000);
    var sunny = (sunshine.average > 0.65 || sunshine.max > 0.75);
    var cold = tempAverage < 1 || appTempAverage < 3;
    var rain = precipProbAverage > 0.6 || precipProbability > 0.75;
    var subArray = [];
    if (sunny && subArray.length < 2) subArray.push('sunglasses');
    if (cold && subArray.length < 2) subArray.push('winter');
    if (rain && subArray.length < 2) subArray.push('umbrella');
    return subArray.map((image) =>
      <Image
        source={getImageSource(image)}
        style={styles.subImage}
        key={image}
        resizeMode='contain'/>
    );
  }

  render() {
    var details = this.getClothingDetails();
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Image
            source={getImageSource(details.image)}
            style={styles.clothingImage}
            resizeMode='contain'/>
          <AppText style={styles.clothingCaption}>
            {details.caption}
          </AppText>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.subImageContainer}>
            {this.renderSubImages()}
          </View>
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
    sunriseTime,
    sunsetTime,
    sunshine,
    tempAverage,
    appTempAverage,
    // windSpeedAverage,
    precipProbAverage,
    cloudCoverAverage,
    precipIntenAverage
  } = state.weather.today;
  const {
    temperature,
    apparentTemperature,
    // windSpeed,
    cloudCover,
    precipProbability,
    precipIntensity
  } = state.weather.currently;
  const daily = state.weather.daily;

  return {
    summary,
    sunriseTime,
    sunsetTime,
    sunshine,
    tempAverage,
    appTempAverage,
    // windSpeedAverage,
    precipProbAverage,
    cloudCoverAverage,
    precipIntenAverage,
    temperature,
    apparentTemperature,
    // windSpeed,
    cloudCover,
    precipProbability,
    precipIntensity,
    daily
  };
};

export default connect(mapStateToProps, null)(ClothingDetails);

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    margin: 4,
  },
  clothingImage: {
    tintColor: '#007269',
    flex: 1,
    height: undefined,
    width: undefined
  },
  clothingCaption: {
    fontSize: 12,
    textAlign: 'center'
  },
  subContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 4,
    justifyContent: 'space-around',
  },
  subImageContainer: {
    // flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  subImage: {
    // flex: 1,
    // height: undefined,
    padding: 4,
    tintColor: '#00A588',
    width: "50%",
    aspectRatio: 1,
  },
  daySummary: {
    // flex: 3,
    fontSize: 12
    // justifyContent: 'flex-end',
  }
});
