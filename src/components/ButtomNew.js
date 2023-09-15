import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

import { Entypo } from "@expo/vector-icons"

export default function ButtonNew({size, color, focused}) {
    const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

    return(
        <View style={[styles.container, {backgroundColor: focused ? "#321c5e"  : "#2d1955", height: focused ? 73 : 70, width: focused ?73 : 70, borderRadius: focused ? 40 : 35, height: keyboardVisible ? 0 : 72} ]  }>
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
