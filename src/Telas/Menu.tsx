import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface MenuProps {
  navigation: any;
}

const Menu: React.FC<MenuProps> = ({ navigation }) => {
  const goToHome = () => {
    navigation.navigate('Home');
  };

  const goToCalculo = () => {
    navigation.navigate('Calculo');
  };

  const goToAnalise = () => {
    navigation.navigate('Analise');
  };

  return (
    <View>
      <TouchableOpacity onPress={goToHome}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToCalculo}>
        <Text>Calculo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToAnalise}>
        <Text>Analise</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
