import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../pages/Home";
import New from "../pages/New";
import Notification from "../pages/Notification";
import Profile from "../pages/Profile";
import Treinos from "../pages/Treinos";

import ButtonNew from "../components/ButtomNew";
import { Entypo, Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function NavRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          backgroundColor: "#51766d",
          borderTopColor: "transparent",
        },
        tabBarActiveTintColor: "#FFF",
        tabBarInactiveTintColor: "#c0c0c0",
        tabBarItemStyle: {
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="home" size={size} color={color} />
          ), headerShown: false
        } }
      />

      <Tab.Screen
        name="Treinos"
        component={Treinos}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="weight-lifter" size={size} color={color} />
          ), headerShown: false
        }}
      />

      <Tab.Screen
        name="New"
        component={New}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused, size }) => (
            <ButtonNew size={size} focused={focused} />
          ), headerShown: false
        }}
      />

      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="notification" size={size} color={color} />
          ), headerShown: false
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ), headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}
