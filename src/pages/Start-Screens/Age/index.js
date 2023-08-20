import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from "react-native-animatable"
export default function Age() {
  const navigation = useNavigation();
  const [selectedAge, setSelectedAge] = useState(25); // Starting age

  return (
    <View style={styles.container}>
      <Animatable.View delay={200} animation="fadeInDown" style={styles.iconContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Qual a sua idade?</Text>
        <Text style={styles.subtitle}>Quantos anos de aventuras você já viveu?</Text>
      </View>
      
      </Animatable.View>
      <Animatable.View delay={200} animation="fadeInLeft" style={styles.iconContainer}>
      <View style={styles.ageContainer}>
        <TouchableOpacity style={styles.changeAgeButton} onPress={() => setSelectedAge(Math.max(0, selectedAge - 1))}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.ageText}>{selectedAge}</Text>

        <TouchableOpacity style={styles.changeAgeButton} onPress={() => setSelectedAge(selectedAge + 1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      </Animatable.View>
      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={() => {navigation.navigate('Gender')}}
          style={styles.backButton}
        >
          <Text style={styles.buttonTextBack}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {navigation.navigate('Weight')}}
          style={styles.continueButton}
        >
          <Text style={styles.buttonTextContinue}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between', // This will push the header to the top and footer to the bottom
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Poppins_700Bold',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
  ageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  ageText: {
    fontSize: 50,
    marginHorizontal: 15,
    fontFamily: 'Poppins_400Regular',
  },
  changeAgeButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#b6b6b6',
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  continueButton: {
    width: '47%',
    padding: 15,
    borderRadius: 70,
    backgroundColor: '#20183f',
    alignItems: 'center',
  },
  backButton: {
    width: '47%',
    padding: 15,
    borderRadius: 70,
    backgroundColor: '#d3d3dd',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
  },
  buttonTextContinue: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
  },
  buttonTextBack: {
    color: '#20183f',
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
  },
});

