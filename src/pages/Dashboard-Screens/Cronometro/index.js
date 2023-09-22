import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Timer from "react-native-timer";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Chronometer = () => {
  const navigation = useNavigation();

  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    return () => {
      Timer.clearInterval(this, "updateTimer");
    };
  }, []);

  const startChronometer = () => {
    if (!isRunning) {
      setIsRunning(true);
// quero que comece a contar a partir de 0 igual um cro
      Timer.setInterval(this, "updateTimer", () => {
        const newTime = 0;
        setCurrentTime(newTime);
      }, 10);
    }
  };

  const stopChronometer = () => {
    Timer.clearInterval(this, "updateTimer");
    setIsRunning(false);
  };

  const resetChronometer = () => {
    Timer.clearInterval(this, "updateTimer");
    setStartTime(null);
    setCurrentTime(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chronometer</Text>
      <Text style={styles.currentTime}>{formatTime(currentTime)}</Text>
      {!isRunning ? (
        <Button title="Start" onPress={startChronometer} />
      ) : (
        <Button title="Stop" onPress={stopChronometer} />
      )}
      <Button title="Reset" onPress={resetChronometer} />
      <Button
        title="Voltar para Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  currentTime: {
    fontSize: 30,
    marginBottom: 20,
  },
});

export default Chronometer;
