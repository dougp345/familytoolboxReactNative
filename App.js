import React from 'react';
import {StackNavigator} from 'react-navigation';

import Grocery from './pages/Grocery';
import GroceryList from './pages/GroceryList';
import GroceryAddEditItem from './pages/GroceryAddEditItem';
import GroceryDinners from './pages/GroceryDinners';
import GroceryDinnerItems from './pages/GroceryDinnerItems';
import Calendar from './pages/Calendar';

const FamilyToolboxApp = StackNavigator({
  Grocery: { screen: Grocery },
  GroceryList: { screen: GroceryList },
  GroceryAddEditItem: { screen: GroceryAddEditItem },
  GroceryDinners: { screen: GroceryDinners },
  GroceryDinnerItems: { screen: GroceryDinnerItems },
  Calendar: { screen: Calendar },
});

export default class App extends React.Component {
  render() {
    return (
      <FamilyToolboxApp />
    );
  }
}
