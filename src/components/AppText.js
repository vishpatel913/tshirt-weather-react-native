import React, { Component } from 'react';
import { Text } from 'react-native';
import { Fonts } from '../utils/Fonts';
import { themeColors } from '../styles/Theme';


class AppText extends Component {

  constructor(props) {
    super(props);
    this.style = [{ fontFamily: Fonts.Rubik, color: themeColors.text }];
    if (this.props.font === 'light') this.style = [{ fontFamily: Fonts.RubikLight, color: themeColors.text }];
    if (this.props.font === 'bold') this.style = [{ fontFamily: Fonts.RubikBold, color: themeColors.primaryDark }];

    if (props.style) {
      if (Array.isArray(props.style)) {
        this.style = this.style.concat(props.style);
      } else {
        this.style.push(props.style);
      }
    }
  }

  render() {
    return (
      <Text {...this.props} style={this.style}>
        {this.props.children}
      </Text>
    )
  }
}

export default AppText;
