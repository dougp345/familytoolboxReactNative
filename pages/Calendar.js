import React from 'react';
import { AppRegistry, ListView, StyleSheet, Text, View, StatusBar } from 'react-native';
import Notification from 'react-native-notification';
import {StackNavigator} from 'react-navigation';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';

import firebaseApp from '../components/Firebase'

import Grocery from './Grocery';

const styles = require('../styles.js');

export default class Calendar extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Calendar',
      headerTintColor: styles.constants.textColor,
      headerStyle: {backgroundColor: styles.constants.headerBackground},
      headerRight:
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <Icon name="ios-add" size={25} color={styles.constants.textColor} onPress={() => params.addCalEvent()}/>
                    </View>
                    <View style={{flex: 1}}>
                      <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    </View>
                  </View>
    };
  };

  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content', true);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      remainingItems: 0,
      message: ''
    };
    this.calendarDB = firebaseApp.database().ref().child('calendarevents');
    this.goGrocery=this.goGrocery.bind(this);
  }

  listenForItems(calendarDB) {
    calendarDB.on('value', (snap) => {
      var events = [];
      snap.forEach((child) => {
        events.push({
          _key: child.key,
          title: child.val().title,
          category: child.val().category,
          yearMonth: child.val().yearMonth,
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(events),
      });
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({ addCalEvent: this.addCalEvent });
    this.listenForItems(this.calendarDB);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Text style={{color: "white"}}>Coming Soon</Text>
        </View>
        <View style={styles.tabrow}>
          <View style={styles.tabitem}>
            <Icon name="ios-cart-outline" size={styles.constants.tabiconsize} color={styles.constants.tabiconnotselectedcolor}  onPress={this.goGrocery}/>
          </View>
          <View style={styles.tabitem}>
            <Icon name="ios-calendar" size={styles.constants.tabiconsize} color={styles.constants.tabiconselectedcolor}/>
          </View>
        </View>
        <Notification backgroundColor="#F00F0F" message={this.state.message} />
      </View>
    );
  }

  addCalEvent() {
    console.log("add button pressed");
  }

  goGrocery() {
    const { navigate } = this.props.navigation;
    navigate('Grocery');
  }
}
