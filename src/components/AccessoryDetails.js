import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { getImageSource } from '../helpers/imageHelper';
import { themeColors } from '../styles/Theme';

/**
 * renders up to two sub-images
 * based on the weather attributes passed in from the state
 */
class AccessoryDetails extends Component {

  renderSubImages() {
    let {
      temperature,
      apparentTemperature,
      sunshine,
      cloudCover,
      precipProbability,
    } = this.props.data;

    let sunny = sunshine
      ? sunshine.average > 0.65 || sunshine.max > 0.75
      : cloudCover < 0.35;
    let cold = temperature < 1 || apparentTemperature < 3;
    let rain = precipProbability > 0.6;

    let imgArray = [];
    if (sunny && imgArray.length < 2) imgArray.push('sunglasses');
    if (cold && imgArray.length < 2) imgArray.push('winter');
    if (rain && imgArray.length < 2) imgArray.push('umbrella');

    return imgArray.map((image) =>
      <Image
        source={getImageSource(image)}
        style={styles.smallImage}
        key={image}
        resizeMode='contain'/>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSubImages()}
      </View>
    );
  }
}

export default AccessoryDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  smallImage: {
    padding: 4,
    tintColor: themeColors.primary,
    width: "50%",
    aspectRatio: 1,
  },
});
