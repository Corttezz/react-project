import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Chronometer = () => {
  const navigation = useNavigation();

  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startChronometer = () => {
    if (!isRunning) {
      const initialStartTime = new Date().getTime() - currentTime;
      setStartTime(initialStartTime);
      setIsRunning(true);
    }
  };

  const stopChronometer = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const resetChronometer = () => {
    if (isRunning) {
      setIsRunning(false);
    }
    setStartTime(null);
    setCurrentTime(0);
  };

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        const newTime = new Date().getTime() - startTime;
        setCurrentTime(newTime);
      }, 100);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, startTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
  
    return (
      <View style={styles.timeContainer}>
        <Text style={styles.timeMinutes}>
          {String(minutes).padStart(2, "0")}
          <Text style={styles.nameTimeM}>m</Text>
        </Text>
        <Text style={styles.timeSeconds}>
          {String(seconds).padStart(2, "0")}
          <Text style={styles.nameTimeS}>s</Text>
        </Text>
        <Text style={styles.milliseconds}>
          {String(milliseconds).padStart(2, "0")}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.title}>
      <View style={styles.headerContainer}>
        <Ionicons
          style={styles.backIcon}
          name="arrow-back-outline"
          onPress={() => navigation.navigate("Home")}
        />
        <Text style={styles.titleText}> Cronômetro </Text>
      </View>
      <View style={styles.container}>
        <MaterialCommunityIcons style={styles.optionIcon} name="timer" />
        <View style={styles.currentTimeContainer}>
          {formatTime(currentTime)}
        </View>
        <View style={styles.button}>
          <View style={styles.buttonContainer}>
            {!isRunning ? (
              <TouchableOpacity
                onPress={startChronometer}
                style={[styles.buttonStyle, styles.startButton]}
              >
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={stopChronometer}
                style={[styles.buttonStyle, styles.stopButton]}
              >
                <Text style={styles.buttonText}>Stop</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={resetChronometer}
              style={[styles.buttonStyle, styles.resetButton]}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: "#20183f",
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: "100%",
  },
  titleText: {
    color: "#F2F2F2",
    paddingLeft: "5%",
    paddingTop: "3%",
    paddingBottom: "2%",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
  backIcon: {
    fontSize: 30,
    color: "#F2F2F2",
    paddingLeft: "5%",
    paddingTop: "3%",
    paddingBottom: "3%",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10, // Ajuste conforme necessário
    left: '-5%',
    top: '130%',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "35%", // Ajuste conforme necessário
  },
  buttonStyle: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    marginHorizontal: 10, // Espaçamento horizontal entre os botões
    paddingVertical: 10, // Espaçamento vertical dentro dos botões
    paddingHorizontal: 20, // Espaçamento horizontal dentro dos botões
    borderRadius: 7, // Borda arredondada nos botões
  },
  startButton: {
    backgroundColor: "#00cc00", // Cor de fundo do botão Start
  },
  stopButton: {
    backgroundColor: "#cc0000", // Cor de fundo do botão Stop
  },
  resetButton: {
    backgroundColor: "#007acc", // Cor de fundo do botão Reset
  },
  buttonText: {
    color: "#F2F2F2",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
  },
  currentTimeContainer: {
    position: "absolute",
  },
  timeContainer: {
    position: "absolute",
  },
  timeMinutes: {
    fontSize: 60,
    color: "white",
    fontFamily: "Poppins_700Bold",
    top: '120%',
    left: '-125%',
  },
  timeSeconds: {
    top: '70%',
    left: '29%',
    fontSize: 60,
    color: "white",
    fontFamily: "Poppins_700Bold",
  },
  milliseconds: {
    fontSize: 15,
    color: "white",
    fontFamily: "Poppins_700Bold",
    position: "absolute",
    top: '135%',
    left: '120%',
  },
  nameTimeM: {
    position: "absolute",
    fontSize: 18,
    color: "white",
  },
  nameTimeS: {
    position: "absolute",
    fontSize: 18,
    color: "white",
  },
  optionIcon: {
    fontSize: 400,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "12%",
  },
});

export default Chronometer;
