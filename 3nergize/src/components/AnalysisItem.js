import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AnalysisItem({ children, value, type }) {
  return (
    <View style={styles.Container}>
      {"geracao" && (
        <View style={styles.ValueContainerHeader}>
          <Text style={styles.text}>R${value}</Text>
        </View>
      )}
      <View style={styles.ValueContainerSection}>
        <Text style={styles.text}>ICONE</Text>
      </View>
      <Text style={styles.ValueContainerFooter}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: "45%",
    height: 200,
    margin: 10,

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
  },

  ValueContainerHeader: {
    padding: 10,
    textAlign: "center",
    height: "25%",
    borderRadius: 5,
    backgroundColor: "rgb(6, 163, 124)",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,  },

  ValueContainerSection: {
    padding: 10,
    textAlign: "center",
  },

  ValueContainerFooter: {
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "rgb(6, 163, 124)",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
