import React from 'react';
import {StackNavigator} from 'react-navigation';

import Grocery from './pages/Grocery';
import GroceryList from './pages/GroceryList';
import Calendar from './pages/Calendar';

const FamilyToolboxApp = StackNavigator({
  Grocery: { screen: Grocery },
  GroceryList: { screen: GroceryList },
  Calendar: { screen: Calendar },
});

export default class App extends React.Component {
  render() {
    return (
      <FamilyToolboxApp />
    );
  }
}
