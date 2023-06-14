import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";

const AnaliseScreen = ({ valorRS }) => {
  let valorTotal = valorRS;

  let g = valorTotal * 0.40; // Geração
  let t = valorTotal * 0.03; // Transmissão
  let d = valorTotal * 0.16; // Distribuição
  let e = valorTotal * 0.09; // Encargos

  return (
    <View style={styles.container}>
      <View style={[styles.block, { backgroundColor: "#FFCCCC" }]}>
        <Text style={styles.text}>Geração: {g.toFixed(2)}</Text>
      </View>
      <View style={[styles.block, { backgroundColor: "#CCFFCC" }]}>
        <Text style={styles.text}>Transmissão: {t.toFixed(2)}</Text>
      </View>
      <View style={[styles.block, { backgroundColor: "#CCCCFF" }]}>
        <Text style={styles.text}>Distribuição: {d.toFixed(2)}</Text>
      </View>
      <View style={[styles.block, { backgroundColor: "#FFFFCC" }]}>
        <Text style={styles.text}>Encargos: {e.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    position: "relative",
    top: 300
  },
  block: {
    width: Dimensions.get("window").width / 2 - 20,
    height: 80,
    margin: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

const mapStateToProps = (state) => {
  return {
    valorRS: state.variable.valorRS,
  };
};

export default connect(mapStateToProps)(AnaliseScreen);
