import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from 'react';
import LoginRoutes from './src/routes/login-routes';
import * as SplashScreen from 'expo-splash-screen';

import {useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'


export default function App() {

  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold })

  useEffect(() => {
    async function prepare() {
      try {
        // Mantenha a tela de splash visível enquanto carregamos as fontes
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      // Oculte a tela de splash após as fontes serem carregadas
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Você pode retornar null ou algum componente de carregamento aqui
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#20183f" barStyle="light-content" />
      <LoginRoutes/>
    </NavigationContainer>
  );
}