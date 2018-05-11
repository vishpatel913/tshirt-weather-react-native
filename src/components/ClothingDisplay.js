import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import AppText from './AppText';
import ClothingDetails from './ClothingDetails';
import AccessoryDetails from './AccessoryDetails';

/**
 * renders the clothing components
 * using the passed in weather data
 */
class ClothingDisplay extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ClothingDetails data={this.props.data}/>
        <View style={styles.subContainer}>
          <AccessoryDetails data={this.props.data}/>
          <AppText style={styles.daySummary}>
            {this.props.data.summary}
          </AppText>
        </View>
      </View>
    );
  }
  
}

export default ClothingDisplay;

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
