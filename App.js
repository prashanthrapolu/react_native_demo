import React from 'react';
import { View, Text,Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginComponent from './component/loginCompnent';
import DashboardComponent from './component/dashboard';
import AddReciepeComponent from './component/addreciepe';
import DetailsComponent from './component/details';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginComponent,
  },
  Home: {
    screen: DashboardComponent,
    navigationOptions:{
      
    
    }
  },
  Add: {
    screen: AddReciepeComponent,
  },
  Details: {
    screen: DetailsComponent,
  },
});

export default createAppContainer(AppNavigator);