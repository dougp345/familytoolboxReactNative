import React from 'react';
import { AppRegistry, StyleSheet, Text, View, SectionList, ListView } from 'react-native';
import {StackNavigator} from 'react-navigation';

import FirebaseApp from '../components/Firebase';

const styles = require('../styles.js');
const ListDinner = require('../components/ListDinner');

export default class GroceryDinners extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
    }
    this.groceryDB = FirebaseApp.database().ref().child('grocerydinners');
  }

  listenForItems(groceryDB) {
    groceryDB.on('value', (snap) => {
      var itemToPush = {};
      var items = [];
      snap.forEach((child) => {
        itemToPush = {
          _key: child.key,
          name: child.val().name,
          image: child.val().image,
          groceryItems: child.val().groceryItems,
        }
        items.push(itemToPush);
      });
      items.sort(this.sortArrayByName);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.groceryDB);
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Dinners',
      headerTintColor: styles.constants.textColor,
      headerStyle: {backgroundColor: styles.constants.headerBackground},
    };
  };

  _renderItem(item) {
    const onPressEdit = () => {

    };

    const onPressItems = () => {
      console.log("Dinner Items:", item.groceryItems);
      this.goGroceryDinnerItems(item);
    };

    return (
      <ListDinner item={item} onPressEdit={onPressEdit} onPressItems={onPressItems} />
    );
  }

  render() {
    return (
      <View style={styles.ldcontainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
      </View>
    );
  }

  goGroceryDinnerItems(item) {
    const { navigate } = this.props.navigation;
    navigate('GroceryDinnerItems', {item: item});
  }

  sortArrayByName(a,b) {
    if (a.name.toLowerCase() < b.name.toLowerCase())
      return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase())
      return 1;
    return 0;
  }
}
