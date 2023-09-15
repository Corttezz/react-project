import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import * as Animatable from "react-native-animatable";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from "react-native-paper";
import { Alert } from 'react-native';

export default function Gender() {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar o aviso

  const updateGenderInDatabase = async () => {
    if (!selectedGender) {
      Vibration.vibrate(); // Faz o celular vibrar
      setShowWarning(true); // Mostra o aviso
      return;
    }
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId'); // Recupere o userId do AsyncStorage
      const token = await AsyncStorage.getItem('userToken'); // Recupere o token JWT do AsyncStorage

      const response = await axios.put(`https://backend-server-inteligym.azurewebsites.net/updateGender/${userId}`, {
        gender: selectedGender
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Inclua o token JWT no cabeçalho da solicitação
        }
      });

      if (response.status === 200) {
        setLoading(true);
        navigation.navigate("Age");
      } else {
        console.error("Erro ao atualizar o gênero.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token JWT inválido ou expirado
        Alert.alert("Sessão expirada", "Por favor, faça login novamente.");
        navigation.reset({
          index: 0,
          routes: [{ name: "SignIn" }], // Redirecione para a tela de login
        });
      } else {
        console.error("Erro ao fazer a solicitação:", error);
        Alert.alert("Erro", "Ocorreu um erro ao atualizar o gênero. Por favor, tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nos conte um pouco mais sobre você</Text>
        <Text style={styles.subtitle}>Escolha o gênero biológico</Text>
      </View>
{loading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.whiteBox}>
              <ActivityIndicator size="large" color="#20183ff" />
            </View>
          </View>
        )}
      <Animatable.View delay={600} animation="fadeInLeft" style={styles.iconContainer}>
        {/* Se loading for true, mostra o ActivityIndicator */}
        
      
        <TouchableOpacity 
          style={[styles.iconButton, selectedGender === 'Masculino' && styles.selected]}
          onPress={() => { setSelectedGender('Masculino')
          setShowWarning(false);} }
        >
          <MaterialCommunityIcons name="gender-male" size={80} color="white" />
          <Text style={styles.iconLabel}>Masculino</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.iconButton, selectedGender === 'Feminino' && styles.selected]}
          onPress={() => {setSelectedGender('Feminino')
          setShowWarning(false);}}
        >
          <MaterialCommunityIcons name="gender-female" size={80} color="white" />
          <Text style={styles.iconLabel}>Feminino</Text>
        </TouchableOpacity>

      </Animatable.View>
      {showWarning && 
    <Text style={styles.warningText}>Por favor, selecione uma opção!</Text>
}

      <TouchableOpacity 
      onPress={updateGenderInDatabase}
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
  warningText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
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
