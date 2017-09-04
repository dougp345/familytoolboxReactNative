import React, {Component} from 'react';
import ReactNative from 'react-native';
import IconIonicon from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
const styles = require('../styles.js')
const { View, Text } = ReactNative;

class ListItem extends Component {
  render() {
    return (
      <View style={styles.li}>
        <View style={{flex: 1}}>
          { this.props.renderSettingsIcon && <IconIonicon name="ios-settings-outline" size={30} color="#585858" onPress={this.props.onPressSettings}></IconIonicon> }
        </View>
        <View style={{flex: 5}}>
          <Text style={styles.liText}>{this.props.item.item}</Text>
        </View>
        <View style={{flex: 1}}>
          <IconIonicon name="ios-add-circle" size={30} color="#32db64" onPress={this.props.onPressAddItem}></IconIonicon>
        </View>
      </View>
    );
  }
}

module.exports = ListItem;
