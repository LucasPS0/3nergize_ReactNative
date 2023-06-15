import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function AnalysisItem({ children, value, type, image }) {

  const nada = require(`../../assets/Embrapa.jpg`);

  return (
    <View style={styles.Container}>
      <View style={styles.ValueContainerHeader}>
        <Text style={styles.text}>R${value}</Text>

      </View>
      <View style={styles.ValueContainerSection}>
      <Image source={image}style={styles.image}/>
        <Text style={styles.text}></Text>
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
    padding: 15,
    textAlign: "center",
    height: "25%",
    borderRadius: 5,
    backgroundColor: "rgb(6, 163, 124)",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

  ValueContainerSection: {
    paddingTop: 0,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },

  ValueContainerFooter: {
    padding: 8,
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

  image: {

    marginTop: 15,
    width: 80,
    height: 80,
    alignSelf: "center",
  },
});
