import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from "react-native-animatable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ActivityIndicator } from "react-native-paper";

export default function FitnessGoal() {
  const navigation = useNavigation();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar o aviso
  const [loading, setLoading] = useState(false);

  const updateGoalInDatabase = async () => {
    if (!selectedGoal) {
      Vibration.vibrate(); // Faz o celular vibrar
      setShowWarning(true); // Mostra o aviso
      return;
    }
    setLoading(true);

    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');

      const response = await axios.put(`https://backend-server-inteligym.azurewebsites.net/updateGoal/${userId}`, {
        goal: selectedGoal
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        navigation.navigate("Level");
      } else {
        console.error("Erro ao atualizar o objetivo.");
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
          <Text style={styles.title}>Qual é o seu objetivo?</Text>
          <Text style={styles.subtitle}>Selecione um objetivo para personalizar seu treino!</Text>
        </View>
      </Animatable.View>

      <Animatable.View delay={200} animation="fadeInRight" style={styles.iconContainer}>
        <View style={styles.goalContainer}>
          {["Perder peso", "Ganhar peso", "Ganhar massa muscular", "Manter peso"].map((goal, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.goalButton, selectedGoal === goal && styles.selectedGoalButton]}
              onPress={() => {
                setSelectedGoal(goal);
                setShowWarning(false); // Esconde o aviso quando um objetivo é selecionado
              }}
            >
              <Text style={styles.goalText}>{goal}</Text>
            </TouchableOpacity>
          ))}
          {showWarning && <Text style={styles.warningText}>Por favor, selecione um objetivo!</Text>}
        </View>
      </Animatable.View>

      <View style={styles.footer}>
        <TouchableOpacity 
          onPress={() => {navigation.goBack()}}
          style={styles.backButton}
        >
          <Text style={styles.buttonTextBack}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={updateGoalInDatabase}
          style={styles.continueButton}
        >
          <Text style={styles.buttonTextContinue}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  warningText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'space-between', // This will push the header to the top and footer to the bottom
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
  goalContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    
  },
  goalButton: {
    width: '120%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 70,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    borderWidth: 0,

    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Android shadow
    elevation: 2,
},
  selectedGoalButton: {
    borderWidth: 2,
    borderColor: '#20183f',
  },
  goalText: {
    color: '#20183f',
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
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