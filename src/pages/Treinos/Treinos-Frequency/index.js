import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Animatable from "react-native-animatable";

const Frequency = () => {
  const navigation = useNavigation();
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar o aviso
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.title}>
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
                  selectedGoal === "1 vez" && styles.selectedGoalButton,
                ]}
                onPress={() => {
                  setSelectedGoal("1 vez");
                  setShowWarning(false);
                }}
              >
                <Text style={styles.goalText}>1 vez</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.goalButton,
                  selectedGoal === "2 vezes" && styles.selectedGoalButton,
                ]}
                onPress={() => {
                  setSelectedGoal("2 vezes");
                  setShowWarning(false);
                }}
              >
                <Text style={styles.goalText}>2 vezes</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.goalRow}>
              <TouchableOpacity
                style={[
                  styles.goalButton,
                  selectedGoal === "3 vezes" && styles.selectedGoalButton,
                ]}
                onPress={() => {
                  setSelectedGoal("3 vezes");
                  setShowWarning(false);
                }}
              >
                <Text style={styles.goalText}>3 vezes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.goalButton,
                  selectedGoal === "4 vezes" && styles.selectedGoalButton,
                ]}
                onPress={() => {
                  setSelectedGoal("4 vezes");
                  setShowWarning(false);
                }}
              >
                <Text style={styles.goalText}>4 vezes</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.goalRow}>
              <TouchableOpacity
                style={[
                  styles.goalButton,
                  selectedGoal === "5 vezes" && styles.selectedGoalButton,
                ]}
                onPress={() => {
                  setSelectedGoal("5 vezes");
                  setShowWarning(false);
                }}
              >
                <Text style={styles.goalText}>5 vezes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.goalButton,
                  selectedGoal === "6 vezes" && styles.selectedGoalButton,
                ]}
                onPress={() => {
                  setSelectedGoal("6 vezes");
                  setShowWarning(false);
                }}
              >
                <Text style={styles.goalText}>6 vezes</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.goalRow}>
              <TouchableOpacity
                style={[
                  styles.goalButtonAllDays,
                  selectedGoal === "Todos os dias" && styles.selectedGoalButton,
                ]}
                onPress={() => {
                  setSelectedGoal("Todos os dias");
                  setShowWarning(false);
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
            onPress={() => navigation.navigate("TreinosFirstScreen")}
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
