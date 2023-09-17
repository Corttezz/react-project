import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import { Platform } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as Animatable from "react-native-animatable";

const HomeScreen = () => {
  // Estado inicial dos dados do usuário
  const initialUserData = {
    nome: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pedir permissões e buscar dados iniciais quando o componente é montado
  useEffect(() => {
    fetchUserData();
  }, []);


  // Buscar dados do usuário
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.get(
        `https://backend-server-inteligym.azurewebsites.net/getUserData/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        updateStateWithUserData(response.data);
      } else {
        console.error("Erro ao buscar os dados do usuário.");
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStateWithUserData = (data) => {
    setUserData({
      ...userData,
      nome: data.nome,
      age: data.age,
      height: data.height,
      weight: data.weight,
    });
  };

  const calculcarIMC = () => {
    const altura = userData.height/100;
    const imc = userData.weight / (altura * altura );
    return imc.toFixed(2);
  }


const IMC = calculcarIMC();




  return (
    <View style={styles.title}>
      {/* Se loading for true, mostra o ActivityIndicator */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.whiteBox}>
            <ActivityIndicator size="large" color="#20183ff" />
          </View>
        </View>
      )}
      <Text style={styles.titleText}> Home </Text>
      <View style={styles.container}>
        <Text style={styles.text}> Seja bem-vindo, {userData.nome} </Text>

        <View style={styles.optionsContainer}>

          <View style={styles.row}>
            <TouchableOpacity style={styles.optionIMC}>
              <Text style={styles.optionTitle}>IMC</Text>
              <Text style={styles.optionDescription}>Seu IMC atual é:</Text>
              <Text style={styles.IMCtext}> {IMC} </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionTreinos}>
              <Text style={styles.optionTitle}>Treinos</Text>
              <Text>bla bla bla</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.row}>
            <TouchableOpacity style={styles.optionDiet}>
            <Text style={styles.optionTitle}>Treinos</Text>
              <Text>bla bla bla</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionCronometer}>
            <Text style={styles.optionTitle}>Treinos</Text>
              <Text>bla bla bla</Text>
            </TouchableOpacity>
          </View>
          
          
          <View style={styles.row}>
            <TouchableOpacity style={styles.optionMetas}>
            <Text style={styles.optionTitle}>Treinos</Text>
              <Text>bla bla bla</Text>
            
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionSequency}>
            <Text style={styles.optionTitle}>Treinos</Text>
              <Text>bla bla bla</Text>
            </TouchableOpacity>
          </View>
        
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  title: {
    backgroundColor: "#20183f",
  },
  titleText: {
    color: "#F2F2F2",
    paddingLeft: "5%",
    paddingTop: "3%",
    paddingBottom: "3%",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
  optionTitle: {
    color: "#F2F2F2",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    marginTop: "10%"
  },
  text: {
    color: "black",
    paddingLeft: "5%",
    paddingTop: "4%",
    paddingBottom: "2%",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // você pode usar um fundo translúcido
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: "100%",
  },

  optionsContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  optionDescription: {
    color: "#F2F2F2",
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  IMCtext: { 
    color: "#F2F2F2",
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
  },
  optionIMC: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "green",
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 }, // Aumentando a altura da sombra
        shadowOpacity: 0.6, // Aumentando a opacidade da sombra
        shadowRadius: 6, // Aumentando o raio da sombra
      },
      android: {
        elevation: 6, // Aumentando a elevação
      },
    }),
  },
  optionTreinos: {
    width: 150,
    height: 150,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#20183f",
  },
  optionDiet: {
    width: 150,
    height: 150,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#20183f",
  },
  optionCronometer: {
    width: 150,
    height: 150,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#20183f",
  },
  optionMetas: {
    width: 150,
    height: 150,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#20183f",
  },
  optionSequency: {
    width: 150,
    height: 150,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#20183f",
  },
  
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'white',
  // },

});

export default HomeScreen;


