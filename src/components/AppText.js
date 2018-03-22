'use strict';

import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Fonts } from '../utils/Fonts';

class AppText extends Component {
  constructor(props) {
    super(props)
    this.style = [{fontFamily: Fonts.Rubik, color: '#666666'}];
    if (this.props.font == 'light') this.style = [{fontFamily: Fonts.RubikLight, color: '#666666'}];
    if (this.props.font == 'bold') this.style = [{fontFamily: Fonts.RubikBold, color: '#007269'}];

    if( props.style ) {
      if( Array.isArray(props.style) ) {
        this.style = this.style.concat(props.style)
      } else {
        this.style.push(props.style)
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
