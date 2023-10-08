import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'; // Importe o Image aqui

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search Page</Text>
      <Image source={{ uri: "https://inteligym.blob.core.windows.net/exercises/Bracos/Rosca%20(Dumbbell%20Curls).gif" }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  image: {
    width: 200, // Defina a largura desejada para a imagem
    height: 200, // Defina a altura desejada para a imagem
  },
});
