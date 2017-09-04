import React from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, Picker } from 'react-native';
import Notification from 'react-native-notification';
import {StackNavigator} from 'react-navigation';
import Button from 'react-native-button';

const styles = require('../styles.js');

export default class GroceryAddEditItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: '',
      newItem: '',
      newSection: '',
      newAisle: 0,
      message: ''
    }
    this.renderAisle=this.renderAisle.bind(this);
    this.saveAction=this.saveAction.bind(this);
    this.cancelAction=this.cancelAction.bind(this);
  }

  componentDidMount() {
    if (this.props.navigation.state.params.mode === 'add') {
      this.props.navigation.setParams({ title: 'Add Item'});
    } else {
      this.props.navigation.setParams({ title: 'Edit Item'});
    }
    this.setState({
      mode: this.props.navigation.state.params.mode,
      newItem: this.props.navigation.state.params.item.item,
      newSection: this.props.navigation.state.params.item.section,
      newAisle: this.props.navigation.state.params.item.aisle || 0,
      message: ''
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.title,
      headerTintColor: styles.constants.textColor,
      headerStyle: {backgroundColor: styles.constants.headerBackground},
      headerLeft: <View></View>
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 50, flexDirection: 'row'}}>
          <View style={{flex: 1, paddingLeft: 16, paddingRight: 5, justifyContent: 'center'}}>
            <Text style={{color: '#2EFE2E', textAlign: 'right'}}>Item:</Text>
          </View>
          <View style={{flex: 5, paddingRight: 16}}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, color: 'white'}}
              onChangeText={(text) => this.setState({newItem: text})}
              value={this.state.newItem}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, paddingLeft: 16, paddingRight: 5, justifyContent: 'center'}}>
            <Text style={{color: '#2EFE2E', textAlign: 'right'}}>Section:</Text>
          </View>
          <View style={{flex: 5, paddingRight: 16}}>
            <Picker
              itemStyle={{color: 'white'}}
              selectedValue={this.state.newSection}
              onValueChange={(itemValue, itemIndex) => this.setState({newSection: itemValue})}>
              <Picker.Item label="Produce" value="produce" />
              <Picker.Item label="Center" value="center" />
              <Picker.Item label="Meats" value="meats" />
              <Picker.Item label="Cold" value="cold" />
              <Picker.Item label="Misc" value="misc" />
            </Picker>
          </View>
        </View>
        {this.renderAisle()}
        <View style={{flex: 1, padding: 16}}>
          <View style={{padding: 10}}>
            <Button containerStyle={{padding: 10, height: 40, justifyContent: 'center', overflow:'hidden', borderRadius:5, backgroundColor: 'blue'}}
                    onPress={this.saveAction}>
              <Text style={{color: 'white', textAlign: 'center'}}>Save</Text>
            </Button>
          </View>
          <View style={{padding: 10}}>
            <Button containerStyle={{padding: 10, height: 40, justifyContent: 'center', overflow:'hidden', borderRadius:5, backgroundColor: 'red'}}
                    onPress={this.cancelAction}>
              <Text style={{color: 'white', textAlign: 'center'}}>Cancel</Text>
            </Button>
          </View>
          <View style={{padding: 10}}>
            <Notification backgroundColor="#F00F0F" message={this.state.message} />
          </View>
        </View>
      </View>
    );
  }

  renderAisle() {
    if (this.state.newSection === 'center') {
      return (
        <View style={{height: 50, flexDirection: 'row'}}>
          <View style={{flex: 1, paddingLeft: 16, paddingRight: 5, justifyContent: 'center'}}>
            <Text style={{color: '#2EFE2E', textAlign: 'right'}}>Aisle:</Text>
          </View>
          <View style={{flex: 5, paddingRight: 16}}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, color: 'white'}}
              keyboardType={'numeric'}
              onChangeText={(text) => this.setState({newAisle: text})}
              value={this.state.newAisle.toString()}
            />
          </View>
        </View>
      ); } else {
      return (
        <View style={{height: 50, flexDirection: 'row'}}>
          <View style={{flex: 1, paddingLeft: 16, paddingRight: 5, justifyContent: 'center'}}>
          </View>
          <View style={{flex: 5, paddingRight: 16}}>
          </View>
        </View>
      );
    }
  }

  saveAction() {
    this.setState({
      message: 'item saved',
    });
    // const { goBack } = this.props.navigation;
    // goBack();
  }

  cancelAction() {
    const { goBack } = this.props.navigation;
    goBack();
  }
}
