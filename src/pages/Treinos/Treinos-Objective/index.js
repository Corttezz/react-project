import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";

const Objective = () => {
  const initialUserData = {
    goal: "",
    nome: "",
  };

  const navigation = useNavigation();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar o aviso
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(initialUserData);

  const updateGoalInDatabase = async () => {
    setLoading(true);
    if (!selectedGoal) {
      setShowWarning(true); // Mostra o aviso
      return;
    }
    setLoading(true);

    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.put(
        `https://backend-server-inteligym.azurewebsites.net/updateFrequencia/${userId}`,
        {
          frequencia: selectedGoal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("deu certo");
        console.log(response.data);

        navigation.navigate("TreinosObjective");
      } else {
        console.error("Erro ao atualizar o objetivo.");
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    } finally {
      setLoading(false);
    }
  };

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
        setSelectedGoal(response.data.goal);
        console.log(userData.goal);
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
      goal: data.goal,
      nome: data.nome,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  return (
    <View style={styles.title}>
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
          onPress={() => navigation.navigate("TreinosFrequency")}
        />
        <Text style={styles.titleText}> Objetivo </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.description}>
          <Text style={styles.text}>Certo,
          <Text style={styles.specialText}> {userData.nome}, </Text> 
             anteriormente você nos disse que seu objetivo era <Text style={styles.specialText}>{userData.goal}</Text>, agora precisamos ter certeza se esse é o seu objetivo atual.
             Caso o objetivo tenha mudado, selecione o novo objetivo abaixo.
          </Text>

          
          <Animatable.View
          delay={200}
          animation="fadeInRight"
          style={styles.iconContainer}
        >
          <View style={styles.goalContainer}>
            {[
              "Perder peso",
              "Ganhar peso",
              "Ganhar massa muscular",
              "Manter peso",
            ].map((goal, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.goalButton,
                  selectedGoal === goal && styles.selectedGoalButton,
                ]}
                onPress={() => {
                  setSelectedGoal(goal);
                  setShowWarning(false); // Esconde o aviso quando um objetivo é selecionado
                }}
              >
                <Text style={styles.goalText}>{goal}</Text>
              </TouchableOpacity>
            ))}
            {showWarning && (
              <Text style={styles.warningText}>
                Por favor, selecione um objetivo!
              </Text>
            )}
          </View>
        </Animatable.View>
        <TouchableOpacity
          onPress={updateGoalInDatabase}
          style={styles.montarTreinoButton}
        >
          <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  iconContainer: {
    top: "-10%",
  },
  whiteBox: {
    backgroundColor: "#FFFFFF",
    padding: 60,
    borderRadius: 10,
    elevation: 10, // para Android
    //shadowColor, shadowOffset, shadowOpacity, shadowRadius // para iOS se necessário
  },
  title: {
    backgroundColor: "#20183f",
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    padding: 15,
    top: "2%",
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  

  goalButton: {
    width: "120%",
    padding: 15,
    marginVertical: 10,
    borderRadius: 70,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
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
    borderColor: "#20183f",
  },
  goalText: {
    color: "#20183f",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  buttonText: {
    color: "#F2F2F2",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
  },
  warningText: {
    color: "red",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  goalContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    top: "17%",
  },
  
  montarTreinoButton: {
    backgroundColor: "#20183f",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    width: 200,
    top: "1%",
  },
  buttonText: {
    color: "#F2F2F2",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
  },
});

export default Objective;
