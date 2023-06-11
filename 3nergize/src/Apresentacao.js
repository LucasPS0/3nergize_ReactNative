import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { styles } from "./styles";
const Apresentacao = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>3nergize</Text>
      <Text style={styles.subtitle}>Manager</Text>
      <Text style={styles.description}>Faça consultas sobre seus Gastos</Text>
      <Text style={styles.paragraph}>Vamos gerenciar e otimizar o seu uso de energia</Text>
    </View>
  );
};

export default Apresentacao;
