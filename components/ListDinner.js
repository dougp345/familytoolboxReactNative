import React, {Component} from 'react';
import ReactNative, {TouchableOpacity} from 'react-native';
const styles = require('../styles.js')
const { View, Text } = ReactNative;

class ListDinner extends Component {
  render() {
    return (
      <View style={styles.lditemcontainer}>
        <TouchableOpacity style={styles.ld} onPress={this.props.onPressItems}>
          <Text style={{color: 'white'}}>{this.props.item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

module.exports = ListDinner;
