import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Entypo } from "@expo/vector-icons"

export default function ButtonNew({size, color, focused}) {

    return(
        <View style={[styles.container, {backgroundColor: focused ? "#77aea0"  : "#6b9c90", height: focused ? 73 : 70, width: focused ?73 : 70, borderRadius: focused ? 40 : 35 } ]  }>
            <Entypo name="plus" color={focused ? "white" : "#c0c0c0" } size={35} />
        </View>
    )
    }
    const styles = StyleSheet.create ({
        container: {
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
        }
    })
