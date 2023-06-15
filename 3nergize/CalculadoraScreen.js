import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setValorRS } from "./redux/actions/variableActions";
import { connect } from "react-redux";

const CalculatorScreen = () => {
  const [valorInicial, setValorInicial] = useState("");
  const [valorFinal, setValorFinal] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [consumo, setConsumo] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true);
  const [tarifaConsumo, setTarifaConsumo] = useState(null);
  const [taxaIluminacao, setTaxaIluminacao] = useState(null);
  const [valorRS, setvalorRs] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiData();
  });

  const fetchApiData = async () => {
    try {
      const response = await axios.get("https://apise.way2.com.br/v1/tarifas", {
        params: {
          apikey: "2163780d87ee4237884c498ece5ea7cc",
          agente: "CELPE",
          ano: "2022",
        },
      });

      const data = response.data;
      const tarifademandatusd = data[0].tarifaconsumotusd;
      setTarifaConsumo(tarifademandatusd);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch tarifa data");
    }

    try {
      const response = await axios.get("https://apise.way2.com.br/v1/tarifas", {
        params: {
          apikey: "2163780d87ee4237884c498ece5ea7cc",
          agente: "CELPE",
          ano: "2022",
        },
      });

      const data = response.data;
      const tarifademandatusd = data[0].tarifademandatusd;
      setTaxaIluminacao(tarifademandatusd);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch tarifa base data");
    }
  };

  const handleValorInicialChange = (text) => {
    setValorInicial(text);
  };

  const handleValorFinalChange = (text) => {
    setValorFinal(text);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const day = selectedDate.getDate().toString().padStart(2, "0");
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
      const year = selectedDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;

      if (isStartDate) {
        setDataInicial(formattedDate);
      } else {
        setDataFinal(formattedDate);
      }
    }
  };

  const handleDataInicialPress = () => {
    setIsStartDate(true);
    setShowDatePicker(true);
  };

  const handleDataFinalPress = () => {
    setIsStartDate(false);
    setShowDatePicker(true);
  };

  const handleCalculate = () => {
    const valorInicialFloat = parseFloat(valorInicial);
    const valorFinalFloat = parseFloat(valorFinal);

    if (!isNaN(valorInicialFloat) && !isNaN(valorFinalFloat)) {
      const valorCalculado = valorFinalFloat - valorInicialFloat;
      const taxaConsumoNumber = Number(tarifaConsumo);
      const taxaIluminacaoNumber = Number(taxaIluminacao);
      const valorConsumo = (taxaConsumoNumber / 100) * valorCalculado;
      const valorTotal = valorConsumo + taxaIluminacaoNumber;
      setConsumo(valorCalculado.toFixed(2));
      dispatch(setValorRS(valorTotal.toFixed(2)));
      setvalorRs(valorTotal.toFixed(2));

      const dados = {
        valorInicial: valorInicialFloat,
        valorFinal: valorFinalFloat,
        dataInicial,
        dataFinal,
        resultadoKwh: valorCalculado.toFixed(2),
        resultadoPeriodo: "", // Update this property later
        resultadoValor: valorTotal.toFixed(2),
      };

      axios
        .post("http://192.168.0.10:3000/dados", dados)
        .then((response) => {
          console.log("Dados salvos com sucesso!");
          // Handle success
        })
        .catch((error) => {
          console.log("Erro ao salvar os dados:", error);
          // Handle error
        });
    } else {
      setConsumo("");
    }

    if (dataInicial && dataFinal) {
      const [diaInicial, mesInicial, anoInicial] = dataInicial.split("/");
      const [diaFinal, mesFinal, anoFinal] = dataFinal.split("/");

      const dataInicialObj = new Date(anoInicial, mesInicial - 1, diaInicial);
      const dataFinalObj = new Date(anoFinal, mesFinal - 1, diaFinal);

      const periodoDias =
        Math.abs(dataFinalObj - dataInicialObj) / (1000 * 60 * 60 * 24);
      setPeriodo(periodoDias.toFixed(0));
    } else {
      setPeriodo("");
    }
  };

  const handleDelete = () => {
    axios
      .delete(`http://192.168.0.10:3000/consultas`)
      .then((response) => {
        console.log("Todos os registros excluídos com sucesso!");
      })
      .catch((error) => {
        console.log("Erro ao excluir todos os registros:", error);
      });
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.titleElement}>Valor Inicial (kW):</Text>
            <TextInput
              value={valorInicial}
              onChangeText={handleValorInicialChange}
              keyboardType="numeric"
              placeholder="Valor do Relógio Numérico Inicial"
              style={styles.textInputElement}
            />

            <Text style={styles.datelTitleElement}>Data Inicial:</Text>
            <Button
              color={"rgb(6, 163, 124)"}
              title={dataInicial || "Selecionar"}
              onPress={handleDataInicialPress}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.titleElement}>Valor Final (kW):</Text>
            <TextInput
              value={valorFinal}
              onChangeText={handleValorFinalChange}
              keyboardType="numeric"
              placeholder="Valor do Relógio Numérico Atual"
              style={styles.textInputElement}
            />

            <Text style={styles.datelTitleElement}>Data Final:</Text>
            <Button
              color={"rgb(6, 163, 124)"}
              title={dataFinal || "Selecionar"}
              onPress={handleDataFinalPress}
            />
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <View style={styles.outputContainer}>
          {tarifaConsumo && (
            <Text style={styles.outputElement}>
              Tarifa de Consumo: {tarifaConsumo}
            </Text>
          )}

          {taxaIluminacao && (
            <Text style={styles.outputElement}>
              Taxa de Iluminação: {taxaIluminacao}
            </Text>
          )}

          {valorRS !== "" && (
            <Text style={styles.outputElement}>Valor (R$): {valorRS}</Text>
          )}

          {consumo !== "" && (
            <Text style={styles.outputElement}>Consumo (KWh): {consumo}</Text>
          )}

          {periodo !== "" && (
            <Text style={styles.outputElement}>Período (dias): {periodo}</Text>
          )}
        </View>

        <View style={styles.styledButtonContainer}>
          <TouchableOpacity
            color={"rgb(6, 163, 124)"}
            title="Calcular"
            onPress={handleCalculate}
          />

          <TouchableOpacity
            color="rgb(6, 163, 124)"
            title="Excluir"
            onPress={() => handleDelete()}
          />
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },

  backgroundContainer: {
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 12,
    display: "flex",
    justifyContent: "space-evenly",
    position: "relative",
    top: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },

  inputContainer: {
    padding: 17,
  },

  titleElement: {
    fontSize: 20,
    fontWeight: "bold",
  },

  datelTitleElement: {
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8,
  },

  textInputElement: {
    borderBottomWidth: 1,
    textAlign: "left",
    padding: 5,
    marginTop: 12,
    marginBottom: 12,
  },

  outputContainer: {
    padding: 17,
    margin: 12,
    borderRadius: 12,

    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },

  outputElement: {
    fontSize: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    lineHeight: 30,
    fontWeight: "bold",
  },

  styledButtonContainer: {
    marginLeft: 24,
    marginRight: 24,
  },
});

const mapStateToProps = (state) => {
  return {
    valorRS: state.variable.valorRS,
  };
};

export default connect(mapStateToProps)(CalculatorScreen);
