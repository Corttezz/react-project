import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";


const Frequency = () => {
  const navigation = useNavigation();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar o aviso
  const [loading, setLoading] = useState(false);

  const updateGoalInDatabase = async () => {
    setLoading(true);
    if (!selectedGoal) {
      setShowWarning(true); // Mostra o aviso
      return;
    }

    try {

      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');

      const response = await axios.put(`https://backend-server-inteligym.azurewebsites.net/updateFrequencia/${userId}`, {
        frequencia: selectedGoal
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        console.log("deu certo");
        console.log(response.data);
        navigation.navigate("TreinosObjective");
      } else {

        console.error("Erro ao atualizar o objetivo.");

      }
    }
    catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
    }
    finally {
      setLoading(false);
    }
  }

  

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
          onPress={() => navigation.navigate("TreinosFirstScreen")}
        />
        <Text style={styles.titleText}> Frequência </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.description}>
          <Text style={styles.text}>
            Vamos começar com a <Text style={styles.specialText}>frequência</Text> que você pretende realizar seus
            treinos por semana. Selecione a melhor opção para você.
          </Text>

          <Animatable.View
            delay={200}
            animation="fadeInRight"
            style={styles.iconContainer}
          >
            <View style={styles.goalRow}>
              <TouchableOpacity
                style={[
                  styles.goalButton,
                  selectedGoal === 1 && styles.selectedGoalButton,
                ]}
                onPress={() => {
                  setSelectedGoal(1);
                  setShowWarning(false);
                  console.log(selectedGoal);
                }}
              >
                <Text style={styles.goalText}>1 vez</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.goalButton,
                  selectedGoal === 2 && styles.selectedGoalButton,
                ]}
                onPress={() => {
                  setSelectedGoal(2);
                  setShowWarning(false);
                  console.log(selectedGoal);
                }}
              >
                <Text style={styles.goalText}>2 vezes</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.goalRow}>
              <TouchableOpacity
                style={[
                  styles.goalButton,
                  selectedGoal === 3 && styles.selectedGoalButton,
                ]}
                onPress={() => {
                  setSelectedGoal(3);
                  setShowWarning(false);
                  console.log(selectedGoal);
                }}
              >
                <Text style={styles.goalText}>3 vezes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.goalButton,
                  selectedGoal === 4 && styles.selectedGoalButton,
                ]}
                onPress={() => {
                  setSelectedGoal(4);
                  setShowWarning(false);
                  console.log(selectedGoal);
                }}
              >
                <Text style={styles.goalText}>4 vezes</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.goalRow}>
              <TouchableOpacity
                style={[
                  styles.goalButton,
                  selectedGoal === 5 && styles.selectedGoalButton,
                ]}
                onPress={() => {
                  setSelectedGoal(5);
                  setShowWarning(false);
                  console.log(selectedGoal);
                }}
              >
                <Text style={styles.goalText}>5 vezes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.goalButton,
                  selectedGoal === 6 && styles.selectedGoalButton,
                ]}
                onPress={() => {
                  setSelectedGoal(6);
                  setShowWarning(false);
                  console.log(selectedGoal);
                }}
              >
                <Text style={styles.goalText}>6 vezes</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.goalRow}>
              <TouchableOpacity
                style={[
                  styles.goalButtonAllDays,
                  selectedGoal === 7 && styles.selectedGoalButton,
                ]}
                onPress={() => {
                  setSelectedGoal(7);
                  setShowWarning(false);
                  console.log(selectedGoal);
                }}
              >
                <Text style={styles.goalText}>Todos os dias</Text>
              </TouchableOpacity>
              
              
            </View>
            
          </Animatable.View>

         
          {showWarning && (
            <Text style={styles.warningText}>
              Por favor, selecione um objetivo!
            </Text>
          )}

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
    padding: 16,
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
  goalRow: {
    top: "-30%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  goalButton: {
    width: "48%",
    padding: 15,
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
    goalButtonAllDays: {
        width: "90%",
        padding: 15,
        backgroundColor: "#f1f1f1",
        borderWidth: 0,
        // preciso deixar ele centralizado
        alignItems: "center",
        justifyContent: "center",
        left: "30%",

    
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
    fontSize: 15,
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
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
  },
  montarTreinoButton: {
    backgroundColor: "#20183f",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    width: 200,
    top: "-30%",
  },
  buttonText: {
    color: "#F2F2F2",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
  },
});

export default Frequency;
