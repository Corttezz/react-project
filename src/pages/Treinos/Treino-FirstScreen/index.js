import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Dieta = () => {
  const navigation = useNavigation();

  

  return (
    <View style={styles.title}>
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
          Vamos montar o seu treino de acordo com o seu perfil utilizando <Text style={styles.specialText}>inteligência artifical</Text>. 
          Para isso, precisamos de algumas informações.
        </Text>
      <MaterialCommunityIcons
          style={styles.BrainIcon}
          name="brain"
        />
        <TouchableOpacity
              onPress={() => navigation.navigate('TreinosFrequency')}
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