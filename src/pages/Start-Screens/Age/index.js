import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Age() {
  const navigation = useNavigation();
  const [selectedAge, setSelectedAge] = useState(18); // Starting age

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Qual a sua idade?</Text>
      </View>

      <View style={styles.ageContainer}>
        <TouchableOpacity style={styles.changeAgeButton} onPress={() => setSelectedAge(Math.max(0, selectedAge - 1))}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.ageText}>{selectedAge}</Text>

        <TouchableOpacity style={styles.changeAgeButton} onPress={() => setSelectedAge(selectedAge + 1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        onPress={() => {/* Do something, maybe navigate to another screen or save the age */}}
        style={styles.continueButton}
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
  continueButton: {
    marginTop: 30,
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
