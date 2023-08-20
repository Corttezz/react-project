import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import * as Animatable from "react-native-animatable"

export default function Gender() {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nos conte um pouco mais sobre você</Text>
        <Text style={styles.subtitle}>Escolha o gênero biológico</Text>
      </View>

      <Animatable.View delay={600} animation="fadeInLeft" style={styles.iconContainer}>
      
        <TouchableOpacity 
          style={[styles.iconButton, selectedGender === 'male' && styles.selected]}
          onPress={() => setSelectedGender('male')}
        >
          <MaterialCommunityIcons name="gender-male" size={80} color="white" />
          <Text style={styles.iconLabel}>Masculino</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.iconButton, selectedGender === 'female' && styles.selected]}
          onPress={() => setSelectedGender('female')}
        >
          <MaterialCommunityIcons name="gender-female" size={80} color="white" />
          <Text style={styles.iconLabel}>Feminino</Text>
        </TouchableOpacity>

      </Animatable.View>

      <TouchableOpacity 
        onPress={() => navigation.navigate("Age")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Poppins_700Bold',
  },
  subtitle: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: 'Poppins_400Regular',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    width: 190,
    height: 190,
    borderRadius: 100, // Isso faz o botão ficar redondo
    backgroundColor: '#b6b6b6',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconLabel: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins_400Regular',
  },
  selected: {
    backgroundColor: '#20183f',
  },
  button: {
    marginBottom: 30,
    width: '90%',
    padding: 15,
    borderRadius: 70,
    backgroundColor: '#20183f',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
  },
});
