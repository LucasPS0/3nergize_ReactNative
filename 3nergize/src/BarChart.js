import React from "react";
import { View, StyleSheet, Text } from "react-native";

const BarChart = ({ valorRS, valorMaximo }) => {
  const calcularPorcentagem = () => {
    if (valorMaximo === 0) {
      return 0;
    }
    return (valorRS / valorMaximo) * 100;
  };

  const porcentagem = calcularPorcentagem();

  const getColor = (value, maxValue) => {
    const transitionPoint = maxValue / 2;
    let red, green;
  
    if (value <= transitionPoint) {
      red = Math.floor((255 * value) / transitionPoint);
      green = 255;
    } else {
      red = 255;
      green = Math.floor((255 * (maxValue - value)) / transitionPoint);
    }
  
    const blue = 0;
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const corBarra = getColor(valorRS, valorMaximo);

  const getMessage = (valor, currentMaxValue) => {
    let message = "";

    if (valor > currentMaxValue) {
      message = "O consumo ultrapassou o limite";
    } else if (valor > currentMaxValue * 0.7) {
      message = "O consumo está perto do limite";
    } else if (valor > currentMaxValue / 2) {
      message = "O consumo está bom";
    } else {
      message = "Ótimo consumo";
    }

    return message;
  };

  const mensagem = getMessage(valorRS, valorMaximo);

  return (
    <View style={styles.container}>
      <View style={[styles.barra, { width: `${porcentagem}%`, backgroundColor: corBarra }]} />
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "90%",
    backgroundColor: "#ECECEC",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    marginBottom: 10,
  },
  barra: {
    height: "100%",
  },
  mensagem: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: "center",
    textAlignVertical: "center",
    color: "grey",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default BarChart;
