import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";

const Dieta = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // Estados para os campos do treino
  const [frequencia, setFrequencia] = useState(0);
  const [objetivo, setObjetivo] = useState("");
  const [diasTreino, setDiasTreino] = useState(0);
  const [parteCorpo, setParteCorpo] = useState("");
  const [firstTreino, setFirstTreino] = useState(0);

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
        console.log("userId", userId);
        console.log("token", token);
      } else {
        console.error("Erro ao buscar os dados do usuário.");
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendTreino = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      const treinoData = {
        frequencia,
        objetivo,
        dias_treino: diasTreino,
        parte_corpo: parteCorpo,
        firstTreino,
      };

      const response = await axios.post(
        `https://backend-server-inteligym.azurewebsites.net/insertTreino/${userId}`,
        treinoData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Treino inserido com sucesso!");
        // Redirecionar ou fazer alguma outra ação após inserir o treino com sucesso.
        navigation.navigate("TreinosFrequency");
      } else {
        console.error("Erro ao inserir o treino.");
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
    } finally {
      setLoading(false);
    }
  };

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
      <View style={styles.headerContainer}>
        <Ionicons
          style={styles.backIcon}
          name="arrow-back-outline"
          onPress={() => navigation.navigate("Treinos")}
        />
        <Text style={styles.titleText}> Montando o seu treino </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.description}>
          <Text style={styles.text}>
            Vamos montar o seu treino de acordo com o seu perfil utilizando{" "}
            <Text style={styles.specialText}>inteligência artificial</Text>. Para
            isso, precisamos de algumas informações.
          </Text>
          <MaterialCommunityIcons
            style={styles.BrainIcon}
            name="brain"
          />
          <TouchableOpacity
            onPress={sendTreino}
            style={styles.montarTreinoButton}
          >
            <Text style={styles.buttonText}>COMEÇAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: "#20183f",
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
  text: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    padding: 16,
    top: "5%",
  },
  description: {
    alignItems: "center",
    justifyContent: "center",
  },
  specialText: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    padding: 16,
  },
  BrainIcon: {
    fontSize: 200,
    color: "#20183f",
    paddingLeft: "5%",
    paddingTop: "7%",
    paddingBottom: "3%",
    top: "20%",
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 30,
    color: "#F2F2F2",
    paddingLeft: "5%",
    paddingTop: "3%",
    paddingBottom: "3%",
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
    width: 200,
    top: "30%",
  },
  buttonText: {
    color: "#F2F2F2",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
  },
});

export default Dieta;