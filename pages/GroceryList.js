import React from 'react';
import { AppRegistry, StyleSheet, Text, View, SectionList } from 'react-native';
import {StackNavigator} from 'react-navigation';

const styles = require('../styles.js');

export default class GroceryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      produceList: [],
      centerList: [],
      meatsList: [],
      coldList: [],
      miscList: []
    }
  }

  componentDidMount() {
    var produceList = [];
    var centerList = [];
    var meatsList = [];
    var coldList = [];
    var miscList = [];
    var allSelectedItems = this.props.navigation.state.params.selectedGroceryItems;
    for (var i = 0; i < this.props.navigation.state.params.selectedGroceryItems.length; i++) {
      if (allSelectedItems[i].section === 'produce') {
        produceList.push({key: allSelectedItems[i].item});
      } else if (allSelectedItems[i].section === 'center') {
        centerList.push({key: allSelectedItems[i].item});
      } else if (allSelectedItems[i].section === 'meats') {
        meatsList.push({key: allSelectedItems[i].item});
      } else if (allSelectedItems[i].section === 'cold') {
        coldList.push({key: allSelectedItems[i].item});
      } else if (allSelectedItems[i].section === 'misc') {
        miscList.push({key: allSelectedItems[i].item});
      }
    }
    this.setState({
      produceList: produceList,
      centerList: centerList,
      meatsList: meatsList,
      coldList: coldList,
      miscList: miscList
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Grocery List',
      headerTintColor: styles.constants.textColor,
      headerStyle: {backgroundColor: styles.constants.headerBackground},
    };
  };

  renderItem = (row) => {
    return (
      <View style={{backgroundColor: 'black',
                    paddingLeft: 32,
                    paddingRight: 16,
                    paddingTop: 5,
                    paddingBottom: 5}}>
        <Text style={{color: 'white'}}>{row.item.key}</Text>
      </View>
    );
  }

  renderSectionHeader = (row) => {
    return (
      <View style={{backgroundColor: 'purple',
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 5,
                    paddingBottom: 5}}>
        <Text style={{color: 'white'}}>{row.section.headerTitle}</Text>
      </View>
    );
  }

  render() {
    const sectionListData = [
      {headerTitle: "Produce", data: this.state.produceList},
      {headerTitle: "Center", data: this.state.centerList},
      {headerTitle: "Meats", data: this.state.meatsList},
      {headerTitle: "Cold", data: this.state.coldList},
      {headerTitle: "Misc", data: this.state.miscList}
    ];
    return (
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <SectionList
            sections={sectionListData}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderSectionHeader}
          />
        </View>
      </View>
    );
  }
}
