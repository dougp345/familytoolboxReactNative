import React from 'react';
import { AppRegistry, ListView, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Notification from 'react-native-notification';
import {StackNavigator} from 'react-navigation';

const firebase = require('firebase');
const styles = require('./styles.js');
const ListItem = require('./components/ListItem');

const firebaseConfig = {
  apiKey: "AIzaSyA7Og9OWyAemE7CYT4D_4lPuLrXqcIR1zA",
  authDomain: "familytoolbox-57e73.firebaseapp.com",
  databaseURL: "https://familytoolbox-57e73.firebaseio.com",
  projectId: "familytoolbox-57e73",
  storageBucket: "familytoolbox-57e73.appspot.com",
  messagingSenderId: "159411358722"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <FamilyToolboxApp />
    );
  }
}

export class Grocery extends React.Component {
  static navigationOptions = {
    title: 'Grocery',
    headerRight: <Text>hello</Text>,
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      remainingItems: 0,
      selectedGroceryItems: [],
      produceGroceryItemsView: [],
      centerGroceryItemsView: [],
      meatsGroceryItemsView: [],
      coldGroceryItemsView: [],
      miscGroceryItemsView: [],
      message: ''
    };
    this.groceryDB = firebaseApp.database().ref().child('groceryitems');
    this.listAllSelected=this.listAllSelected.bind(this);
  }

  listenForItems(groceryDB) {
    groceryDB.on('value', (snap) => {
      var items = [];
      var selectedGroceryItems = [];
      var produceGroceryItemsView = [];
      var centerGroceryItemsView = [];
      var meatsGroceryItemsView = [];
      var coldGroceryItemsView = [];
      var miscGroceryItemsView = [];
      snap.forEach((child) => {
        items.push({
          _key: child.key,
          item: child.val().item,
          section: child.val().section,
          aisle: child.val().aisle,
          qtySelected: child.val().qtySelected,
          checked: child.val().checked,
          color: child.val().color
        });
        if (child.val().section == "produce" && child.val().qtySelected > 0) {
          selectedGroceryItems.push(child);
          produceGroceryItemsView.push(child);
        } else if (child.val().section == "center" && child.val().qtySelected > 0) {
          selectedGroceryItems.push(child);
          centerGroceryItemsView.push(child);
        } else if (child.val().section == "meats" && child.val().qtySelected > 0) {
          selectedGroceryItems.push(child);
          meatsGroceryItemsView.push(child);
        } else if (child.val().section == "cold" && child.val().qtySelected > 0) {
          selectedGroceryItems.push(child);
          coldGroceryItemsView.push(child);
        } else if (child.val().section == "misc" && child.val().qtySelected > 0) {
          selectedGroceryItems.push(child);
          miscGroceryItemsView.push(child);
        }
      });
      items.sort(this.sortArrayByItem);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        remainingItems: this.countRemainingItems(items),
        selectedGroceryItems: selectedGroceryItems,
        produceGroceryItemsView: produceGroceryItemsView,
        centerGroceryItemsView: centerGroceryItemsView,
        meatsGroceryItemsView: meatsGroceryItemsView,
        coldGroceryItemsView: coldGroceryItemsView,
        miscGroceryItemsView: miscGroceryItemsView
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.groceryDB);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusbar}/>
        <View style={styles.navbar}>
          <View style={{flex: 1}}>
            <Text style={styles.navbarItem}></Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.navbarTitle}>Grocery</Text>
          </View>
          <View style={{flex: 1}}>
            <View style={styles.navbarButton}>
              <TouchableHighlight onPress={this.listAllSelected} color="#FFFFFF">
                <View style={{flex: 1, alignItems: "center"}}>
                  <Text>{this.state.remainingItems}</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
        <Notification backgroundColor="#F00F0F" message={this.state.message} />
      </View>
    );
  }

  _addItem() {
    console.log("add button pressed");
  }

  _renderItem(item) {
    const onPressSettings = () => {
      console.log("settings item pressed");
    };

    const onPressAddItem = () => {
      console.log("add item pressed");
      this.setState({
        message: 'Hi there',
      });
    };

    return (
      <ListItem item={item} onPressSettings={onPressSettings} onPressAddItem={onPressAddItem} />
    );
  }

  listAllSelected() {
    console.log("list all selected pressed");
    const { navigate } = this.props.navigation;
    navigate('GroceryList');
  }

  countRemainingItems(items) {
    var remainingItems = 0;
    for(var i = 0; i < items.length; i++) {
      if (items[i].checked) {
        remainingItems += items[i].qtySelected;
      }
    }
    return remainingItems;
  }

  sortArrayByItem(a,b) {
    if (a.item.toLowerCase() < b.item.toLowerCase())
      return -1;
    if (a.item.toLowerCase() > b.item.toLowerCase())
      return 1;
    return 0;
  }
}

export class GroceryList extends React.Component {
  static navigationOptions = {
    title: 'Grocery List',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    );
  }
}

const FamilyToolboxApp = StackNavigator({
  Grocery: { screen: Grocery },
  GroceryList: { screen: GroceryList },
});
