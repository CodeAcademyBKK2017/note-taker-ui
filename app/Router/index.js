import AboutApp from '../components/About/AboutApp.component';
import AboutDev from '../components/About/AboutDev.component';
import App from './main';
import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';

const RootNavigator = StackNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      headerTitle: 'Home'
    }
  },
  About: {
    screen: TabNavigator({
      AboutApp: {
        screen: AboutApp,
        navigationOptions: {
          headerTitle: 'AboutApp'
        }
      },
      AboutDev: {
        screen: AboutDev,
        navigationOptions: {
          headerTitle: 'AboutDev'
        }
      }
    }, {
      tabBarPosition: 'bottom',
      animationEnabled: true,
      tabBarOptions: {
        activeTintColor: '#e91e63'
      },
      swipeEnabled: true
    })  
  }
});
  
export default RootNavigator;
