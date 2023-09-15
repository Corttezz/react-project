import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from "react-native-animatable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ActivityIndicator } from "react-native-paper";

export default function Weight() {
  const navigation = useNavigation();
  const [selectedWeight, setSelectedWeight] = useState(60); // Starting weight
  const [loading, setLoading] = useState(false);

  const updateWeightInDatabase = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId'); // Recupere o userId do AsyncStorage
      const token = await AsyncStorage.getItem('userToken'); // Recupere o token JWT do AsyncStorage

      const response = await axios.put(`https://backend-server-inteligym.azurewebsites.net/updateWeight/${userId}`, {
        weight: selectedWeight
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Inclua o token JWT no cabeçalho da solicitação
        }
      });
  
      if (response.status === 200) {
        navigation.navigate("Height");
      } else {
        console.error("Erro ao atualizar o peso.");
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      {loading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.whiteBox}>
              <ActivityIndicator size="large" color="#20183ff" />
            </View>
          </View>
        )}
      <Animatable.View delay={200} animation="fadeInDown" style={styles.iconContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Qual o seu peso?</Text>
        <Text style={styles.subtitle}>Nos ajude a personalizar seu treino!</Text>
      </View>

      </Animatable.View>
      
      <Animatable.View delay={200} animation="fadeInLeft" style={styles.iconContainer}>
      <View style={styles.weightContainer}>
        <TouchableOpacity style={styles.changeWeightButton} onPress={() => setSelectedWeight(Math.max(0, selectedWeight - 1))}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.weightText}>{selectedWeight} Kg</Text>

        <TouchableOpacity style={styles.changeWeightButton} onPress={() => setSelectedWeight(selectedWeight + 1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      </Animatable.View>
      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={() => {navigation.navigate('Age')}}
          style={styles.backButton}
        >
          <Text style={styles.buttonTextBack}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={updateWeightInDatabase}
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
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)", // você pode usar um fundo translúcido
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  whiteBox: {
    backgroundColor: "#FFFFFF",
    padding: 40,
    borderRadius: 10,
    elevation: 10, // para Android
    //shadowColor, shadowOffset, shadowOpacity, shadowRadius // para iOS se necessário
  },
  weightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  weightText: {
    fontSize: 50,
    marginHorizontal: 15,
    fontFamily: 'Poppins_400Regular',
  },
  changeWeightButton: {
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

