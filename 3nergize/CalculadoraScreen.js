import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

export default class CalculatorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valorInicial: '',
      valorFinal: '',
      dataInicial: '',
      dataFinal: '',
      consumo: '',
      periodo: '',
      showDatePicker: false,
      isStartDate: true,
      tarifaConsumo: null,
      taxaIluminacao: null,
      valorRS: '',
    };
  }

  componentDidMount() {
    this.fetchApiData();
  }

  // Método para buscar dados da API
  fetchApiData = async () => {
    try {
      const response = await axios.get(
        'https://apise.way2.com.br/v1/tarifas',
        {
          params: {
            apikey: '2163780d87ee4237884c498ece5ea7cc',
            agente: 'CELPE',
            ano: '2022',
          },
        }
      );

      const data = response.data;
      const tarifademandatusd = data[0].tarifaconsumotusd;
      this.setState({ tarifaConsumo: tarifademandatusd });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch tarifa data');
    }

    try {
      const response = await axios.get(
        'https://apise.way2.com.br/v1/tarifas',
        {
          params: {
            apikey: '2163780d87ee4237884c498ece5ea7cc',
            agente: 'CELPE',
            ano: '2022',
          },
        }
      );

      const data = response.data;
      const tarifademandatusd = data[0].tarifademandatusd;
      this.setState({ taxaIluminacao: tarifademandatusd });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch tarifa base data');
    }

    try {
      const response = await axios.get(
        'https://apise.way2.com.br/v1/bandeiras',
        {
          params: {
            apikey: '2163780d87ee4237884c498ece5ea7cc',
            datainicial: '2023-03-01',
            datafinal: '2023-03-31',
          },
        }
      );

      const data = response.data;
      const value = data.items[0].value;
      this.setState({ tarifaBandeira: value });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch tarifa bandeira data');
    }
  };

  // Manipuladores de eventos para atualizar os estados
  handleValorInicialChange = (text) => {
    this.setState({ valorInicial: text });
  };

  handleValorFinalChange = (text) => {
    this.setState({ valorFinal: text });
  };

  handleDateChange = (event, selectedDate) => {
    this.setState({ showDatePicker: false });
    if (selectedDate) {
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;

      if (this.state.isStartDate) {
        this.setState({ dataInicial: formattedDate });
      } else {
        this.setState({ dataFinal: formattedDate });
      }
    }
  };

  handleDataInicialPress = () => {
    this.setState({ isStartDate: true, showDatePicker: true });
  };

  handleDataFinalPress = () => {
    this.setState({ isStartDate: false, showDatePicker: true });
  };

  handleCalculate = () => {
    const { valorInicial, valorFinal, dataInicial, dataFinal, tarifaConsumo, taxaIluminacao } = this.state;
    const valorInicialFloat = parseFloat(valorInicial);
    const valorFinalFloat = parseFloat(valorFinal);

    if (!isNaN(valorInicialFloat) && !isNaN(valorFinalFloat)) {
      const valorCalculado = valorFinalFloat - valorInicialFloat;
      const taxaConsumoNumber = Number(tarifaConsumo);
      const taxaIluminacaoNumber = Number(taxaIluminacao);
      const valorConsumo = (taxaConsumoNumber / 100) * valorCalculado;
      const valorTotal = valorConsumo + taxaIluminacaoNumber;
      this.setState({
        consumo: valorCalculado.toFixed(2),
        valorRS: valorTotal.toFixed(2)
      });
    } else {
      this.setState({ consumo: '', valorRS: '' });
    }

    if (dataInicial && dataFinal) {
      const [diaInicial, mesInicial, anoInicial] = dataInicial.split('/');
      const [diaFinal, mesFinal, anoFinal] = dataFinal.split('/');

      const dataInicialObj = new Date(anoInicial, mesInicial - 1, diaInicial);
      const dataFinalObj = new Date(anoFinal, mesFinal - 1, diaFinal);

      const periodoDias = Math.abs(dataFinalObj - dataInicialObj) / (1000 * 60 * 60 * 24);
      this.setState({ periodo: periodoDias.toFixed(0) });
    } else {
      this.setState({ periodo: '' });
    }
  };

  render() {
    const { valorInicial, valorFinal, dataInicial, dataFinal, consumo, periodo, showDatePicker, tarifaConsumo, taxaIluminacao, valorRS } = this.state;

    return (
      <View style={styles.container}>
        <Text>Valor Inicial (kW):</Text>
        <TextInput
          value={valorInicial}
          onChangeText={this.handleValorInicialChange}
          placeholder="Valor Inicial"
          keyboardType="numeric"
          style={styles.input}
        />

        <Text>Valor Final (kW):</Text>
        <TextInput
          value={valorFinal}
          onChangeText={this.handleValorFinalChange}
          placeholder="Valor Final"
          keyboardType="numeric"
          style={styles.input}
        />

        <View style={styles.datePickerContainer}>
          <Text>Data Inicial:</Text>
          <Button
            title={dataInicial || 'Selecionar'}
            onPress={this.handleDataInicialPress}
          />
        </View>

        <View style={styles.datePickerContainer}>
          <Text>Data Final:</Text>
          <Button
            title={dataFinal || 'Selecionar'}
            onPress={this.handleDataFinalPress}
          />
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={this.handleDateChange}
          />
        )}

        <Button title="Calcular" onPress={this.handleCalculate} />

        <Text>Consumo Atual (kW): {consumo}</Text>
        <Text>Período (dias): {periodo}</Text>
        <Text>Tarifa Consumo (R$/kWh): {tarifaConsumo}</Text>
        <Text>Taxa Iluminação (R$): {taxaIluminacao}</Text>
        <Text>Valor (R$): {valorRS}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});
