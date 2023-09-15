import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Vibration,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";

export default function FillProfile() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar o aviso

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri); // Atualizado para pegar o URI do primeiro ativo
    }
  };
  

  const saveNameToDatabase = async () => {
      
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.put(
        `https://backend-server-inteligym.azurewebsites.net/updateNome/${userId}`,
        {
          nome: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        navigation.navigate("NavRoutes"); 
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
      alert("Erro ao atualizar o nome.");
    }
  };

  const uploadImageToAzure = async () => {
    if (!name || !image) {
      Vibration.vibrate(); // Faz o celular vibrar
      setShowWarning(true); // Mostra o aviso
      return;
    }
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      if (!image) {
        throw new Error("Nenhuma imagem selecionada");
      }

      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];

      let formData = new FormData();
      formData.append("image", {
        uri: image,
        name: `user_${userId}.${fileType}`,
        type: `image/${fileType}`,
      });

      const response = await axios.post(
        `https://backend-server-inteligym.azurewebsites.net/uploadImage/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Imagem enviada com sucesso!", response.data);
        // Após a imagem ser enviada com sucesso, chame a função para salvar o nome.
        saveNameToDatabase();
        isRegistred();
      } else {
        throw new Error("Erro ao enviar a imagem para o Azure");
      }
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
      alert("Erro ao enviar a imagem.");
    } finally { 
      setLoading(false);
    }
  };
// é um dato em BIT
// será usando locamente na porta 3000 com ip 192.168.15.31
// nao está alterando no banco preciso debugar
  const isRegistred = async () => {
    try { 
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.put(
        `https://backend-server-inteligym.azurewebsites.net/updateIsRegistred/${userId}`,
        {
          isRegistred: 1,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Cadastro atualizado com sucesso!", response.data);
        console.log("", isRegistred.data)
      }
    } catch (error) {
      console.error("Erro ao fazer a solicitação:", error);
      alert("Erro ao atualizar o cadastro.");
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.whiteBox}>
              <ActivityIndicator size="large" color="#20183ff" />
            </View>
          </View>
        )}
      <View style={styles.header}>
        <Text style={styles.title}>Complete seu perfil</Text>
        <Text style={styles.subtitle}>Insira sua foto e nome</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>
                Toque para adicionar uma foto
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.nameInput}
          placeholder="Digite seu nome"
          value={name}
          onChangeText={setName}
        />
      </View>
      {showWarning && <Text style={styles.warningText}>Por favor, selecione um objetivo!</Text>}

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <Text style={styles.buttonTextBack}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={uploadImageToAzure}
          style={styles.continueButton}
        >
          <Text style={styles.buttonTextContinue}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "space-between",
  },
  warningText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: "center",
    width: "80%",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  }, 
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)", // você pode usar um fundo translúcido
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  whiteBox: {
    backgroundColor: "#FFFFFF",
    padding: 40,
    borderRadius: 10,
    elevation: 10, // para Android
    //shadowColor, shadowOffset, shadowOpacity, shadowRadius // para iOS se necessário
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#d3d3dd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePlaceholderText: {
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    padding: 20,
    marginTop: 7,
  },
  nameInput: {
    width: 250,
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#d3d3dd",
    fontFamily: "Poppins_400Regular",
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  continueButton: {
    width: "47%",
    padding: 15,
    borderRadius: 70,
    backgroundColor: "#20183f",
    alignItems: "center",
  },
  backButton: {
    width: "47%",
    padding: 15,
    borderRadius: 70,
    backgroundColor: "#d3d3dd",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  buttonTextContinue: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  buttonTextBack: {
    color: "#20183f",
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
});
