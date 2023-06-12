import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
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
      setvalorRs(valorTotal.toFixed(2))

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

  return (
    <View style={styles.container}>
      <Text>Valor Inicial (kW):</Text>
      <TextInput
        value={valorInicial}
        onChangeText={handleValorInicialChange}
        placeholder="Valor Inicial"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Valor Final (kW):</Text>
      <TextInput
        value={valorFinal}
        onChangeText={handleValorFinalChange}
        placeholder="Valor Final"
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.datePickerContainer}>
        <Text>Data Inicial:</Text>
        <Button title={dataInicial || "Selecionar"} onPress={handleDataInicialPress} />
      </View>

      <View style={styles.datePickerContainer}>
        <Text>Data Final:</Text>
        <Button title={dataFinal || "Selecionar"} onPress={handleDataFinalPress} />
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Button title="Calcular" onPress={handleCalculate} />

      {consumo !== "" && (
        <Text style={styles.result}>Consumo (KWh): {consumo}</Text>
      )}

      {periodo !== "" && (
        <Text style={styles.result}>Período (dias): {periodo}</Text>
      )}

      {tarifaConsumo && (
        <Text style={styles.result}>Tarifa de Consumo: {tarifaConsumo}</Text>
      )}

      {taxaIluminacao && (
        <Text style={styles.result}>Taxa de Iluminação: {taxaIluminacao}</Text>
      )}

      {valorRS !== "" && (
        <Text style={styles.result}>Valor (R$): {valorRS}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 100,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => {
  return {
    valorRS: state.variable.valorRS,
  };
};


export default connect(mapStateToProps) (CalculatorScreen);

