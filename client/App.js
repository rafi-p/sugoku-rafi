import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {Board, Home, Finish} from './screens/index'
import { Provider} from 'react-redux'
import store from './store/index'


const Stack = createStackNavigator()
// aaaaaaaaaaaaaaaaaaaaaaaaaa
export default function App() {


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
          <Stack.Screen name='Game' component={Board} options={{title: ''}}/>
          <Stack.Screen name='Finish' component={Finish} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

