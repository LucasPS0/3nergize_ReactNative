import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import InicioScreen from "./InicioScreen";
import CalculadoraScreen from "./CalculadoraScreen";
import AnaliseScreen from "./AnaliseScreen";
import { Provider } from 'react-redux';
import store from "./redux/store/store";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <StatusBar style="light"
      backgroundColor="rgb(6, 163, 124)" />
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Inicio") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Calculadora") {
              iconName = focused ? "calculator" : "calculator-outline";
            } else if (route.name === "Analise") {
              iconName = focused ? "analytics" : "analytics-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: {
            color: "white",
            fontSize: 12,
            fontWeight: "bold",
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "green",
          tabBarStyle: {
            paddingVertical: 8,
            height: 60,
            backgroundColor: "rgb(6, 163, 124)",
            paddingBottom: 5,
          },
        })}
      >
        <Tab.Screen name="Inicio" component={InicioScreen} />
        <Tab.Screen name="Calculadora" component={CalculadoraScreen} />
        <Tab.Screen name="Analise" component={AnaliseScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
