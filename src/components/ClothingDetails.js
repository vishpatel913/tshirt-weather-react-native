import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';
import AppText from './AppText';
import { getImageSource } from '../helpers/imageHelper';

class ClothingDetails extends Component {

  getClothingDetails() {
    var { temperature, cloudCover } = this.props.data;
    var cloudConst = 6 * cloudCover;
    if (temperature > cloudConst + 18) {
      console.log("TShirtTempEquation", `${temperature} > ${cloudConst} + 18`);
      return {
        image: 'tshirt',
        caption: `It's T-shirt Weather!`
      }
    } else if (temperature > cloudConst + 12) {
      console.log("JacketTempEquation", `${temperature} > ${cloudConst} + 12`);
      return {
        image: 'jacket',
        caption: `Maybe a light jacket`
      }
    } else if (temperature > cloudConst + 6) {
      console.log("HoodieTempEquation", `${temperature} > ${cloudConst} + 6`);
      return {
        image: 'hoodie',
        caption: `Hoodie or jumper`
      }
    } else {
      console.log("CoatTempEquation", `${temperature} < ${cloudConst} + 6`);
      return {
        image: 'coat',
        caption: `Coat or layer up`
      }
    }
  }

  render() {
    var details = this.getClothingDetails();
    return (
      <View style={styles.container}>
        <Image
          source={getImageSource(details.image)}
          style={styles.clothingImage}
          resizeMode='contain'/>
        <AppText style={styles.clothingCaption}>
          {details.caption}
        </AppText>
      </View>
    );
  }
}

export default ClothingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 4,
    justifyContent: 'space-around',
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
  }
});
