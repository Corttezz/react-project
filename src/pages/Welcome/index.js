import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import * as Animatable from "react-native-animatable"

import { useNavigation } from '@react-navigation/native'

export default function Welcome() {
  const navigation = useNavigation()


  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
        animation="flipInY"
        source={require("../../assets/_de67bbc7-b7e3-49da-b3a7-cec4008ce881.jpg")}
        style= {{width: '100%'}}
        resizeMode='contain'
        />
      </View>
      <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
       <Text style={styles.title}> Texto Texto Texto Texto Texto </Text>
       <Text style={styles.text}> Faça o Login para começar </Text>

       <TouchableOpacity 
       onPress={ () => navigation.navigate("SignIn") }
       style={styles.button}>
        <Text style={styles.buttonText}> Acessar </Text>
       </TouchableOpacity>
      </Animatable.View>

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
      marginTop: 28,
      marginBottom: 12,
      fontFamily: 'Poppins_700Bold',
    },
    text: {
      color: "#a1a1a1",
      fontFamily: 'Poppins_400Regular',
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
      fontFamily: 'Poppins_700Bold',
    }
})