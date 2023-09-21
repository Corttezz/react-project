import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";

export default function Cronometro() {
  const navigation = useNavigation();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

// navigation.navigate("NavRoutes"); 

const validateCredentials = async () => {
  setLoading(true);
  try {
    const response = await axios.post(
      "https://backend-server-inteligym.azurewebsites.net/login",
      {
        email: email,
        password: password,
      }
    );

    if (response.status === 200 && response.data.token) {
      await AsyncStorage.setItem("userToken", response.data.token);
      await AsyncStorage.setItem("userId", response.data.userId.toString());
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      console.log("Token do usuário:", userToken);
      console.log("Id do usuário:", userId);

      // Agora, verifique o valor do isRegistred antes de redirecionar
      const isRegistredResponse = await axios.get(
        `https://backend-server-inteligym.azurewebsites.net/getIsRegistred/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,

          },
        }
      );

      if (isRegistredResponse.status === 200) {
        console.log("Status de registro:", isRegistredResponse.data);
        const isRegistred = isRegistredResponse.data.isRegistred;
        if (isRegistred === true) {
          navigation.navigate("NavRoutes");
        } else {
          navigation.navigate("Gender");
        }
      } else {
        Alert.alert("Erro", "Erro ao buscar status de registro.");
      }
    } else {
      Alert.alert("Erro", response.data.message);
    }
  } catch (err) {
    console.error(err);
    Alert.alert("Erro", "Erro ao tentar autenticar. Por favor, tente novamente.");
  } finally {
    setLoading(false);
  }
};


  // verificar se isLoading é true, se for true levar para navigation.navigate("NavRoutes"); 
  // se não for true leva

  return (
    <View style={styles.container}>
      {/* Se loading for true, mostra o ActivityIndicator */}
      {loading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.whiteBox}>
              <ActivityIndicator size="large" color="#20183ff" />
            </View>
          </View>
        )}
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.conteinerForm}>
        

        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder="Digite um email..."
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.title}>Senha</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            placeholder="Sua senha"
            style={styles.inputSenha}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={handleTogglePasswordVisibility}
            style={styles.passwordToggle}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color={showPassword ? "#a1a1a1" : "#20183f"}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={validateCredentials} style={styles.button}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}>
          <Text style={styles.registerText}>
            Não possui uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#20183f",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "black",
  },
  passwordToggle: {
    position: "absolute",
    right: 0,
    padding: 8,
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    color: "#FFF",
    fontFamily: "Poppins_700Bold",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // você pode usar um fundo translúcido
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  whiteBox: {
    backgroundColor: "#FFFFFF",
    padding: 60,
    borderRadius: 10,
    elevation: 10, // para Android
    //shadowColor, shadowOffset, shadowOpacity, shadowRadius // para iOS se necessário
  },
  conteinerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 20,
    marginTop: 28,
    marginBottom: 10,
    fontFamily: "Poppins_400Regular",
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  inputSenha: {
    height: 40,
    marginBottom: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#20183f",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#a1a1a1",
    fontFamily: "Poppins_400Regular",
  },
});