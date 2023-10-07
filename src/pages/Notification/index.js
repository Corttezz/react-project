import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Dieta = () => {
  const navigation = useNavigation();

  

  return (
    <View style={styles.title}>
      <View style={styles.headerContainer}>
        <Text style={styles.titleText}> Dieta </Text>
      </View>
      <View style={styles.container}>
        
       
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
});

export default Dieta;