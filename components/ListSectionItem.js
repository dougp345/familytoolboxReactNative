import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { View, Text, Switch } = ReactNative;

class ListSectionItem extends Component {
  render() {
    return (
      <View style={styles.li}>
        <View style={{flex: 5}}>
          <Text style={styles.liText, {color: this.props.item.color}}>{this.props.itemPrefix} {this.props.item.item}</Text>
        </View>
        <View style={{flex: 1}}>
          <Switch onValueChange={(value) => this.props.onToggleItem(value)} value={this.props.item.checked} />
        </View>
      </View>
    );
  }
}

module.exports = ListSectionItem;
