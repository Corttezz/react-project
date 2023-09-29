import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";

const screenHeight = Dimensions.get("window").height;

const calculateMarginTop = () => {
  const screenHeight = Dimensions.get("window").height;
  console.log("Altura da tela:", screenHeight);

  // Defina porcentagens diferentes com base em breakpoints de altura de tela
  if (screenHeight < 700) {
    return "0%"; // Por exemplo, 5% para telas pequenas
  } else if (screenHeight >= 700 && screenHeight < 720) {
    return "1%"; // 10% para telas médias
  } else if (screenHeight >= 720 && screenHeight < 740) {
    return "3%"; // 10% para telas médias
  }else if (screenHeight >= 740 && screenHeight < 760) {
    return "7%"; // 10% para telas médias
  }else if (screenHeight >= 760 && screenHeight < 780) {
    return "11%"; // 10% para telas médias
  }else {
    return "15%"; // 15% para telas grandes (ou maiores)
  }
};

const ProfileScreen = () => {
  // Estado inicial dos dados do usuário
  const initialUserData = {
    nome: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    profileImage: require("../../assets/_de67bbc7-b7e3-49da-b3a7-cec4008ce881.jpg"),
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pedir permissões e buscar dados iniciais quando o componente é montado
  useEffect(() => {
    getPermissionsAsync();
    fetchUserData();
  }, []);

  // Pedir permissão para acessar a galeria de fotos
  const getPermissionsAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Desculpe, precisamos de permissão para acessar sua galeria.");
    }
  };

  // Buscar dados do usuário
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.get(
        `https://backend-server-inteligym.azurewebsites.net/getUserData/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        updateStateWithUserData(response.data);
      } else {
        console.error("Erro ao buscar os dados do usuário.");
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStateWithUserData = (data) => {
    const profileImageUri = data.imageUrl
      ? { uri: data.imageUrl }
      : require("../../assets/_de67bbc7-b7e3-49da-b3a7-cec4008ce881.jpg");

    setUserData({
      ...userData,
      nome: data.nome,
      age: data.age,
      height: data.height,
      weight: data.weight,
      gender: data.gender === "Feminino" ? "Feminino" : "Masculino",
      profileImage: profileImageUri,
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserData({ ...userData, profileImage: { uri: result.uri } });
    }
  };

 const updateNome = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.put(
        `https://backend-server-inteligym.azurewebsites.net/updateNome/${userId}`,
        {
          nome: userData.nome,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Nome atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar o nome:", error);
    }
  };


  const updateGender = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.put(
        `https://backend-server-inteligym.azurewebsites.net/updateGender/${userId}`,
        { gender: userData.gender },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Gênero atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar o gênero:", error);
    }
  };

  const updateAge = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.put(
        `https://backend-server-inteligym.azurewebsites.net/updateAge/${userId}`,
        { age: userData.age },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Idade atualizada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar a idade:", error);
    }
  };

  const updateWeight = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.put(
        `https://backend-server-inteligym.azurewebsites.net/updateWeight/${userId}`,
        { weight: parseFloat(userData.weight.replace(",", ".")) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Peso atualizado com sucesso!");
      }
    } catch (error) {
      console.log("Erro ao atualizar o peso:", error);
    }
  };

  const updateHeight = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.put(
        `https://backend-server-inteligym.azurewebsites.net/updateHeight/${userId}`,
        { height: parseFloat(userData.height.replace(",", ".")) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Altura atualizada com sucesso!");
      }
    } catch (error) {
      console.log("Erro ao atualizar a altura:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setIsEditing(false);
    await updateNome();
    await updateGender();
    await updateAge();
    await updateWeight();
    await updateHeight();
    await fetchUserData();
    setLoading(false);
  };

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.title}>
        {/* Se loading for true, mostra o ActivityIndicator */}
        {loading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.whiteBox}>
              <ActivityIndicator size="large" color="#20183ff" />
            </View>
          </View>
        )}
        <Text style={styles.titleText}> Meu Perfil </Text>
        <View style={styles.container}>
          <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={isEditing ? pickImage : null}>
              <Animatable.Image
                animation="flipInX"
                source={userData.profileImage}
                onLoad={() =>
                  console.log(
                    "Imagem carregada com a URI:",
                    userData.profileImage
                  )
                } // <-- Adicione este log
                onError={(e) => console.log("Erro ao carregar imagem:", e)} // <-- Adicione este log para capturar erros
                style={styles.profileImage}
              />
              {isEditing && (
                <View style={styles.editIconContainer}>
                  <AntDesign name="edit" size={48} color="black" />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Animatable.View
            animation="fadeInLeft"
            delay={500}
            style={styles.containerHeader}
          >
          
          </Animatable.View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Nome</Text>
            <TextInput
              style={styles.input}
              value={userData.nome}
              onChangeText={(text) =>
                setUserData({ ...userData, nome: text })
              }
              keyboardType="default"
              placeholder="Nome"
              editable={isEditing}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Idade</Text>
            <TextInput
              style={styles.input}
              value={userData.age.toString()}
              onChangeText={(text) =>
                setUserData({ ...userData, age: parseInt(text) })
              }
              keyboardType="numeric"
              placeholder="Idade"
              editable={isEditing}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Altura (cm)</Text>
            <TextInput
              style={styles.input}
              value={userData.height.toString()}
              onChangeText={(text) =>
                setUserData({ ...userData, height: text })
              }
              placeholder="Altura"
              keyboardType="numeric"
              editable={isEditing}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              value={userData.weight.toString()}
              keyboardType="numeric"
              onChangeText={(text) =>
                setUserData({ ...userData, weight: text })
              }
              placeholder="Peso"
              editable={isEditing}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Sexo</Text>
            {isEditing ? (
              <Picker
                selectedValue={userData.gender} // <-- Use "userData.gender"
                style={styles.input}
                onValueChange={(value) => {
                  setUserData({ ...userData, gender: value });
                }}
                editable={isEditing}
              >
                <Picker.Item
                  label="Masculino"
                  value="Masculino"
                  editable={isEditing}
                />
                <Picker.Item
                  label="Feminino"
                  value="Feminino"
                  editable={isEditing}
                />
              </Picker>
            ) : (
              <TextInput style={styles.input} editable={isEditing}>{userData.gender}</TextInput>
            )}
          </View>

          {!isEditing && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditPress}
            >
              <AntDesign name="edit" size={24} color="#20183f" />
            </TouchableOpacity>
          )}
          {isEditing && (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          )}
          {!isEditing && (
            <TouchableOpacity style={styles.metaButton}>
              <Text style={styles.saveButtonText}>Minhas Metas</Text>
            </TouchableOpacity>
          )}

          
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: "#20183f",
  },
  titleText: {
    color: "#F2F2F2",
    paddingLeft: "5%",
    paddingTop: "2%",
    paddingBottom: "2%",
    fontSize: 20,
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
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F9F9F9",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: "100%",
    justifyContent: "flex-start",
  },
  profileImageContainer: {
    position: "relative",
    overflow: "hidden",
    width: 140,
    height: 140,
    borderRadius: 75,
    marginTop: calculateMarginTop(),
    marginBottom: "4%"
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "white",
    paddingRight: "5%",
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  inputTitle: {
    marginRight: "10%",
    marginLeft: "7%",
    width: 95,
    paddingBottom: "1%",
    fontSize: 15,
    color: "black",
    fontFamily: "Poppins_700Bold",
  },
  editIconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: "2%",
  },
  input: {
    width: "50%",
    height: 35,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins_400Regular",
  },
  editButton: {
    marginTop: "10%",
    right: 0,
    paddingRight: "10%",
    position: "absolute",
  },
  saveButton: {
    backgroundColor: "#20183f",
    padding: 10,
    borderRadius: 5,
    marginTop: "1%",
    width: "100%",
  },
  metaButton: {
    backgroundColor: "#20183f",
    padding: 10,
    borderRadius: 5,
    marginTop: "1%",
    width: "100%",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
  },
  button: {
    backgroundColor: "#20183f",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    paddingRight: 20,
    paddingLeft: 20,
    fontFamily: "Poppins_700Bold",
  },
});

export default ProfileScreen;
