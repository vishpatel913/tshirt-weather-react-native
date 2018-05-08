import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import AppText from './AppText';
import { getImageSource } from '../helpers/imageHelper';
import { themeColors } from '../styles/Theme';

/**
 * renders a main clothing image
 * based on the weather attributes passed in from the state
 */
class ClothingDetails extends Component {

  getClothingDetails() {
    let { temperature, cloudCover } = this.props.data;

    let cloudConst = 6 * cloudCover;
    if (temperature >= cloudConst + 18) {
      console.log("TShirtTempEquation", `${temperature} > ${cloudConst} + 18`);
      return {
        image: 'tshirt',
        caption: `It's T-shirt Weather!`
      }
    } else if (temperature >= cloudConst + 12) {
      console.log("JacketTempEquation", `${temperature} > ${cloudConst} + 12`);
      return {
        image: 'jacket',
        caption: `Maybe a light jacket`
      }
    } else if (temperature >= cloudConst + 6) {
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
    let details = this.getClothingDetails();
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
    tintColor: themeColors.primaryDark,
    flex: 1,
    height: undefined,
    width: undefined
  },
  clothingCaption: {
    fontSize: 12,
    textAlign: 'center'
  }
});
