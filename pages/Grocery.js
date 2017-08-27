import React from 'react';
import { AppRegistry, ListView, StyleSheet, Text, View, TouchableHighlight, StatusBar, ActionSheetIOS } from 'react-native';
import Notification from 'react-native-notification';
import {StackNavigator} from 'react-navigation';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';

import FirebaseApp from '../components/Firebase';

import Calendar from './Calendar';

const styles = require('../styles.js');
const ListItem = require('../components/ListItem');
const ListSectionItem = require('../components/ListSectionItem');

export default class Grocery extends React.Component {

  constructor(props) {
    super(props);
    StatusBar.setBarStyle('light-content', true);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
      remainingItems: 0,
      selectedGroceryItems: [],
      produceGroceryItemsView: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
      centerGroceryItemsView: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
      meatsGroceryItemsView: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
      coldGroceryItemsView: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
      miscGroceryItemsView: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
      message: '',
      selectedSection: 0,
      selectedSectionColor: [styles.constants.sectionselectedcolor,
                             styles.constants.sectionunselectedcolor,
                             styles.constants.sectionunselectedcolor,
                             styles.constants.sectionunselectedcolor,
                             styles.constants.sectionunselectedcolor,
                             styles.constants.sectionunselectedcolor],
      selectedSectionTextColor: [styles.constants.sectionselectedtextcolor,
                                 styles.constants.sectionunselectedtextcolor,
                                 styles.constants.sectionunselectedtextcolor,
                                 styles.constants.sectionunselectedtextcolor,
                                 styles.constants.sectionunselectedtextcolor,
                                 styles.constants.sectionunselectedtextcolor]
    };
    this.groceryDB = FirebaseApp.database().ref().child('groceryitems');
    this.groceryDBforUpdate = FirebaseApp.database();
    this.goGroceryList=this.goGroceryList.bind(this);
    this.goCalendar=this.goCalendar.bind(this);
    this.showOptions=this.showOptions.bind(this);
    this.optionClear=this.optionClear.bind(this);
  }

  listenForItems(groceryDB) {
    groceryDB.on('value', (snap) => {
      var itemToPush = {};
      var items = [];
      var selectedGroceryItems = [];
      var produceGroceryItemsView = [];
      var centerGroceryItemsView = [];
      var meatsGroceryItemsView = [];
      var coldGroceryItemsView = [];
      var miscGroceryItemsView = [];
      snap.forEach((child) => {
        itemToPush = {
          _key: child.key,
          item: child.val().item,
          section: child.val().section,
          aisle: child.val().aisle,
          qtySelected: child.val().qtySelected,
          checked: child.val().checked,
          color: child.val().color
        }
        items.push(itemToPush);
        if (child.val().section == "produce" && child.val().qtySelected > 0) {
          selectedGroceryItems.push(itemToPush);
          produceGroceryItemsView.push(itemToPush);
        } else if (child.val().section == "center" && child.val().qtySelected > 0) {
          selectedGroceryItems.push(itemToPush);
          centerGroceryItemsView.push(itemToPush);
        } else if (child.val().section == "meats" && child.val().qtySelected > 0) {
          selectedGroceryItems.push(itemToPush);
          meatsGroceryItemsView.push(itemToPush);
        } else if (child.val().section == "cold" && child.val().qtySelected > 0) {
          selectedGroceryItems.push(itemToPush);
          coldGroceryItemsView.push(itemToPush);
        } else if (child.val().section == "misc" && child.val().qtySelected > 0) {
          selectedGroceryItems.push(itemToPush);
          miscGroceryItemsView.push(itemToPush);
        }
      });
      items.sort(this.sortArrayByItem);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        remainingItems: this.countRemainingItems(items),
        selectedGroceryItems: selectedGroceryItems,
        produceGroceryItemsView: this.state.produceGroceryItemsView.cloneWithRows(produceGroceryItemsView),
        centerGroceryItemsView: this.state.centerGroceryItemsView.cloneWithRows(centerGroceryItemsView),
        meatsGroceryItemsView: this.state.meatsGroceryItemsView.cloneWithRows(meatsGroceryItemsView),
        coldGroceryItemsView: this.state.coldGroceryItemsView.cloneWithRows(coldGroceryItemsView),
        miscGroceryItemsView: this.state.miscGroceryItemsView.cloneWithRows(miscGroceryItemsView)
      });
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({ showOptions: this.showOptions, goGroceryList: this.goGroceryList, label: this.state.remainingItems});
    this.listenForItems(this.groceryDB);
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Grocery',
      headerTintColor: styles.constants.textColor,
      headerStyle: {backgroundColor: styles.constants.headerBackground},
      headerRight:
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <Button containerStyle={{padding: 5, width:35, height:25, overflow:'hidden', borderRadius:5, backgroundColor: 'purple'}}
                              onPress={() => params.goGroceryList()}>
                        <Text style={{color: styles.constants.textColor, textAlign: 'center'}}>{params.label}</Text>
                      </Button>
                    </View>
                    <View style={{flex: 1}}>
                      <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    </View>
                  </View>,
      headerLeft:
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Icon name="ios-options" size={25} color={styles.constants.textColor} onPress={() => params.showOptions()}/>
                    </View>
                  </View>
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionrow}>
          <View style={{flex: 1}}>
            <Button containerStyle={{borderLeftWidth: 1, borderRightWidth: 0.5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: styles.constants.sectionunselectedcolor, height: 35, justifyContent: 'center', backgroundColor: this.state.selectedSectionColor[0]}} onPress={() => this.selectSection(0)}>
              <Text style={{color: this.state.selectedSectionTextColor[0], textAlign: 'center'}}>+</Text>
            </Button>
          </View>
          <View style={{flex: 1}}>
            <Button containerStyle={{borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: styles.constants.sectionunselectedcolor, height: 35, justifyContent: 'center', backgroundColor: this.state.selectedSectionColor[1]}} onPress={() => this.selectSection(1)}>
              <Text style={{color: this.state.selectedSectionTextColor[1], fontSize: 10, textAlign: 'center'}}>Produce</Text>
            </Button>
          </View>
          <View style={{flex: 1}}>
            <Button containerStyle={{borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: styles.constants.sectionunselectedcolor, height: 35, justifyContent: 'center', backgroundColor: this.state.selectedSectionColor[2]}} onPress={() => this.selectSection(2)}>
              <Text style={{color: this.state.selectedSectionTextColor[2], fontSize: 10, textAlign: 'center'}}>Center</Text>
            </Button>
          </View>
          <View style={{flex: 1}}>
            <Button containerStyle={{borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: styles.constants.sectionunselectedcolor, height: 35, justifyContent: 'center', backgroundColor: this.state.selectedSectionColor[3]}} onPress={() => this.selectSection(3)}>
              <Text style={{color: this.state.selectedSectionTextColor[3], fontSize: 10, textAlign: 'center'}}>Meats</Text>
            </Button>
          </View>
          <View style={{flex: 1}}>
            <Button containerStyle={{borderLeftWidth: 0.5, borderRightWidth: 0.5, borderTopWidth: 1, borderBottomWidth: 1, borderColor: styles.constants.sectionunselectedcolor, height: 35, justifyContent: 'center', backgroundColor: this.state.selectedSectionColor[4]}} onPress={() => this.selectSection(4)}>
              <Text style={{color: this.state.selectedSectionTextColor[4], fontSize: 10, textAlign: 'center'}}>Cold</Text>
            </Button>
          </View>
          <View style={{flex: 1}}>
            <Button containerStyle={{borderLeftWidth: 0.5, borderRightWidth: 1, borderTopWidth: 1, borderBottomWidth: 1, borderColor: styles.constants.sectionunselectedcolor, height: 35, justifyContent: 'center', backgroundColor: this.state.selectedSectionColor[5]}} onPress={() => this.selectSection(5)}>
              <Text style={{color: this.state.selectedSectionTextColor[5], fontSize: 10, textAlign: 'center'}}>Misc</Text>
            </Button>
          </View>
        </View>
        <View style={{flex: 1}}>
          {this.renderContent()}
        </View>
        <View style={styles.tabrow}>
          <View style={styles.tabitem}>
            <Icon name="ios-cart" size={styles.constants.tabiconsize} color={styles.constants.tabiconselectedcolor}/>
          </View>
          <View style={styles.tabitem}>
            <Icon name="ios-calendar-outline" size={styles.constants.tabiconsize} color={styles.constants.tabiconnotselectedcolor} onPress={this.goCalendar}/>
          </View>
        </View>
        <Notification backgroundColor="#F00F0F" message={this.state.message} />
      </View>
    );
  }

  selectSection(section) {
    var buttonColors = [];
    var textColors = [];
    for (var i = 0; i < 6; i++) {
      if (section === i) {
        buttonColors[i] = styles.constants.sectionselectedcolor;
        textColors[i] = styles.constants.sectionselectedtextcolor;
      } else {
        buttonColors[i] = styles.constants.sectionunselectedcolor;
        textColors[i] = styles.constants.sectionunselectedtextcolor;
      }
    }
    this.setState({
      selectedSection: section,
      selectedSectionColor: buttonColors,
      selectedSectionTextColor: textColors
    });
  }

  renderContent() {
    if (this.state.selectedSection === 0) {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
      )
    } else if (this.state.selectedSection === 1) {
      return (
        <View style={{flex: 1}}>
          <View style={styles.liHeader}>
            <Text style={styles.liHeaderText}>(Qty) Item</Text>
          </View>
          <View style={{flex: 1}}>
            <ListView
              dataSource={this.state.produceGroceryItemsView}
              renderRow={this._renderSectionItem.bind(this)}
              enableEmptySections={true}
              style={styles.listview}/>
          </View>
        </View>
      )
    } else if (this.state.selectedSection === 2) {
      return (
        <View style={{flex: 1}}>
          <View style={styles.liHeader}>
            <Text style={styles.liHeaderText}>Aisle | (Qty) Item</Text>
          </View>
          <View style={{flex: 1}}>
            <ListView
              dataSource={this.state.centerGroceryItemsView}
              renderRow={this._renderSectionItem.bind(this)}
              enableEmptySections={true}
              style={styles.listview}/>
          </View>
        </View>
      )
    } else if (this.state.selectedSection === 3) {
      return (
        <View style={{flex: 1}}>
          <View style={styles.liHeader}>
            <Text style={styles.liHeaderText}>(Qty) Item</Text>
          </View>
          <View style={{flex: 1}}>
            <ListView
              dataSource={this.state.meatsGroceryItemsView}
              renderRow={this._renderSectionItem.bind(this)}
              enableEmptySections={true}
              style={styles.listview}/>
          </View>
        </View>
      )
    } else if (this.state.selectedSection === 4) {
      return (
        <View style={{flex: 1}}>
          <View style={styles.liHeader}>
            <Text style={styles.liHeaderText}>(Qty) Item</Text>
          </View>
          <View style={{flex: 1}}>
            <ListView
              dataSource={this.state.coldGroceryItemsView}
              renderRow={this._renderSectionItem.bind(this)}
              enableEmptySections={true}
              style={styles.listview}/>
          </View>
        </View>
      )
    } else if (this.state.selectedSection === 5) {
      return (
        <View style={{flex: 1}}>
          <View style={styles.liHeader}>
            <Text style={styles.liHeaderText}>(Qty) Item</Text>
          </View>
          <View style={{flex: 1}}>
            <ListView
              dataSource={this.state.miscGroceryItemsView}
              renderRow={this._renderSectionItem.bind(this)}
              enableEmptySections={true}
              style={styles.listview}/>
          </View>
        </View>
      )
    } else {
      return (
        <Text style={{color: "white"}}>Invalid Selection</Text>
      )
    }
  }

  _addItem() {
    console.log("add button pressed");
  }

  _renderItem(item) {
    const onPressSettings = () => {
      console.log("settings item pressed");
    };

    const onPressAddItem = () => {
      this.groceryDBforUpdate.ref('/groceryitems/' + item._key).set({item: item.item, aisle: item.aisle, checked: true, color: styles.constants.untoggleditemcolor, qtySelected: ++item.qtySelected, section: item.section});
      this.setState({
        message: item.item + ' added to the list',
      });
    };

    return (
      <ListItem item={item} onPressSettings={onPressSettings} onPressAddItem={onPressAddItem} />
    );
  }

  _renderSectionItem(item) {
    const onToggleItem = (newValue) => {
      var itemColor = "white";
      if (!newValue) {
        itemColor = styles.constants.toggleditemcolor;
      }
      this.groceryDBforUpdate.ref('/groceryitems/' + item._key).set({item: item.item, aisle: item.aisle, checked: newValue, color: itemColor, qtySelected: item.qtySelected, section: item.section});
    };

    var itemPrefix = "";
    if (item.section == "center") {
      itemPrefix = item.aisle + "  |  ( " + item.qtySelected + " )  ";
    } else {
      itemPrefix = "( " + item.qtySelected + " )  ";
    }
    return (
      <ListSectionItem item={item} itemPrefix={itemPrefix} onToggleItem={onToggleItem} />
    );
  }

  goGroceryList() {
    const { navigate } = this.props.navigation;
    navigate('GroceryList', {selectedGroceryItems: this.state.selectedGroceryItems});
  }

  goCalendar() {
    const { navigate } = this.props.navigation;
    navigate('Calendar');
  }

  showOptions() {
    var options = [ 'Dinners', 'Clear Selected', 'Clear All', 'Cancel' ];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options,
        destructiveButtonIndex: 2,
        cancelButtonIndex: 3
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.optionDinners();
        } else if (buttonIndex === 1) {
          this.optionClear("selected");
        } else if (buttonIndex === 2) {
          this.optionClear("all");
        } else {
          console.log('Cancel clicked');
        }
      }
    );
  }

  optionDinners() {
    console.log("clicked Dinners");
  }

  optionClear(mode) {
    var itemToUpdate = {};
    this.groceryDBforUpdate.ref('/groceryitems/').once('value', (snap) => {
      snap.forEach((item) => {
        if (item.val().qtySelected > 0 && (mode == "all" || (mode == "selected" && !item.val().checked))) {
          itemToUpdate = {
            item: item.val().item,
            section: item.val().section,
            aisle: item.val().aisle,
            qtySelected: 0,
            checked: true,
            color: styles.constants.untoggleditemcolor
          }
          this.groceryDBforUpdate.ref('/groceryitems/' + item.key).set(itemToUpdate);
        }
      });
    });
  }

  countRemainingItems(items) {
    var remainingItems = 0;
    for(var i = 0; i < items.length; i++) {
      if (items[i].checked) {
        remainingItems += items[i].qtySelected;
      }
    }
    this.props.navigation.setParams({ showOptions: this.showOptions, goGroceryList: this.goGroceryList, label: remainingItems});
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
