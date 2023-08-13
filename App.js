import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import NavRoutes from './src/routes/nav-routes';
import LoginRoutes from './src/routes/login-routes';

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#38A69D" barStyle="light-content" />
      <LoginRoutes/>
    </NavigationContainer>
  );
}