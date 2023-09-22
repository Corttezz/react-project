import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Timer from "react-native-timer";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Chronometer = () => {
  const navigation = useNavigation();

  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalId); // Limpe o intervalo quando o componente for desmontado
    };
  }, []);

  const startChronometer = () => {
    if (!intervalId) {
      const initialStartTime = new Date().getTime() - currentTime;
      setStartTime(initialStartTime);

      const id = setInterval(() => {
        const newTime = new Date().getTime() - initialStartTime;
        setCurrentTime(newTime);
      }, 10);

      setIntervalId(id);
    }
  };

  const stopChronometer = () => {
    if (intervalId) {
      clearInterval(intervalId); // Limpe o intervalo quando você pressionar "Stop"
      setIntervalId(null);
    }
  };

  const resetChronometer = () => {
    if (intervalId) {
      clearInterval(intervalId); // Limpe o intervalo quando você pressionar "Reset"
      setIntervalId(null);
    }
    setStartTime(null);
    setCurrentTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return (
      <View style={styles.timeContainer}>
        <Text style={styles.timeMinutes}>{String(minutes).padStart(2, "0")}<Text style={styles.nameTime}>m</Text></Text> 
        <Text style={styles.timeSeconds}>{String(seconds).padStart(2, "0")}<Text style={styles.nameTime}>s</Text></Text>
        <Text style={styles.milliseconds}>{String(milliseconds).padStart(2, "0")}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons style={styles.optionIcon} name="timer" />
      <Text style={styles.title}>Chronometer</Text>
      <View style={styles.currentTimeContainer}>{formatTime(currentTime)}</View>
      <View style={styles.button}>
      {!intervalId ? (
        <Button title="Start"  onPress={startChronometer} />
      ) : (
        <Button title="Stop" onPress={stopChronometer} />
      )}
      <Button title="Reset" onPress={resetChronometer} />
      <Button
        title="Voltar para Home"
        onPress={() => navigation.navigate("Home")}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    top: 200
  },
  
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  currentTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timeMinutes: {
    fontSize: 60, // Ajuste o tamanho da fonte para minutos e segundos
    color: "white",
    paddingRight: "13%"
  },
  timeSeconds: {
    fontSize: 60, // Ajuste o tamanho da fonte para minutos e segundos
    color: "white",
  },
  milliseconds: {
    fontSize: 15, // Defina um tamanho menor para os milissegundos
    top: 5, // Ajuste a posição para que os milissegundos sejam exibidos no meios dos minutos e segundos
    color: "white",
  },
  nameTime: {
    fontSize: 18,
    color: "white",
  },
  optionIcon: {
    //quero tamanho de 100%
    fontSize: 400,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    
  },
});

export default Chronometer;
