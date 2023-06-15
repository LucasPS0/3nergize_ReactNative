
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AnalysisItem from "./src/components/AnalysisItem";

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";

const fetchData = async (callback) => {
  try {
    const response = await fetch("https://threenergize.onrender.com/dados");
    const data = await response.json();
    const resultadoValor = data[0]?.resultadoValor || 0;
    callback(resultadoValor);
  } catch (error) {
    console.error("Erro ao buscar valor da API:", error);
  }
};

const AnaliseScreen = ({ valorRS }) => {
  const [valorTotal, setValorTotal] = useState(valorRS);

  useEffect(() => {
    if (valorRS === 0) {
      fetchData(setValorTotal);
    } else {
      setValorTotal(valorRS);
    }
  }, [valorRS]);

  let g = valorTotal * 0.50; // Geração
  let t = valorTotal * 0.03; // Transmissão
  let d = valorTotal * 0.16; // Distribuição
  let e = valorTotal * 0.09; // Encargos
  let tr = valorTotal * 0.22; // tributos


  return (

    <View style={styles.Container}>
      <AnalysisItem value={2} type="geracao" >
        <Text>Geração</Text>
      </AnalysisItem>
      <AnalysisItem value={2}>
        <Text>Transmissão</Text>
      </AnalysisItem>
      <AnalysisItem value={2}>
        <Text>Destribuição</Text>
      </AnalysisItem>
      <AnalysisItem value={2}>
        <Text>Encargos</Text>
      </AnalysisItem>
      <AnalysisItem value={2}>
        <Text>Tributos</Text>
      </AnalysisItem>

    <View style={styles.container}>
      <View style={[styles.block, { backgroundColor: "#FFCCCC" }]}>
        <Text style={styles.title}>Geração</Text>
        <Text style={styles.value}>{g.toFixed(2)}</Text>
      </View>
      <View style={[styles.block, { backgroundColor: "#CCFFCC" }]}>
        <Text style={styles.title}>Transmissão</Text>
        <Text style={styles.value}>{t.toFixed(2)}</Text>
      </View>
      <View style={[styles.block, { backgroundColor: "#CCCCFF" }]}>
        <Text style={styles.title}>Distribuição</Text>
        <Text style={styles.value}>{d.toFixed(2)}</Text>
      </View>
      <View style={[styles.block, { backgroundColor: "#FFFFCC" }]}>
        <Text style={styles.title}>Encargos</Text>
        <Text style={styles.value}>{e.toFixed(2)}</Text>
      </View>
      <View style={[styles.block, { backgroundColor: "#FFFFCC" }]}>
        <Text style={styles.title}>Tributos</Text>
        <Text style={styles.value}>{tr.toFixed(2)}</Text>
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  Container: {
    flex: 1,

    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
  

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 200,
  },
  
  block: {
    width: Dimensions.get("window").width / 2 - 30,
    height: 120,
    marginVertical: 10,
    marginHorizontal: 10,
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#000",

  },
});


const mapStateToProps = (state) => {
  return {
    valorRS: state.variable.valorRS,
  };
};


export default connect(mapStateToProps)(AnaliseScreen);
