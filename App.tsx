import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import  AntDesign  from 'react-native-vector-icons/AntDesign';


import HomeScreen from './src/Telas/HomeScreen';
import TelaCalculo from './src/Telas/TelaCalculo';
import TelaAnalise from './src/Telas/TelaAnalise';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        shifting={true}
        sceneAnimationEnabled={false}
        barStyle={{ backgroundColor: 'green' }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Icon name="home" color="black" size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Calculo"
          component={TelaCalculo}
          options={{
            tabBarLabel: 'Cálculo',
            tabBarIcon: ({ color }) => (
            <AntDesign name="calculator" color="black" size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Analise"
          component={TelaAnalise}
          options={{
            tabBarLabel: 'Análise',
            tabBarIcon: ({ color }) => (
              <Icon name="insert-chart-outlined" color="black" size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
