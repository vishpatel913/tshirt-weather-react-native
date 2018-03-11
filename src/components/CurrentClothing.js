import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';
import { connect } from 'react-redux';
import AppText from './AppText';
import { getImageSource } from '../helpers/imageHelper';
import { getHoursFromUnix } from '../helpers/timeHelper';

class CurrentClothing extends Component {

  getClothingDetails() {
    let { averageTemp, averageCloud, averageWindSpeed } = this.props;
    // let windConst = 0.5 * (9 - averageWindSpeed);
    let cloudConst = 6 * averageCloud;
    if (averageTemp > cloudConst + 18) {
      return {
        image: 'tshirt',
        caption: `It's T-shirt weather`
      }
    } else if (averageTemp > cloudConst + 12) {
      return {
        image: 'jacket',
        caption: `Maybe a light jacket`
      }
    } else if (averageTemp > cloudConst + 6) {
      return {
        image: 'hoodie',
        caption: `Hoodie or jumper`
      }
    } else {
      return {
        image: 'coat',
        caption: `Wrap up warm`
      }
    }
  }

  renderSubImages() {
    let { averageTemp, averageAppTemp, averageCloud, averagePrecipProb, sunsetTime, sunriseTime } = this.props;
    let time = getHoursFromUnix(Date.now()/1000);
    let sunny = averageCloud < 0.35 && time < sunsetTime && time > sunriseTime[0];
    let cold = averageTemp < 1 || averageAppTemp < 3;
    let rain = averagePrecipProb > 0.6;
    var subArray = [];
    if (sunny && subArray.length < 2) subArray.push('sunglasses');
    if (cold && subArray.length < 2) subArray.push('winter');
    if (rain && subArray.length < 2) subArray.push('umbrella');
    return subArray.map((image) =>
      <Image source={getImageSource(image)} style={styles.subImage} key={image} resizeMode='contain'/>
    );
  }

  render() {
    let details = this.getClothingDetails();
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Image source={getImageSource(details.image)} style={styles.clothingImage} resizeMode='contain'/>
          <AppText style={styles.clothingCaption}>{details.caption}</AppText>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.subImageContainer}>
            {this.renderSubImages()}
          </View>
          <AppText style={styles.daySummary}>{this.props.summary}</AppText>
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
    averageTemp,
    averageAppTemp,
    // averageWindSpeed,
    averagePrecipProb,
    averageCloud,
    // minCloud,
    // maxCloud,
    maxPrecipInten
  } = state.weather.today;
  const {
    temperature,
    apparentTemperature,
    // windSpeed,
    cloudCover,
    precipProbability,
    precipIntensity
  } = state.weather.currently;

  return {
    summary,
    sunriseTime,
    sunsetTime,
    averageTemp,
    averageAppTemp,
    // averageWindSpeed,
    averagePrecipProb,
    averageCloud,
    // minCloud,
    // maxCloud,
    maxPrecipInten,
    temperature,
    apparentTemperature,
    // windSpeed,
    cloudCover,
    precipProbability,
    precipIntensity
  };
};

export default connect(mapStateToProps, null)(CurrentClothing);

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    padding: 4,
  },
  clothingImage: {
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
    padding: 4,
    justifyContent: 'space-around',
  },
  subImageContainer: {
    // flex: 1,
    flexDirection: 'row',
  },
  subImage: {
    // flex: 1,
    // height: undefined,
    width: "50%",
    aspectRatio: 1,
    padding: 8,
  },
  daySummary: {
    // flex: 1,
    justifyContent: 'flex-end',
  }
});
