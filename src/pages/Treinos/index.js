import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const Treinos = () => {
  const navigation = useNavigation();

  const initialUserData = {
    nome: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [loading, setLoading] = useState(true);

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
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  // Verifica se o usuário possui um treino
  const userHasTraining = false; // Defina como true se o usuário já tiver um treino

  const handleMontarTreino = () => {
    // Lógica para navegar para a tela de montagem de treino
    // Você pode usar a função navigation.navigate() aqui para navegar para a tela de montagem de treino
  };

  return (
    
    <View style={styles.title}>
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}> Treinos </Text>
      </View>
      <View style={styles.container}>
      {userHasTraining ? (
        <View style={styles.warnig}>
          // Se o usuário já tiver um treino
          <Text style={styles.text}> Ei Você já possui um treino.</Text>
          </View>
        ) : (
          // Se o usuário não tiver um treino
          <>
            <View style={styles.warnig}>
            <Text style={styles.text}>Ei {userData.nome}, você ainda não possui um treino.</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('TreinosFirstScreen')}
              style={styles.montarTreinoButton}
            >
              <Text style={styles.buttonText}>MONTAR TREINO</Text>
            </TouchableOpacity>
            </View>
          </>
        )}
    </View>
    </View>
  );
};


const styles = StyleSheet.create({
  title: {
    backgroundColor: "#20183f",
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  warnig: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9F9F9",
    top: "30%",
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    padding: 16,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: "100%",
  },
  titleText: {
    color: "#F2F2F2",
    paddingLeft: "5%",
    paddingTop: "3%",
    paddingBottom: "2%",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },

  montarTreinoButton: {
    backgroundColor: "#20183f",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#F2F2F2",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
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
});

export default Treinos;
