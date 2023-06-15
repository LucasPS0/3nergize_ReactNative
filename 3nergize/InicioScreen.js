import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Modal, TextInput, Text } from "react-native";
import BarChart from "./src/BarChart";
import { connect } from "react-redux";
import Search from "./src/Search";
import Apresentacao from "./src/Apresentacao";
import axios from "axios";

const API_URL = "https://threenergize.onrender.com/dados";

const InicioScreen = ({ navigation, valorRS }) => {
  const [valorMaximo, setValorMaximo] = useState(valorRS);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempValorMaximo, setTempValorMaximo] = useState(valorRS.toString());

  useEffect(() => {
    fetchMaxValue();
  }, []);

  const fetchMaxValue = () => {
    axios
      .get(API_URL)
      .then((response) => {
        const { max_value } = response.data;
        setValorMaximo(max_value);
      })
      .catch((error) => {
        console.error("Erro ao recuperar o valor máximo:", error);
      });
  };

  const saveMaxValue = () => {
    axios
      .post(API_URL, { max_value: Number(tempValorMaximo) })
      .then(() => {
        setValorMaximo(Number(tempValorMaximo));
        setModalVisible(false);
      })
      .catch((error) => {
        console.error("Erro ao salvar o valor máximo:", error);
      });
  };

  const handleSave = () => {
    saveMaxValue();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Search />
      <BarChart valorRS={valorRS} valorMaximo={valorMaximo} />
      <Button
        title="Definir Valor Máximo"
        onPress={() => setModalVisible(true)}
        color="green"
        style={styles.button}
      />

      <Apresentacao />

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Digite o Valor Máximo</Text>
            <TextInput
              style={styles.input}
              value={tempValorMaximo}
              onChangeText={(text) => setTempValorMaximo(text)}
              keyboardType="numeric"
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Salvar" onPress={handleSave} />
              <Button title="Cancelar" onPress={handleCancel} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "green",
    marginTop: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center", // Alinha os elementos no centro horizontalmente
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%", // Utiliza 100% da largura disponível
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    width: "100%", // Utiliza 100% da largura disponível
  },
});


const mapStateToProps = (state) => {
  return {
    valorRS: state.variable.valorRS,
  };
};

export default connect(mapStateToProps)(InicioScreen);
