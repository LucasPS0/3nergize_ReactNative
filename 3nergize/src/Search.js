import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

const Search = ({ valorRS }) => {
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (valorRS === 0) {
      fetchValor();
    } else {
      setValor(valorRS);
    }
  }, [valorRS]);

  const fetchValor = async () => {
    try {
      const response = await fetch("http://192.168.0.10:3000/dados");
      const data = await response.json();
      const resultadoValor = data[0]?.resultadoValor || 0;
      setValor(resultadoValor);
    } catch (error) {
      console.error("Erro ao buscar valor da API:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.text}>Gasto Atual</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.text}>R${valor}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 10,
    padding: 12,
    margin: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 60,
    width: "90%",
  },
  leftContainer: {},
  rightContainer: {},
  text: {
    fontWeight: "400",
    fontSize: 24,
    color: "#5e5e5f",
  },
});

const mapStateToProps = (state) => {
  return {
    valorRS: state.variable.valorRS,
  };
};

export default connect(mapStateToProps)(Search);
