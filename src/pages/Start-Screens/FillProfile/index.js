import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import * as Animatable from "react-native-animatable"

import { useNavigation } from '@react-navigation/native'

export default function FillProfile() {
  const navigation = useNavigation()


  return (
    <View style={styles.container}>
    
       <Text style={styles.title}> FillProfile </Text>

       <TouchableOpacity 
       onPress={ () => navigation.navigate("NavRoutes") }
       style={styles.button}>
        <Text style={styles.buttonText}> Acessar </Text>
       </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    
})