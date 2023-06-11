import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Apresentacao from "./src/Apresentacao";
export default function InicioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Inicio Screen</Text>
      <Apresentacao/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
  },
});

