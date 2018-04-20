import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';
import { getImageSource } from '../helpers/imageHelper';

class AccessoryDetails extends Component {

  renderSubImages() {
    var {
      temperature,
      apparentTemperature,
      sunshine,
      cloudCover,
      precipProbability,
    } = this.props.data;

    var sunny = sunshine
      ? sunshine.average > 0.65 || sunshine.max > 0.75
      : cloudCover < 0.25;
    var cold = temperature < 1 || apparentTemperature < 3;
    var rain = precipProbability > 0.6;
    var imgArray = [];
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
    tintColor: '#00A588',
    width: "50%",
    aspectRatio: 1,
  },
});
