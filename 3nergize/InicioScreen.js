import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Apresentacao from "./src/Apresentacao";
import Search from "./src/Search";
import axios from "axios";
import { connect } from 'react-redux';

const InicioScreen = ({ navigation, valorRS }) => {
  const [resultadoValor, setResultadoValor] = useState("");



  return (
    <View style={styles.container}>
      <Search />
      <Apresentacao />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default InicioScreen;