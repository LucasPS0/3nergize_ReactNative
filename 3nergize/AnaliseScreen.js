import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AnalysisItem from "./src/components/AnalysisItem";

export default function AnaliseScreen() {
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

    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
  
    
  },
});
