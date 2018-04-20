import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import AppText from './AppText';
import ForecastItem from './ForecastItem';

class Forecast extends Component {

  renderForecast(number) {
    return this.props.data.map((data, index) =>
      index != 0 && index <= number && <ForecastItem key={data.time} data={data} showTime={this.props.time} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderForecast(4)}
      </View>
    );
  }
}

export default Forecast;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderColor: "#00A58833",
  },
})
