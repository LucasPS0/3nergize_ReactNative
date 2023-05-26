import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <View style={styles.titleContainer}>
          <Appbar.Content title="Bem-vindos" titleStyle={styles.title} />
        </View>
      </Appbar.Header>

      <View style={styles.contentContainer}>
        <Text style={styles.message}>Seja bem-vindo ao nosso aplicativo!</Text>
      </View>

      <View style={styles.apresentationContainer}>
        <Text style={styles.apresentationTitle}>3nergize</Text>
        <Text style={styles.apresentationSubtitle}>Manager</Text>
        <Text style={styles.apresentationDescription}>Faça consultas sobre seus Gastos</Text>
        <Text style={styles.apresentationDescription}>Vamos gerenciar e otimizar o seu uso de energia</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    backgroundColor: 'green',
    elevation: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 15,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  apresentationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  apresentationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  apresentationSubtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  apresentationDescription: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default HomeScreen;
