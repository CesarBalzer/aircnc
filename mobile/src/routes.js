// import React from 'react';
// import {} from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Book from './pages/Book';
import List from './pages/List';
import Login from './pages/Login';

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    Book,
    List
  })
);

export default Routes;