import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const TelaCalculo = () => {
  const consumoAtual = '10';
  const Dias = '30';
  const novoValorTotal = 50;

  const handleButtonClick = () => {
    // Lógica para manipular o botão Energize
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayWrapper}>
        <View>
          <Text>Consumo Atual</Text>
          <Text>
            <Text>{`${consumoAtual} kWh`}</Text>
          </Text>
          <Text>
            Periodo <Text>{Dias} Dias</Text>
          </Text>
        </View>

        <View style={styles.values}>
          <Text>Valor:</Text>
          <Text>
            <Text>{`R$${novoValorTotal.toFixed(2)}`}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.inputs}>
        <View>
          <Text style={styles.label}>Valor Inicial (kW):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Numeração Inicial do relógio"
            defaultValue="100"
          />
          <Text style={styles.label}>Valor Atual (kW):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Numeração Atual do relógio"
          />
        </View>

        <View>
          <Text style={styles.label}>Data Inicial:</Text>
          <TextInput
            style={styles.input}
            placeholder="Data Inicial"
          />
          <Text style={styles.label}>Data Final:</Text>
          <TextInput
            style={styles.input}
            placeholder="Data Final"
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleButtonClick} style={styles.buttonContainer}>
        <Text style={styles.button}>Energize</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F1E4',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  displayWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  values: {
    alignItems: 'flex-end',
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default TelaCalculo;
