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
import { Entypo, Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";



const HomeScreen = () => {
  const navigation = useNavigation();
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

  // Buscar dados do usuário
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      console.log("userId", userId);
      console.log("token", token);

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
    const altura = userData.height / 100;
    const imc = userData.weight / (altura * altura);
    return imc.toFixed(2);
  }

  const IMC = calculcarIMC();

  // Use o useFocusEffect para buscar os dados do usuário quando a tela for focada
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );



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

            <TouchableOpacity style={styles.optionTreinos} onPress={() => navigation.navigate('Treinos')}>
              <Text style={styles.optionTitle}>Seus treinos</Text>
              <MaterialCommunityIcons style={styles.optionIcon} name="weight-lifter" />
            </TouchableOpacity>
          </View>


          <View style={styles.row}>
            <TouchableOpacity style={styles.optionDiet}>
              <Text style={styles.optionTitle}>Dieta</Text>
              <Text style={styles.IMCtext}>2100 kcal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionCronometer} onPress={() => navigation.navigate('Cronometro')}>
              <Text style={styles.optionTitle}>Cronômetro</Text>
              <MaterialCommunityIcons style={styles.optionIcon} name="timer" />
            </TouchableOpacity>
          </View>


          <View style={styles.row}>
            <TouchableOpacity style={styles.optionMetas}>
              <Text style={styles.optionTitle}>Minhas Metas</Text>
              <MaterialCommunityIcons style={styles.optionIcon} name="target" />

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
  whiteBox: {
    backgroundColor: "#FFFFFF",
    padding: 60,
    borderRadius: 10,
    elevation: 10, // para Android
    //shadowColor, shadowOffset, shadowOpacity, shadowRadius // para iOS se necessário
  },
  container: {
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: "100%",
  },
  optionIcon: {
    color: "#F2F2F2",
    fontSize: 45,
    textAlign: "center",
    marginTop: "2%"
  },
  optionsContainer: {
    bottom: "8%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    
  },
  row: {
    flexDirection: "row",
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
    height: 120,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#cc0000",
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
  optionDiet: {
    width: 160,
    height: 115,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#cc9000",
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
  optionCronometer: {
    top: -30,
    width: 140,
    height: 120,
    margin: 10,
    borderRadius: 10,
    // quero um azul
    backgroundColor: "#0900cc",
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
  optionMetas: {
    width: 170,
    height: 120,
    margin: 10,
    borderRadius: 10,
    // cor diferente das usadas mas seguindo o mesmo padrçao
    backgroundColor: "#cc00cc",
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
  optionSequency: {
    top: -30,
    width: 130,
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

  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'white',
  // },

});

export default HomeScreen;


