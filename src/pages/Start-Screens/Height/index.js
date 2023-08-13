import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import * as Animatable from "react-native-animatable"

import { useNavigation } from '@react-navigation/native'

export default function Height() {
  const navigation = useNavigation()


  return (
    <View style={styles.container}>
    
       <Text style={styles.title}> Height </Text>

       <TouchableOpacity 
       onPress={ () => navigation.navigate("Goal") }
       style={styles.button}>
        <Text style={styles.buttonText}> Acessar </Text>
       </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#20183f"
    },
    containerLogo:{
        flex: 2,
        backgroundColor: "#20183f",
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerForm:{
        flex: 1,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%"
    },
    title:{
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 28,
      marginBottom: 12
    },
    text: {
      color: "#a1a1a1"
    },
    button: {
      position: "absolute",
      backgroundColor: "#20183f",
      borderRadius: 50,
      paddingVertical: 8,
      width: "60%",
      alignSelf: 'center',
      bottom: "15%",
      alignItems: 'center',
      justifyContent: "center"
    },
    buttonText: {
      fontSize: 18,
      color: "#FFF",
      fontWeight: 'bold',
    }
})