import React from 'react';
import { AppRegistry, StyleSheet, Text, View, SectionList, ListView } from 'react-native';
import {StackNavigator} from 'react-navigation';

import FirebaseApp from '../components/Firebase';

const styles = require('../styles.js');
const ListSectionItem = require('../components/ListSectionItem');

export default class GroceryDinnerItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dinnerKey: '',
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
    }
    this.groceryDB = FirebaseApp.database().ref().child('grocerydinners');
    this.groceryDBforUpdate = FirebaseApp.database();
  }

  componentDidMount() {
    var dinnerItems = [];
    // for (var i = 0; i < this.props.navigation.state.params.item.groceryItems.length; i++) {
      // dinnerItems.push();
    // }
    this.setState({
      dinnerKey: this.props.navigation.state.params.item._key,
      dataSource: this.state.dataSource.cloneWithRows(dinnerItems)
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Dinner Items',
      headerTintColor: styles.constants.textColor,
      headerStyle: {backgroundColor: styles.constants.headerBackground},
    };
  };

  _renderItem(item) {
    const onToggleItem = (newValue) => {
      var itemColor = "white";
      if (!newValue) {
        itemColor = styles.constants.toggleditemcolor;
      }

    };

    return (
      <ListSectionItem item={item} onToggleItem={onToggleItem} />
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
}
