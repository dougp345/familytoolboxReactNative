import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation';

const styles = require('../styles.js');

export default class GroceryList extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Grocery List',
      headerTintColor: styles.constants.textColor,
      headerStyle: {backgroundColor: styles.constants.headerBackground},
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    );
  }
}
