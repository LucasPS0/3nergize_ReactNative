import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import AnalysisItem from "./src/components/AnalysisItem";

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
    <View style={styles.container}>
      <AnalysisItem value={g.toFixed(2)} image={require("./assets/raio.png")}>
        <Text>Geração</Text>
 

      </AnalysisItem>
      <AnalysisItem value={t.toFixed(2)} image={require("./assets/torre.png")}>
        <Text>Transmissão</Text>
      </AnalysisItem>
      <AnalysisItem value={d.toFixed(2)}  image={require("./assets/painel-eletrico.png")}>
        <Text>Distribuição</Text>
      </AnalysisItem>
      <AnalysisItem value={e.toFixed(2)}  image={require("./assets/money-bag.png")} >
        <Text>Encargos</Text>
      </AnalysisItem>
      <AnalysisItem value={tr.toFixed(2)}image={require("./assets/docs.png")} >
        <Text>Tributos</Text>
      </AnalysisItem>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
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
