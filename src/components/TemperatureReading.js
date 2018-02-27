import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Icon from './Icon';
// import { getIconSource } from '../helpers/iconHelper';


class TemperatureReading extends Component {

  render() {
    const { temperature, apparentTemperature, summary, icon } = this.props;

    return(
      <View style={styles.container}>
        <View>
          <Text style={styles.temperatureValue}>
            {temperature}&deg;C
          </Text>
          <Icon name={icon}/>
        </View>
        <Text style={styles.fontMedium}>{summary}</Text>
        <Text style={styles.fontSmall}>Feels like {apparentTemperature}&deg;C</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { temperature, apparentTemperature, summary, icon, time } = state.weather.currently;

  return { temperature, apparentTemperature, summary, icon, time };
};

export default connect(mapStateToProps, null)(TemperatureReading);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  temperatureValue: {
    fontSize: 48,
  },
  fontMedium: {
    fontSize: 18,
  },
  fontMedium: {
    fontSize: 16,
  },
  fontSmall: {
    fontSize: 12,
  },
});
