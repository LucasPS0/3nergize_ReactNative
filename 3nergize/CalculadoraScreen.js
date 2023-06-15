import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setValorRS } from "./redux/actions/variableActions";
import { styles } from "./styles";

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

  const dispatch = useDispatch();

  const valorRS = useSelector((state) => state.variable.valorRS);



  useEffect(() => {
    fetchApiData();
  }, []);

  const fetchApiData = async () => {
    try {
      const response = await axios.get(
        "https://apise.way2.com.br/v1/tarifas",
        {
          params: {
            apikey: "2163780d87ee4237884c498ece5ea7cc",
            agente: "CELPE",
            ano: "2022",
          },
        }
      );

      const data = response.data;
      const tarifademandatusd = data[0].tarifaconsumotusd;
      setTarifaConsumo(tarifademandatusd);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch tarifa data");
    }

    try {
      const response = await axios.get(
        "https://apise.way2.com.br/v1/tarifas",
        {
          params: {
            apikey: "2163780d87ee4237884c498ece5ea7cc",
            agente: "CELPE",
            ano: "2022",
          },
        }
      );

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
      setValorRS(valorTotal.toFixed(2))
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
        .get("https://threenergize.onrender.com/dados")
        .then((response) => {
          const dadosExistentes = response.data;
          if (dadosExistentes.length > 0) {
            const idDadosExistentes = dadosExistentes[0]._id;
            axios
              .put(`https://threenergize.onrender.com/dados/${idDadosExistentes}`, dados)
              .then((response) => {
                console.log("Dados atualizados com sucesso!");
                // Handle success
              })
              .catch((error) => {
                console.log("Erro ao atualizar os dados:", error);
                // Handle error
              });
          } else {
            axios
              .post("https://threenergize.onrender.com/dados", dados)
              .then((response) => {
                console.log("Dados salvos com sucesso!");
                // Handle success
              })
              .catch((error) => {
                console.log("Erro ao salvar os dados:", error);
                // Handle error
              });
          }
        })
        .catch((error) => {
          console.log("Erro ao obter os dados existentes:", error);
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
      .delete(`https://threenergize.onrender.com/dados`)
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
          <TouchableOpacity style={styles.button} onPress={handleCalculate}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
};

export default CalculatorScreen;
