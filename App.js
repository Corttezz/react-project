import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import NavRoutes from './src/routes/nav-routes';
import LoginRoutes from './src/routes/login-routes';

import {useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'

import AppLoading from 'expo-app-loading';

export default function App() {

  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold })

  if (!fontsLoaded) {
    <AppLoading /> // npx expo install expo-app-loading
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#38A69D" barStyle="light-content" />
      <LoginRoutes/>
    </NavigationContainer>
  );
}