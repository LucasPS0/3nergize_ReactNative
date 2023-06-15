// Importação das bibliotecas e componentes necessários
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

// Criação do TabNavigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // Provedor Redux para disponibilizar o store
    <Provider store={store}>
      <NavigationContainer>
        {/* Barra de status */}
        <StatusBar style="light" backgroundColor="rgb(6, 163, 124)" />

        {/* Navegador de abas */}
        <Tab.Navigator
          // Configurações de cada tela da aba
          screenOptions={({ route }) => ({
            // Oculta o header
            headerShown: false,
            // Ícone exibido na aba
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Inicio") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Calculadora") {
                iconName = focused ? "calculator" : "calculator-outline";
              } else if (route.name === "Analise") {
                iconName = focused ? "analytics" : "analytics-outline";
              }

              // Renderiza o ícone usando o Ionicons
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            // Estilos do rótulo da aba
            tabBarLabelStyle: {
              color: "white",
              fontSize: 12,
              fontWeight: "bold",
            },
            // Cor do ícone da aba ativa
            tabBarActiveTintColor: "white",
            // Cor do ícone da aba inativa
            tabBarInactiveTintColor: "green",
            // Estilos da barra de abas
            tabBarStyle: {
              paddingVertical: 8,
              height: 60,
              backgroundColor: "rgb(6, 163, 124)",
              paddingBottom: 5,
            },
          })}
        >
          {/* Telas do aplicativo */}
          <Tab.Screen name="Inicio" component={InicioScreen} />
          <Tab.Screen name="Calculadora" component={CalculadoraScreen} />
          <Tab.Screen name="Analise" component={AnaliseScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
