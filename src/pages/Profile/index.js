import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import * as Animatable from "react-native-animatable";

const ProfileScreen = () => {
  const initialUserData = {
    name: "Nome do Usuário",
    age: 24,
    height: "1,75m",
    weight: "70kg",
    sex: "Masculino",
    profileImage: require("../../assets/_de67bbc7-b7e3-49da-b3a7-cec4008ce881.jpg"),
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getPermissionsAsync();
  }, []);

  const getPermissionsAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Desculpe, precisamos de permissão para acessar sua galeria.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserData({ ...userData, profileImage: { uri: result.assets[0].uri } });
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Dados atualizados:", userData);
  };

  const handleEditPress = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  return (
    <View style={styles.title}>
      <Text style={styles.titleText}> Meu Perfil </Text>
      <View style={styles.container}>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={isEditing ? pickImage : null}>
            <Animatable.Image
              animation="flipInX"
              source={userData.profileImage}
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
          <Text style={styles.username}>{userData.name}</Text>
        </Animatable.View>
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
          <Text style={styles.inputTitle}>Altura</Text>
          <TextInput
            style={styles.input}
            value={userData.height}
            onChangeText={(text) => setUserData({ ...userData, height: text })}
            placeholder="Altura"
            editable={isEditing}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Peso</Text>
          <TextInput
            style={styles.input}
            value={userData.weight}
            onChangeText={(text) => setUserData({ ...userData, weight: text })}
            placeholder="Peso"
            editable={isEditing}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Sexo</Text>
          <TextInput
            style={styles.input}
            value={userData.sex}
            onChangeText={(text) => setUserData({ ...userData, sex: text })}
            placeholder="Sexo"
            editable={isEditing}
          />
        </View>
        {!isEditing && (
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <AntDesign name="edit" size={24} color="#51766d" />
          </TouchableOpacity>
        )}
        {isEditing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        )}

        {!isEditing && (
          <Animatable.View animation="fadeInUp">
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}> Minhas Metas </Text>
          </TouchableOpacity>
          </Animatable.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: "#51766d",
  },
  titleText: {
    color: "#F2F2F2",
    paddingLeft: "5%",
    paddingTop: "5%",
    paddingBottom: "5%",
    fontSize: 20,
    fontWeight: "bold",
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
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    marginTop: "5%",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "white",
    paddingRight: "5%",
    borderRadius: 10,
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
    width: 80,
    paddingBottom: "1%",
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
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
    marginBottom: "10%",
  },
  input: {
    width: "50%",
    height: 40,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    marginTop: "10%",
    right: 0,
    paddingRight: "10%",
    position: "absolute",
  },
  saveButton: {
    backgroundColor: "#51766d",
    padding: 10,
    borderRadius: 5,
    marginTop: "10%",
    width: "100%",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#51766d",
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
    fontWeight: "bold",
    paddingRight: 20,
    paddingLeft: 20,
    },
});

export default ProfileScreen;
