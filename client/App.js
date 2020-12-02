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
import { Provider as PaperProvider } from 'react-native-paper';
import store from './store/index'



const Stack = createStackNavigator()

export default function App() {


  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
            <Stack.Screen name='Game' component={Board} options={{headerShown: false}}/>
            <Stack.Screen name='Finish' component={Finish} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

